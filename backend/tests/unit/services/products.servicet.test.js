const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProducts, productFromDB } = require('../mocks/products.mock');

describe('Products Service Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Tests whether to return all products successfully', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProducts);
    
    const result = await productsService.listAllProducts();

    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.deep.equal(allProducts);
  });

  it('Tests whether to return product by id successfully', async function () {
    const productId = 1;
    sinon.stub(productsModel, 'findById').resolves([productFromDB]);
    
    const result = await productsService.getProductsId(productId);

    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.deep.equal([productFromDB]);
  });

  it('Tests whether to return NOT_FOUND if product is not found by id', async function () {
    const productId = 10;
    sinon.stub(productsModel, 'findById').resolves(null);

    const result = await productsService.getProductsId(productId);

    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data.message).to.equal('Product not found');
  });
});
