const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const validateProduct = require('../../../src/middlewares/validateProduct');

describe('validateProduct Middleware Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Tests if it returns the 400 status with message for missing "name" field', function () {
    const req = {
      body: {},
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    validateProduct(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Tests if it passes validation for valid product data', async function () {
    const req = {
      body: { name: 'Product1' }, 
    };

    const res = {
      status: sinon.stub(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    await validateProduct(req, res, next);
    expect(next).to.have.been.calledWith();
  });
});
