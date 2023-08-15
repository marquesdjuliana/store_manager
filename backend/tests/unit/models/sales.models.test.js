const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesData, specificSaleData } = require('../mocks/sales.mock');

describe('Sales Models Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Tests whether all sales are retrieved correctly', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesData]);
    const sales = await salesModel.findAllSales();
    expect(sales).to.be.deep.equal(allSalesData);
  });

  it('Tests whether a single sale is retrieved correctly', async function () {
    sinon.stub(connection, 'execute').resolves([specificSaleData[0]]);
    const saleId = 1;
    const sale = await salesModel.findSaleById(saleId);
    expect(sale).to.be.deep.equal(specificSaleData[0]);
  });
});