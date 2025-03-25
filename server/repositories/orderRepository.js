const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class OrderRepository {
  async create(orderData) {
    return await prisma.order.create({
      data: orderData,
      include: {
        orderItems: true,
      },
    });
  }

  async findAll() {
    return await prisma.order.findMany({
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findOne(id) {
    return await prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updateStatus(id, status) {
    return await prisma.order.update({
      where: { id: Number(id) },
      data: { status },
    });
  }

  async delete(id) {
    return await prisma.order.delete({
      where: { id: Number(id) },
    });
  }

  async exists(id) {
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
    });
    return order !== null;
  }

  async getOrderWithItems(id) {
    return await prisma.order.findUnique({
      where: { id: Number(id) },
      include: { orderItems: true },
    });
  }

  async findCustomer(id) {
    return await prisma.customer.findUnique({
      where: { id: Number(id) },
    });
  }

  async findProduct(id) {
    return await prisma.product.findUnique({
      where: { id: Number(id) },
    });
  }

  async updateProductStock(id, quantity) {
    return await prisma.product.update({
      where: { id: Number(id) },
      data: { stock: { decrement: quantity } },
    });
  }

  async restoreProductStock(id, quantity) {
    return await prisma.product.update({
      where: { id: Number(id) },
      data: { stock: { increment: quantity } },
    });
  }
}

module.exports = new OrderRepository();
