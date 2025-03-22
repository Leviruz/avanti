const express = require('express');
const OrderController = require('../controllers/orderController');

const router = express.Router();

router.post('/pedidos', OrderController.create);
router.get('/pedidos', OrderController.findAll);
router.get('/pedidos/:id', OrderController.findOne);
router.put('/pedidos/:id', OrderController.updateStatus);
router.delete('/pedidos/:id', OrderController.cancel);

module.exports = router;