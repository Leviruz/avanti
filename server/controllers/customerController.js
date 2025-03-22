const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { z } = require('zod');

// Esquema de validação para clientes
const customerSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    address: z.string(),
    phone: z.string()
      .min(10, "O telefone deve ter pelo menos 10 dígitos")
      .max(15, "O telefone deve ter no máximo 15 dígitos")
      .regex(/^\d+$/, "O telefone deve conter apenas números"), // Permite apenas números
});

class CustomerController {
  // Criar um novo cliente
  async create(req, res) {
    const parsed = customerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.issues });
    }
    try {
      const newCustomer = await prisma.customer.create({
        data: parsed.data,
      });
      return res.status(201).json(newCustomer);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar cliente.', details: error.message });
    }
  }

  // Buscar todos os clientes
  async findAll(req, res) {
    try {
      const customers = await prisma.customer.findMany();
      return res.status(200).json(customers);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar clientes.', details: error.message });
    }
  }

  // Buscar um cliente pelo ID
  async findOne(req, res) {
    const { id } = req.params;
    try {
      const customer = await prisma.customer.findUnique({
        where: { id: Number(id) },
      });
      if (!customer) {
        return res.status(404).json({ error: 'Cliente não encontrado.' });
      }
      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar cliente.', details: error.message });
    }
  }

  // Atualizar um cliente
  async update(req, res) {
    const { id } = req.params;
    const parsed = customerSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.issues });
    }
    try {
      const existingCustomer = await prisma.customer.findUnique({ where: { id: Number(id) } });
      if (!existingCustomer) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      }
      const updatedCustomer = await prisma.customer.update({
        where: { id: Number(id) },
        data: parsed.data,
      });
      return res.status(200).json(updatedCustomer);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar cliente.', details: error.message });
    }
  }

  // Deletar um cliente
  async delete(req, res) {
    const { id } = req.params;
    try {
      const existingCustomer = await prisma.customer.findUnique({ where: { id: Number(id) } });
      if (!existingCustomer) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      }
      await prisma.customer.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: 'Cliente deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar cliente.', details: error.message });
    }
  }
}

module.exports = new CustomerController();