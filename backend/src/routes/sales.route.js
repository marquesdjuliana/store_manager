const route = require('express').Router();
const { salesController } = require('../controllers');
const validateSales = require('../middlewares/validateSales');

route.get('/', salesController.listAllSales);
route.get('/:id', salesController.getSaleById);
route.post('/', validateSales, salesController.createCompleteSale);

module.exports = route;
