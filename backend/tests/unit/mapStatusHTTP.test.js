const { expect } = require('chai');
const mapStatusHTTP = require('../../src/utils/mapStatusHTTP');

describe('mapStatusHTTP Tests:', function () {
  it('Tests whether map status codes correctly', function () {
    const httpErrorMap = {
      SUCCESSFUL: 200,
      CREATED: 201,
      NOT_FOUND: 404,
      CONFLICT: 409,
      INVALID_VALUE: 422,
    };

    Object.keys(httpErrorMap).forEach((status) => {
      const statusCode = httpErrorMap[status];
      expect(mapStatusHTTP(status)).to.equal(statusCode);
    });
  });

  it('Tests whether map unknown status code to 500', function () {
    expect(mapStatusHTTP('UNKNOWN_STATUS')).to.equal(500);
  });
});