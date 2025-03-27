const orderRepository = require("../repositories/orderRepository");
const { z } = require("zod");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
    const { sellerId, customer, items, total } = orderData;

    try {
      // Verificar se o vendedor existe
      const seller = await prisma.seller.findUnique({
        where: { id: sellerId }
      });

      if (!seller) {
        throw new Error(JSON.stringify({
          statusCode: 404,
          error: "Vendedor não encontrado"
        }));
      }

      // Criar ou encontrar o cliente
      let customerRecord = await prisma.customer.findUnique({
        where: { email: customer.email }
      });

      if (!customerRecord) {
        customerRecord = await prisma.customer.create({
          data: {
            name: customer.name,
            email: customer.email,
            address: customer.address,
            phone: customer.phone
          }
        });
      }

      // Criar o pedido
      const order = await prisma.order.create({
        data: {
          customerId: customerRecord.id,
          sellerId: sellerId,
          total: parseFloat(total),
          status: "Pendente", // Adicione esta linha
          orderItems: {
            create: items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: parseFloat(item.price)
            }))
          }
        },
        include: {
          orderItems: true
        }
      });

      // Atualizar o estoque dos produtos
      for (const item of items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      return order;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw new Error(JSON.stringify({
        statusCode: 500,
        error: "Erro ao criar pedido",
        details: error.message
      }));
    }
  }

  async findAll() {
    try {
      return await prisma.order.findMany({
        include: {
          orderItems: {
            include: {
              product: true
            }
          },
          customer: true,
          seller: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (error) {
      throw new Error(JSON.stringify({
        statusCode: 500,
        error: "Erro ao buscar pedidos",
        details: error.message
      }));
    }
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
