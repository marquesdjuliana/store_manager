const express = require('express');
const { productsRoutes } = require('./routes');
// const { use } = require('./routes/products.route');

const app = express();
app.use('/products', productsRoutes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
