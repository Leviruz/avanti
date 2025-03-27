const orderRepository = require("../repositories/orderRepository");
const { z } = require("zod");

// Esquemas de validação
const orderSchema = z.object({
  customerId: z.number().int().positive("ID do cliente inválido"),
  items: z
    .array(
      z.object({
        productId: z.number().int().positive("ID do produto inválido"),
        quantity: z
          .number()
          .int()
          .positive("A quantidade deve ser maior que zero"),
      })
    )
    .min(1, "O pedido deve ter pelo menos um item"),
});

const orderStatusSchema = z.object({
  status: z.enum(["Pendente", "Enviado", "Entregue"], {
    message:
      "Status inválido. Valores permitidos: Pendente, Enviado ou Entregue",
  }),
});

class OrderService {
  async create(orderData) {
    const parsed = orderSchema.safeParse(orderData);
    if (!parsed.success) {
      throw new Error(
        JSON.stringify({
          statusCode: 400,
          error: "Dados inválidos",
          details: parsed.error.issues,
        })
      );
    }

    const { customerId, items } = parsed.data;

    // Verificar se o cliente existe
    const customer = await orderRepository.findCustomer(customerId);
    if (!customer) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Cliente não encontrado",
        })
      );
    }

    let total = 0;
    const orderItems = [];

    // Processar cada item do pedido
    for (const item of items) {
      const product = await orderRepository.findProduct(item.productId);

      if (!product) {
        throw new Error(
          JSON.stringify({
            statusCode: 404,
            error: `Produto com ID ${item.productId} não encontrado`,
          })
        );
      }

      if (product.stock < item.quantity) {
        throw new Error(
          JSON.stringify({
            statusCode: 400,
            error: `Estoque insuficiente para o produto ${product.name}`,
          })
        );
      }

      total += product.price * item.quantity;
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });

      // Atualizar estoque
      await orderRepository.updateProductStock(item.productId, item.quantity);
    }

    // Criar o pedido
    return await orderRepository.create({
      customerId,
      total,
      status: "Pendente",
      orderItems: {
        create: orderItems,
      },
    });
  }

  async findAll() {
    return await orderRepository.findAll();
  }

  async findOne(id) {
    const order = await orderRepository.findOne(id);
    if (!order) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Pedido não encontrado",
        })
      );
    }
    return order;
  }

  async updateStatus(id, statusData) {
    const parsed = orderStatusSchema.safeParse(statusData);
    if (!parsed.success) {
      throw new Error(
        JSON.stringify({
          statusCode: 400,
          error: "Status inválido",
          details: parsed.error.issues,
        })
      );
    }

    const exists = await orderRepository.exists(id);
    if (!exists) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Pedido não encontrado",
        })
      );
    }

    return await orderRepository.updateStatus(id, parsed.data.status);
  }

  async cancel(id) {
    const order = await orderRepository.getOrderWithItems(id);
    if (!order) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Pedido não encontrado",
        })
      );
    }

    if (order.status !== "Pendente") {
      throw new Error(
        JSON.stringify({
          statusCode: 400,
          error: "O pedido só pode ser cancelado enquanto estiver 'Pendente'",
        })
      );
    }

    // Restaurar estoque
    for (const item of order.orderItems) {
      await orderRepository.restoreProductStock(item.productId, item.quantity);
    }

    // Deletar pedido
    return await orderRepository.delete(id);
  }
}

module.exports = new OrderService();
