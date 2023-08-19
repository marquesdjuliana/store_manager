const { expect } = require('chai');
const sinon = require('sinon');

const { listAllSales, getSaleById, createCompleteSale } = require('../../../src/services/sales.service');
const { salesModel, productsModel } = require('../../../src/models');
const { allSales, specificSale, allSalesResponse, specificSaleResponse } = require('../mocks/sales.mock');

describe('Sales Service Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Tests whether all sales are retrieved correctly', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(allSales);

    const result = await listAllSales();
    expect(result).to.deep.equal(allSalesResponse);
  });

  it('Tests whether a single sale is retrieved correctly', async function () {
    const saleId = 1;
    sinon.stub(salesModel, 'findSaleById').withArgs(saleId).resolves(specificSale);

    const result = await getSaleById(saleId);
    expect(result).to.deep.equal(specificSaleResponse);
  });

  it('Tests whether a sale with a non-existing id returns "NOT_FOUND"', async function () {
    const nonExistingSaleId = 0;
    sinon.stub(salesModel, 'findSaleById').withArgs(nonExistingSaleId).resolves(null);

    const result = await getSaleById(nonExistingSaleId);
    expect(result).to.deep.equal({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });
  });
  it('Tests whether creating a sale with non-existing products returns "Product not found"', async function () {
    const nonExistingProductId = 100;
    const productsSold = [
      { productId: nonExistingProductId, quantity: 2 },
      { productId: 2, quantity: 3 },
    ];
  
    sinon.stub(productsModel, 'findById').resolves(null);
  
    const result = await createCompleteSale(productsSold);
    expect(result).to.deep.equal({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
  });
});
