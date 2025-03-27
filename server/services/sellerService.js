const sellerRepository = require("../repositories/sellerRepository");
const { z } = require("zod");

const sellerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(10, "O telefone deve ter pelo menos 10 dígitos")
    .max(15, "O telefone deve ter no máximo 15 dígitos")
    .regex(/^\d+$/, "O telefone deve conter apenas números"),
});

class SellerService {
  async create(sellerData) {
    const parsed = sellerSchema.safeParse(sellerData);
    if (!parsed.success) {
      throw new Error(
        JSON.stringify({
          statusCode: 400,
          error: "Dados inválidos",
          details: parsed.error.issues,
        })
      );
    }
    return await sellerRepository.create(parsed.data);
  }

  async findAll() {
    return await sellerRepository.findAll();
  }

  async findOne(id) {
    const seller = await sellerRepository.findOne(id);
    if (!seller) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Vendedor não encontrado",
        })
      );
    }
    return seller;
  }

  async update(id, sellerData) {
    const parsed = sellerSchema.partial().safeParse(sellerData);
    if (!parsed.success) {
      throw new Error(
        JSON.stringify({
          statusCode: 400,
          error: "Dados inválidos",
          details: parsed.error.issues,
        })
      );
    }

    const exists = await sellerRepository.exists(id);
    if (!exists) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Vendedor não encontrado",
        })
      );
    }

    return await sellerRepository.update(id, parsed.data);
  }

  async delete(id) {
    const exists = await sellerRepository.exists(id);
    if (!exists) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Vendedor não encontrado",
        })
      );
    }
    return await sellerRepository.delete(id);
  }
}

module.exports = new SellerService();
