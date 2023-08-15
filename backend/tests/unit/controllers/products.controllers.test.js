const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsFromDB, productFromService } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('Products Controller Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Tests whether to product list return with status 200', async function () {
    sinon.stub(productsService, 'listAllProducts').resolves(productFromService);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.listAllProducts({}, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromDB);
  });

  it('Tests whether to return of a product with status 200', async function () {
    sinon.stub(productsService, 'getProductsId').resolves(productFromService);
  
    const req = {
      params: { productId: 1 },
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productsController.getProductsById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromService.data);
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
