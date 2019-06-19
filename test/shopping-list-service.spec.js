'use strict';

require('dotenv').config();
const { expect } = require('chai');
const mocha = require('mocha');
const supertest = require('supertest');
const ShoppingService = require('../src/shopping-list-service');
const knex = require('knex');


describe('Testing ShoppingService Object', () => {

  const testingData = [
    { item_name: 'item1', summary: 'summary1'},
    { item_name: 'item2', summary: 'summary2'},
    { item_name: 'item3', summary: 'summary3'}
  ];
    
  // define db (knexInstance) outside to broaden/keep scope
  let db;
  before(() => {
    db = knex( { 
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  describe('Testing getItems() from ShoppingService ', () => {

    before(() => {
      return db('shopping_list')
        .insert(testingData);
    });

    it('should run the tests', () => { 
      expect(true).to.be.true;
    });

    it('should return all the testing items of length 3', () => {
      return ShoppingService.getItems(db)
        .then( result => {
          expect(result.length).to.equal(3);
        });
    });

    it('should return the correct item name of the last element', () => {
      ShoppingService.getItems(db)
        .then( result => {
          expect(result[result.length - 1].item_name).to.equal('item3');
        });
    });
    // return expect(ShoppingService.getItems()[0].summary).to.equal('summary1');

    /** why truncate not working here??? 3 length anyways??? */
    // it('should return an empty array if no items', () => {
    //   db('shopping_test').truncate();
    //   return ShoppingService.getItems(db)
    //     .then( result => {
    //       console.log(result);
    //       expect(result.length).to.equal(0);
    //     });
    // });

    after(() => db('shopping_list').truncate());
  });

  describe('table has no items if none inserted', () => {
  // testing outside of general getItems() describe block
    it('should return an empty array if no items', () => {
    // db('shopping_test').truncate();
      return ShoppingService.getItems(db)
        .then( result => {
        // console.log(result);
          expect(result.length).to.equal(0);
        });
    });
  });

  describe('testing getItemById()', () => {
    
    before( () => db('shopping_list').insert(testingData));

    // need to do first() on the getItemById!! otherwise returns array of 1 obj
    it('retrieves the correct element by its numbered ID', () => {
      return ShoppingService.getItemById(db, 2)
        .then(result => {
          // console.log(result);
          expect(result.id).to.equal(2);
        });
    });

    after(() => db('shopping_list').truncate());
  });

  

  
  after(() => db.destroy());

});
