const express = require('express');
const ItemController = require('../controllers/mainController');

const router = express.Router();

router.post('/items', ItemController.create);
router.get('/items', ItemController.findAll);
router.get('/items/:id', ItemController.findOne);
router.put('/items/:id', ItemController.update);
router.delete('/items/:id', ItemController.delete);

module.exports = router;