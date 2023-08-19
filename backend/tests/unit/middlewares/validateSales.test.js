const { expect } = require('chai');
const sinon = require('sinon');
const validateSales = require('../../../src/middlewares/validateSales');

describe('validateSales Middleware Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Tests if it returns the 400 status with a message for the missing "productId"', async function () {
    const req = {
      body: [{ }],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    await validateSales.validateProductId(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Tests if it returns the 400 status with message for missing "productId" in a single sale', async function () {
    const req = {
      body: [{ quantity: 1 }],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    await validateSales.validateProductId(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Tests if it returns the 422 status with message for invalid "quantity"', async function () {
    const req = {
      body: [{ productId: 1, quantity: 0 }],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    await validateSales.validateQuantity(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Tests if sales data is valid and moves on to the next flow', async function () {
    const req = {
      body: [{ productId: 1, quantity: 2 }],
    };

    const res = {
      status: sinon.stub(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    await validateSales.validateProductId(req, res, next);
    await validateSales.validateQuantity(req, res, next);

    expect(res.status).to.not.have.been.calledWith();
    expect(res.json).to.not.have.been.calledWith();
  });
});
