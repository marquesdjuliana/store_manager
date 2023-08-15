const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProducts, productResponse } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('Products Controller Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Tests whether to product list return with status 200', async function () {
    sinon.stub(productsService, 'listAllProducts').resolves(productResponse);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.listAllProducts({}, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Tests whether to return of a product with status 200', async function () {
    sinon.stub(productsService, 'getProductsId').resolves(productResponse);
  
    const req = {
      params: { productId: 1 },
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productsController.getProductsById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productResponse.data);
  });

  it('Tests whether product not found should return with status 404', async function () {
    const serviceResponse = { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    sinon.stub(productsService, 'getProductsId').resolves(serviceResponse);

    const req = {
      params: { id: 10 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductsById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });
});
