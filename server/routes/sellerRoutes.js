const express = require('express');
const SellerController = require('../controllers/sellerController');

const router = express.Router();

router.post('/vendedor', SellerController.create);
router.get('/vendedor', SellerController.findAll);
router.get('/vendedor/:id', SellerController.findOne);
router.put('/vendedor/:id', SellerController.update);
router.delete('/vendedor/:id', SellerController.delete);

module.exports = router;