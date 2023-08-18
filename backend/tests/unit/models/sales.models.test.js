const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSales, specificSale, insertedSaleId } = require('../mocks/sales.mock');
const app = require('../../../src/app');

chai.use(chaiHttp);
describe('Sales Models Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Tests whether all sales are retrieved correctly', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    const sales = await salesModel.findAllSales();
    expect(sales).to.be.deep.equal(allSales);
  });

  it('Tests whether a single sale is retrieved correctly', async function () {
    sinon.stub(connection, 'execute').resolves([specificSale[0]]);
    const saleId = 1;
    const sale = await salesModel.findSaleById(saleId);
    expect(sale).to.be.deep.equal(specificSale[0]);
  });
  
  it('Tests whether it successfully creates a new sale and retrieves it by ID', async function () {
    sinon.stub(connection, 'execute').resolves([insertedSaleId]);
  
    const saleItemsToAdd = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
  
    const createdSaleId = await salesModel.createCompleteSale(
      saleItemsToAdd,
    );
    expect(createdSaleId).to.be.a('number');
    expect(createdSaleId).to.deep.equal(10);
  });
  
  it('Retrieves a single sale correctly by ID and through the API route', async function () {
    sinon.stub(connection, 'execute').resolves([specificSale]);
  
    const retrievedModelResponse = await salesModel.findSaleById(10);
    expect(retrievedModelResponse).to.be.an('array');
    expect(retrievedModelResponse).to.have.length(2);
    expect(retrievedModelResponse).to.be.deep.equal(specificSale);
  
    const apiRouteResponse = await chai.request(app).get('/sales/1');
    expect(apiRouteResponse.body).to.deep.equal(specificSale);
    expect(apiRouteResponse.status).to.be.equal(200);
  });
});
