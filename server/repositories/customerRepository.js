const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CustomerRepository {
  async create(newCustomer) {
    return await prisma.customer.create({
      data: newCustomer,
    });
  }

  async findAll() {
    return await prisma.customer.findMany();
  }

  async findOne(id) {
    return await prisma.customer.findUnique({
      where: { id: Number(id) },
    });
  }

  async update(id, customerData) {
    return await prisma.customer.update({
      where: { id: Number(id) },
      data: customerData,
    });
  }

  async delete(id) {
    return await prisma.customer.delete({
      where: { id: Number(id) },
    });
  }

  async exists(id) {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });
    return customer !== null;
  }
}

module.exports = new CustomerRepository();
