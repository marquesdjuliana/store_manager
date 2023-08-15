const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { allSalesResponse, specificSaleResponse } = require('../mocks/sales.mock');

describe('Sales Controller Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Tests whether the list of all sales returns with status 200', async function () {
    sinon.stub(salesService, 'listAllSales').resolves(allSalesResponse);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.listAllSales({}, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesResponse.data);
  });

  it('Tests whether the return of a specific sale with status 200', async function () {
    const saleId = 1;
    sinon.stub(salesService, 'getSaleById').resolves(specificSaleResponse);
  
    const req = {
      params: { id: saleId },
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(specificSaleResponse.data);
  });

  it('Tests whether a sale not found should return with status 404', async function () {
    const serviceResponse = { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    const saleId = 10;
    sinon.stub(salesService, 'getSaleById').resolves(serviceResponse);

    const req = {
      params: { id: saleId },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });
});
