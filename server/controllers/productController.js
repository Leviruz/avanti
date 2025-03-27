const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { z } = require('zod');
const multer = require('multer'); 
const path = require('path'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Apenas imagens são permitidas (JPEG, JPG, PNG)'));
  }
}).array('images', 4);


// Esquema de validação
const productSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().optional(),
  price: z.coerce.number().positive("O preço deve ser positivo"),
  stock: z.coerce.number().int().nonnegative("O estoque deve ser zero ou maior"),
});

class ProductController {

  static uploadMiddleware(req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
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
        stock: stock ? parseInt(stock) : 0
      });
      
      if (!parsed.success) {
        return res.status(400).json({ error: "Dados inválidos", details: parsed.error.issues });
      }

      const imagePaths = req.files?.map(file => file.path) || [];

      const newProduct = await prisma.product.create({
        data: {
          ...parsed.data,
          images: imagePaths 
        },
      });

      return res.status(201).json(newProduct);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      return res.status(500).json({ error: 'Erro ao criar produto.', details: error.message });
    }
  }

  // Buscar todos os produtos
  async findAll(req, res) {
    try {
      const products = await prisma.product.findMany();
      
      const productsWithRelativePaths = products.map(product => {
        if (product.images && Array.isArray(product.images)) {
          const adjustedImages = product.images.map(img => {
            return img.replace(/^.*[\\\/]uploads[\\\/]/, '');
          });
          return { ...product, images: adjustedImages };
        }
        return product;
      });
      
      return res.status(200).json(productsWithRelativePaths);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produtos.', details: error.message });
    }
  }

  // Buscar um product pelo ID
  async findOne(req, res) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
  
      // Ajusta os caminhos das imagens se necessário
      const productWithImages = {
        ...product,
        images: product.images.map(img => `http://localhost:3000/uploads/${img.replace(/^.*[\\\/]uploads[\\\/]/, '')}`)
      };
  
      res.json(productWithImages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Atualizar um product
  async update(req, res) {
    const { id } = req.params;
    const parsed = productSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.issues });
    }
    try {
      const existingProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
      if (!existingProduct) {
        return res.status(404).json({ error: "Produto não encontrado." });
      }
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: parsed.data,
      });
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar produto.', details: error.message });
    }
  }

  // Deletar um produto
  async delete(req, res) {
    const { id } = req.params;
    try {
      const existingProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
      if (!existingProduct) {
        return res.status(404).json({ error: "Produto não encontrado." });
      }
      await prisma.product.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar produto.', details: error.message });
    }
  }
}

module.exports = new ProductController();