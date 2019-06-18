'use strict';

const ShoppingService = {

  getItems(knex) {
    return knex('shopping_test')
      .select('*');
  },

  getItemById(knex, id) {
    
  },

  insertItem(knex, newItem) {

  },

  updateItem(knex, id, newItemFields) {

  },

  deleteItem(knex, id) {

  }
};

module.exports = ShoppingService;