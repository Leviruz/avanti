const express = require('express');
const ProductController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

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
});

// Rotas
router.post('/produtos', 
  upload.array('images', 4),
  ProductController.create
);

router.get('/produtos', ProductController.findAll);
router.get('/produtos/:id', ProductController.findOne);
router.put('/produtos/:id', ProductController.update);
router.delete('/produtos/:id', ProductController.delete);

module.exports = router;