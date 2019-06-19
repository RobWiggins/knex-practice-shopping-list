'use strict';

const ShoppingService = {

  getItems(knex) {
    return knex('shopping_list')
      .select('*');
  },

  getItemById(knex, item_id) {
    return knex('shopping_list')
      .select('*')
      .where('id', item_id)
      .first();
  },

  insertItem(knex, newItem) {
    return knex('shopping_list')
      .insert(newItem)
      .returning('*')
      .then(rows => rows[0]);
  },

  updateItem(knex, id, newItemFields) {
    
  },

  deleteItem(knex, id) {

  }
};

module.exports = ShoppingService;