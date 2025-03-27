const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductRepository {
  async create(productData) {
    return await prisma.product.create({
      data: productData,
    });
  }

  async findAll() {
    return await prisma.product.findMany();
  }

  async findOne(id) {
    return await prisma.product.findUnique({
      where: { id: Number(id) },
    });
  }

  async update(id, productData) {
    return await prisma.product.update({
      where: { id: Number(id) },
      data: productData,
    });
  }

  async delete(id) {
    return await prisma.product.delete({
      where: { id: Number(id) },
    });
  }

  async exists(id) {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    return product !== null;
  }
}

module.exports = new ProductRepository();
