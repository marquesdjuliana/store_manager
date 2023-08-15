const allSalesData = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 3,
  },
  {
    saleId: 2,
    date: '2021-09-09T04:54:31.000Z',
    productId: 2,
    quantity: 4,
  },
];

const specificSaleData = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 3,
  },
];

const allSalesResponse = {
  status: 'SUCCESSFUL',
  data: allSalesData,
};

const specificSaleResponse = {
  status: 'SUCCESSFUL',
  data: specificSaleData,
};

module.exports = {
  allSalesData,
  specificSaleData,
  allSalesResponse,
  specificSaleResponse,
};