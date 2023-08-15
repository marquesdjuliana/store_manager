const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productsFromDB, productFomDB } = require('../mocks/products.mock');

describe('Products Model Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Tests whether to return all products via GET /products', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.findAll();
    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(productsFromDB);
  });

  it('Tests whether to return a product with specified id via GET /products/:id', async function () {
    sinon.stub(connection, 'execute').resolves([[productFomDB]]);
    
    const productId = 1;
    const product = await productsModel.findById(productId);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productFomDB);
  });
});
