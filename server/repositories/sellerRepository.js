const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class SellerRepository {
  async create(sellerData) {
    return await prisma.seller.create({
      data: sellerData,
    });
  }

  async findAll() {
    return await prisma.seller.findMany();
  }

  async findOne(id) {
    return await prisma.seller.findUnique({
      where: { id: Number(id) },
    });
  }

  async update(id, sellerData) {
    return await prisma.seller.update({
      where: { id: Number(id) },
      data: sellerData,
    });
  }

  async delete(id) {
    return await prisma.seller.delete({
      where: { id: Number(id) },
    });
  }

  async exists(id) {
    const seller = await prisma.seller.findUnique({
      where: { id: Number(id) },
    });
    return seller !== null;
  }
}

module.exports = new SellerRepository();
