const express = require('express');
const SellerController = require('../controllers/sellerController');

const router = express.Router();

router.post('/vendedor', SellerController.create);
router.get('/', async (req, res) => {
    try {
      const vendedores = await prisma.vendedor.findMany();
      res.json(vendedores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
router.get('/vendedor/:id', SellerController.findOne);
router.put('/vendedor/:id', SellerController.update);
router.delete('/vendedor/:id', SellerController.delete);

module.exports = router;