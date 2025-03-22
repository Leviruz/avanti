const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();

router.post('/produtos', ProductController.create);
router.get('/produtos', ProductController.findAll);
router.get('/produtos/:id', ProductController.findOne);
router.put('/produtos/:id', ProductController.update);
router.delete('/produtos/:id', ProductController.delete);

module.exports = router;