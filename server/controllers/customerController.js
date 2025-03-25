const CustomerService = require("../services/customerService");

class CustomerController {
  async create(req, res) {
    try {
      const newCustomer = await CustomerService.create(req.body);
      return res.status(201).json(newCustomer);
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao criar cliente",
        details: err.details || error.message,
      });
    }
  }

  async findAll(req, res) {
    try {
      const customers = await CustomerService.findAll();
      return res.status(200).json(customers);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar clientes",
        details: error.message,
      });
    }
  }

  async findOne(req, res) {
    try {
      const customer = await CustomerService.findOne(Number(req.params.id));
      return res.status(200).json(customer);
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao buscar cliente",
        details: err.details || error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const updatedCustomer = await CustomerService.update(
        Number(req.params.id),
        req.body
      );
      return res.status(200).json(updatedCustomer);
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao atualizar cliente",
        details: err.details || error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      await CustomerService.delete(Number(req.params.id));
      return res.status(200).json({ message: "Cliente deletado com sucesso" });
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao deletar cliente",
        details: err.details || error.message,
      });
    }
  }
}

module.exports = new CustomerController();
