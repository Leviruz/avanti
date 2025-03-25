const customerRepository = require("../repositories/customerRepository");
const { z } = require("zod");

// Esquema de validação para clientes (pode ser movido para um arquivo separado)
const customerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  address: z.string(),
  phone: z
    .string()
    .min(10, "O telefone deve ter pelo menos 10 dígitos")
    .max(15, "O telefone deve ter no máximo 15 dígitos")
    .regex(/^\d+$/, "O telefone deve conter apenas números"),
});

class CustomerService {
  async create(customerData) {
    const parsed = customerSchema.safeParse(customerData);
    if (!parsed.success) {
      throw new Error(
        JSON.stringify({
          statusCode: 400,
          error: "Dados inválidos",
          details: parsed.error.issues,
        })
      );
    }
    return await customerRepository.create(parsed.data);
  }

  async findAll() {
    return await customerRepository.findAll();
  }

  async findOne(id) {
    const customer = await customerRepository.findOne(id);
    if (!customer) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Cliente não encontrado",
        })
      );
    }
    return customer;
  }

  async update(id, customerData) {
    const parsed = customerSchema.partial().safeParse(customerData);
    if (!parsed.success) {
      throw new Error(
        JSON.stringify({
          statusCode: 400,
          error: "Dados inválidos",
          details: parsed.error.issues,
        })
      );
    }

    const exists = await customerRepository.exists(id);
    if (!exists) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Cliente não encontrado",
        })
      );
    }

    return await customerRepository.update(id, parsed.data);
  }

  async delete(id) {
    const exists = await customerRepository.exists(id);
    if (!exists) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Cliente não encontrado",
        })
      );
    }
    return await customerRepository.delete(id);
  }
}

module.exports = new CustomerService();
