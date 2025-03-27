const productRepository = require("../repositories/productRepository");
const { z } = require("zod");
const path = require("path");

const productSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().optional(),
  price: z.coerce.number().positive("O preço deve ser positivo"),
  stock: z.coerce
    .number()
    .int()
    .nonnegative("O estoque deve ser zero ou maior"),
  images: z.array(z.string()).optional(),
});

class ProductService {
  async create(productData, files) {
    const parsed = productSchema.safeParse({
      ...productData,
      price: parseFloat(productData.price),
      stock: productData.stock ? parseInt(productData.stock) : 0,
      images: files?.map((file) => file.filename),
    });

    if (!parsed.success) {
      throw new Error(
        JSON.stringify({
          statusCode: 400,
          error: "Dados inválidos",
          details: parsed.error.issues,
        })
      );
    }

    return await productRepository.create(parsed.data);
  }

  async findAll() {
    return await productRepository.findAll();
  }

  async findOne(id) {
    const product = await productRepository.findOne(id);
    if (!product) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Produto não encontrado",
        })
      );
    }
    return product;
  }

  async update(id, productData) {
    const parsed = productSchema.partial().safeParse(productData);
    if (!parsed.success) {
      throw new Error(
        JSON.stringify({
          statusCode: 400,
          error: "Dados inválidos",
          details: parsed.error.issues,
        })
      );
    }

    const exists = await productRepository.exists(id);
    if (!exists) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Produto não encontrado",
        })
      );
    }

    return await productRepository.update(id, parsed.data);
  }

  async delete(id) {
    const exists = await productRepository.exists(id);
    if (!exists) {
      throw new Error(
        JSON.stringify({
          statusCode: 404,
          error: "Produto não encontrado",
        })
      );
    }
    return await productRepository.delete(id);
  }
}

module.exports = new ProductService();
