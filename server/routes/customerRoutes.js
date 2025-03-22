const express = require('express');
const CustomerController = require('../controllers/customerController');

const router = express.Router();

router.post('/cliente', CustomerController.create);
router.get('/cliente', CustomerController.findAll);
router.get('/cliente/:id', CustomerController.findOne);
router.put('/cliente/:id', CustomerController.update);
router.delete('/cliente/:id', CustomerController.delete);

module.exports = router;