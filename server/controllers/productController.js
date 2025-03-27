const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const multer = require('multer');
const path = require('path');

const prisma = new PrismaClient();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/')),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    return mimetype && extname ? cb(null, true) : cb(new Error('Apenas imagens são permitidas (JPEG, JPG, PNG)'));
  },
}).array('images', 4);

// Esquema de validação dos produtos
const productSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().optional(),
  price: z.coerce.number().positive('O preço deve ser positivo'),
  stock: z.coerce.number().int().nonnegative('O estoque deve ser zero ou maior'),
});

class ProductController {
  static uploadMiddleware(req, res, next) {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError || err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  }

  async create(req, res) {
    try {
      const { name, description, price, stock } = req.body;
      const parsed = productSchema.safeParse({
        name,
        description,
        price: parseFloat(price),
        stock: stock ? parseInt(stock) : 0,
      });

      if (!parsed.success) {
        return res.status(400).json({ error: 'Dados inválidos', details: parsed.error.issues });
      }

      const imagePaths = req.files?.map(file => file.filename) || [];
      const newProduct = await prisma.product.create({ data: { ...parsed.data, images: imagePaths } });

      return res.status(201).json(newProduct);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      return res.status(500).json({ error: 'Erro ao criar produto.', details: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const products = await prisma.product.findMany();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produtos.', details: error.message });
    }
  }

  async findOne(req, res) {
    try {
      const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) } });
      if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produto.', details: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const parsed = productSchema.partial().safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: 'Dados inválidos', details: parsed.error.issues });
      }
      const existingProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
      if (!existingProduct) return res.status(404).json({ error: 'Produto não encontrado.' });
      const updatedProduct = await prisma.product.update({ where: { id: Number(id) }, data: parsed.data });
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar produto.', details: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const existingProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
      if (!existingProduct) return res.status(404).json({ error: 'Produto não encontrado.' });
      await prisma.product.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar produto.', details: error.message });
    }
  }
}

module.exports = new ProductController();