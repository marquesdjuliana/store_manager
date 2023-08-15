const route = require('express').Router();
const { productsController } = require('../controllers');
const validateProduct = require('../middlewares/validateProduct');

route.get('/', productsController.listAllProducts);
route.get('/:id', productsController.getProductsById);
route.post('/', validateProduct, productsController.createProduct);

module.exports = route;