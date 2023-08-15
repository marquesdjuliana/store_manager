const productsFromDB = [
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

const productFomDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const productFromService = { 
  status: 'SUCCESSFUL',
  data: productsFromDB,
};

module.exports = {
  productsFromDB,
  productFomDB,
  productFromService,
};