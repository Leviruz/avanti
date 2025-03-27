const OrderService = require("../services/orderService");

class OrderController {
  async create(req, res) {
    try {
      if (!req.body.sellerId || !req.body.customer || !req.body.items || !req.body.total) {
        return res.status(400).json({
          error: "Dados incompletos",
          details: "sellerId, customer, items e total são obrigatórios"
        });
      }
  
      const newOrder = await OrderService.create(req.body);
      return res.status(201).json(newOrder);
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao criar pedido",
        details: err.details || error.message,
      });
    }
  }

  async findAll(req, res) {
    try {
      const orders = await OrderService.findAll();
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar pedidos",
        details: error.message,
      });
    }
  }

  async findOne(req, res) {
    try {
      const order = await OrderService.findOne(Number(req.params.id));
      return res.status(200).json(order);
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao buscar pedido",
        details: err.details || error.message,
      });
    }
  }

  async updateStatus(req, res) {
    try {
      const updatedOrder = await OrderService.updateStatus(
        Number(req.params.id),
        req.body
      );
      return res.status(200).json(updatedOrder);
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao atualizar status do pedido",
        details: err.details || error.message,
      });
    }
  }

  async cancel(req, res) {
    try {
      await OrderService.cancel(Number(req.params.id));
      return res.status(200).json({
        message: "Pedido cancelado e estoque restaurado com sucesso",
      });
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao cancelar pedido",
        details: err.details || error.message,
      });
    }
  }
}

module.exports = new OrderController();
