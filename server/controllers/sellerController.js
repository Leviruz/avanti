const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { z } = require('zod');

// Esquema de validação para vendedores
const sellerSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    phone: z.string()
      .min(10, "O telefone deve ter pelo menos 10 dígitos")
      .max(15, "O telefone deve ter no máximo 15 dígitos")
      .regex(/^\d+$/, "O telefone deve conter apenas números"), // Permite apenas números
});

class SellerController {
  // Criar um novo vendedor
  async create(req, res) {
    const parsed = sellerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.issues });
    }
    try {
      const newSeller = await prisma.seller.create({
        data: parsed.data,
      });
      return res.status(201).json(newSeller);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar vendedor.', details: error.message });
    }
  }

  // Buscar todos os vendedores
  async findAll(req, res) {
    try {
      const sellers = await prisma.seller.findMany();
      return res.status(200).json(sellers);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar vendedores.', details: error.message });
    }
  }

  // Buscar um vendedor pelo ID
  async findOne(req, res) {
    const { id } = req.params;
    try {
      const seller = await prisma.seller.findUnique({
        where: { id: Number(id) },
      });
      if (!seller) {
        return res.status(404).json({ error: 'Vendedor não encontrado.' });
      }
      return res.status(200).json(seller);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar vendedor.', details: error.message });
    }
  }

  // Atualizar um vendedor
  async update(req, res) {
    const { id } = req.params;
    const parsed = sellerSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.issues });
    }
    try {
      const existingSeller = await prisma.seller.findUnique({ where: { id: Number(id) } });
      if (!existingSeller) {
        return res.status(404).json({ error: "Vendedor não encontrado." });
      }
      const updatedSeller = await prisma.seller.update({
        where: { id: Number(id) },
        data: parsed.data,
      });
      return res.status(200).json(updatedSeller);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar vendedor.', details: error.message });
    }
  }

  // Deletar um vendedor
  async delete(req, res) {
    const { id } = req.params;
    try {
      const existingSeller = await prisma.seller.findUnique({ where: { id: Number(id) } });
      if (!existingSeller) {
        return res.status(404).json({ error: "Vendedor não encontrado." });
      }
      await prisma.seller.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: 'Vendedor deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar vendedor.', details: error.message });
    }
  }
}

module.exports = new SellerController();