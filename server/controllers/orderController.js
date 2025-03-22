const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();

// Esquema de validação para pedidos
const orderSchema = z.object({
  customerId: z.number().int().positive("ID do cliente inválido"),
  items: z.array(
    z.object({
      productId: z.number().int().positive("ID do produto inválido"),
      quantity: z.number().int().positive("A quantidade deve ser maior que zero"),
    })
  ).min(1, "O pedido deve ter pelo menos um item"),
});

// Esquema de validação para atualização de status do pedido
const orderStatusSchema = z.object({
  status: z.enum(["Pendente", "Enviado", "Entregue"], {
    message: "Status inválido. Os valores permitidos são: Pendente, Enviado ou Entregue",
  }),
});

class OrderController {
  // Criar um novo pedido
  async create(req, res) {
    const parsed = orderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.issues });
    }

    const { customerId, items } = parsed.data;

    try {
      // Verificar se o cliente existe
      const customer = await prisma.customer.findUnique({ where: { id: customerId } });
      if (!customer) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      }

      let total = 0;
      const orderItems = [];

      // Verificar os produtos e calcular o total
      for (const item of items) {
        const product = await prisma.product.findUnique({ where: { id: item.productId } });

        if (!product) {
          return res.status(404).json({ error: `Produto com ID ${item.productId} não encontrado.` });
        }

        if (product.stock < item.quantity) {
          return res.status(400).json({ error: `Estoque insuficiente para o produto ${product.name}.` });
        }

        // Adicionar ao total
        total += product.price * item.quantity;

        // Criar item do pedido
        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });

        // Atualizar estoque do produto
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: product.stock - item.quantity },
        });
      }

      // Criar o pedido
      const newOrder = await prisma.order.create({
        data: {
          customerId,
          total,
          status: "Pendente",
          orderItems: {
            create: orderItems,
          },
        },
        include: {
          orderItems: true,
        },
      });

      return res.status(201).json(newOrder);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar pedido.', details: error.message });
    }
  }

  // Buscar todos os pedidos
  async findAll(req, res) {
    try {
      const orders = await prisma.order.findMany({
        include: { customer: true, orderItems: { include: { product: true } } },
      });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar pedidos.', details: error.message });
    }
  }

  // Buscar um pedido pelo ID
  async findOne(req, res) {
    const { id } = req.params;
    try {
      const order = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: { customer: true, orderItems: { include: { product: true } } },
      });

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }

      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar pedido.', details: error.message });
    }
  }

  // Atualizar status do pedido (exemplo: "Enviado", "Entregue")
  async updateStatus(req, res) {
    const parsed = orderStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Status inválido", details: parsed.error.issues });
    }

    const { id } = req.params;
    const { status } = parsed.data;

    try {
      const updatedOrder = await prisma.order.update({
        where: { id: Number(id) },
        data: { status },
      });

      return res.status(200).json(updatedOrder);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar status do pedido.', details: error.message });
    }
  }

  // Cancelar um pedido e restaurar o estoque
  async cancel(req, res) {
    const { id } = req.params;
    try {
      const order = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: { orderItems: true },
      });

      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado." });
      }

      if (order.status !== "Pendente") {
        return res.status(400).json({ error: "O pedido só pode ser cancelado enquanto estiver 'Pendente'." });
      }

      // Restaurar estoque dos produtos
      for (const item of order.orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }

      // Deletar o pedido
      await prisma.order.delete({ where: { id: Number(id) } });

      return res.status(200).json({ message: "Pedido cancelado e estoque restaurado." });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao cancelar pedido.', details: error.message });
    }
  }
}

module.exports = new OrderController();