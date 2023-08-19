const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateSale } = require('../middlewares/validateSales');

route.get('/', salesController.listAllSales);
route.get('/:id', salesController.getSaleById);
route.post('/', validateSale, salesController.createCompleteSale);

module.exports = route;
