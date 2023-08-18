const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const specificProduct = {
  id: 1,
  name: 'Martelo de Thor',
};

const productResponse = { 
  status: 'SUCCESSFUL',
  data: allProducts,
};
const createdProduct = {
  id: 4,
  name: 'New product created',
};
module.exports = {
  allProducts,
  specificProduct,
  productResponse,
  createdProduct,
};