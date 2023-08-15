const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { allProducts, specificProduct } = require('../mocks/products.mock');

describe('Products Model Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Tests whether to return all products via GET /products', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const products = await productsModel.findAll();
    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(allProducts);
  });

  it('Tests whether to return a product with specified id via GET /products/:id', async function () {
    sinon.stub(connection, 'execute').resolves([[specificProduct]]);
    
    const productId = 1;
    const product = await productsModel.findById(productId);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(specificProduct);
  });
});
