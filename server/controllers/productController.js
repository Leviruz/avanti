const ProductService = require("../services/productService");
const multer = require("multer");
const path = require("path");

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads/")),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    return mimetype && extname
      ? cb(null, true)
      : cb(new Error("Apenas imagens são permitidas (JPEG, JPG, PNG)"));
  },
}).array("images", 4);

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
      const newProduct = await ProductService.create(req.body, req.files);
      return res.status(201).json(newProduct);
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao criar produto",
        details: err.details || error.message,
      });
    }
  }

  async findAll(req, res) {
    try {
      const products = await ProductService.findAll();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar produtos",
        details: error.message,
      });
    }
  }

  async findOne(req, res) {
    try {
      const product = await ProductService.findOne(Number(req.params.id));
      return res.status(200).json(product);
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao buscar produto",
        details: err.details || error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const updatedProduct = await ProductService.update(
        Number(req.params.id),
        req.body
      );
      return res.status(200).json(updatedProduct);
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao atualizar produto",
        details: err.details || error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      await ProductService.delete(Number(req.params.id));
      return res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      const err = JSON.parse(error.message);
      return res.status(err.statusCode || 500).json({
        error: err.error || "Erro ao deletar produto",
        details: err.details || error.message,
      });
    }
  }
}

module.exports = new ProductController();
