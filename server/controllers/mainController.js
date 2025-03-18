const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ItemController {
  // Criar um novo item
  async create(req, res) {
    try {
      const newItem = await prisma.item.create({
        data: req.body,
      });
      return res.status(201).json(newItem);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar item.', details: error.message });
    }
  }

  // Buscar todos os itens
  async findAll(req, res) {
    try {
      const items = await prisma.item.findMany();
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar itens.', details: error.message });
    }
  }

  // Buscar um item pelo ID
  async findOne(req, res) {
    try {
      const { id } = req.params;
      const item = await prisma.item.findUnique({
        where: { id: Number(id) },
      });
      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado.' });
      }
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar item.', details: error.message });
    }
  }

  // Atualizar um item
  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedItem = await prisma.item.update({
        where: { id: Number(id) },
        data: req.body,
      });
      return res.status(200).json(updatedItem);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar item.', details: error.message });
    }
  }

  // Deletar um item
  async delete(req, res) {
    try {
      const { id } = req.params;
      await prisma.item.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({ message: 'Item deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar item.', details: error.message });
    }
  }
}

module.exports = new ItemController();