const SellerService = require("../services/sellerService");

class SellerController {
  async create(req, res) {
    try {
      const newSeller = await SellerService.create(req.body);
      return res.status(201).json(newSeller);
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao criar vendedor",
        details: err.details || error.message,
      });
    }
  }

  async findAll(req, res) {
    try {
      const sellers = await SellerService.findAll();
      return res.status(200).json(sellers);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar vendedores",
        details: error.message,
      });
    }
  }

  async findOne(req, res) {
    try {
      const seller = await SellerService.findOne(Number(req.params.id));
      return res.status(200).json(seller);
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao buscar vendedor",
        details: err.details || error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const updatedSeller = await SellerService.update(
        Number(req.params.id),
        req.body
      );
      return res.status(200).json(updatedSeller);
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao atualizar vendedor",
        details: err.details || error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      await SellerService.delete(Number(req.params.id));
      return res.status(200).json({ message: "Vendedor deletado com sucesso" });
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao deletar vendedor",
        details: err.details || error.message,
      });
    }
  }
}

module.exports = new SellerController();
