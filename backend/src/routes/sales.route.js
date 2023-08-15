const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.listAllSales);
route.get('/:id', salesController.getSaleById);

module.exports = route;
