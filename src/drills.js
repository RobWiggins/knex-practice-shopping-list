'use strict';
// entire require 
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

console.log('connection successful');

// exercise 1 - get all items that contain text
function getAllTextItems(searchTerm) {
  return knexInstance.select('*')
    .from('shopping_list')
    .where('item_name', 'ILIKE', `%${searchTerm}%`)
    .then(result => console.log(result));
}

getAllTextItems('chicken');


// exercise 2
function paginateItems(pageNumber) {
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNumber - 1);
  knexInstance('shopping_list')
    .select('*')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => console.log(result));
}

