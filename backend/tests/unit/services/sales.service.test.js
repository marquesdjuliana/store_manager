const { expect } = require('chai');
const sinon = require('sinon');

const { listAllSales, getSaleById } = require('../../../src/services/sales.service');
const { salesModel } = require('../../../src/models');
const { allSalesData, specificSaleData, allSalesResponse, specificSaleResponse } = require('../mocks/sales.mock');

describe('Sales Service Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Tests whether all sales are retrieved correctly', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(allSalesData);

    const result = await listAllSales();
    expect(result).to.deep.equal(allSalesResponse);
  });

  it('Tests whether a single sale is retrieved correctly', async function () {
    const saleId = 1;
    sinon.stub(salesModel, 'findSaleById').withArgs(saleId).resolves(specificSaleData);

    const result = await getSaleById(saleId);
    expect(result).to.deep.equal(specificSaleResponse);
  });

  it('Tests whether a sale with a non-existing id returns "NOT_FOUND"', async function () {
    const nonExistingSaleId = 0;
    sinon.stub(salesModel, 'findSaleById').withArgs(nonExistingSaleId).resolves(null);

    const result = await getSaleById(nonExistingSaleId);
    expect(result).to.deep.equal({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });
  });
});
