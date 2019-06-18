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
/* test exercise 1 by calling function */
// getAllTextItems('chicken');


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

/* test exercise 2 by calling function */
// paginateItems(2);


// exercise 3 - Get all items added after date
function addedAfterDate(days) {
  knexInstance('shopping_list')
    .select('*')
    .where('date_added', '<', knexInstance.raw('now() - \'?? days\'::INTERVAL', days))
    .then(result => console.log(result));
}

/* test exercise 3 by calling function */
// REVIEW THIS INTERVAL LOGIC....
// addedAfterDate(10);


// Get the total cost for each category
function getTotalCost() {
  knexInstance('shopping_list')
    .select('category')
    .count('price as total')
    .groupBy('category')
    .then(result => {
      console.log('COST PER CATEGORY');
      console.log(result);
    });
    
}

/* test exercise 4 by calling function */
getTotalCost();