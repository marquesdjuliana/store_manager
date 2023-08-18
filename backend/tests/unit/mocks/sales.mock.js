const allSales = [
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

const specificSale = [
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
  data: allSales,
};

const specificSaleResponse = {
  status: 'SUCCESSFUL',
  data: specificSale,
};

const insertedSaleId = { insertId: 10 };
const sampleProducts = {
  body: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};
module.exports = {
  allSales,
  specificSale,
  allSalesResponse,
  specificSaleResponse,
   insertedSaleId,
   sampleProducts,
};
