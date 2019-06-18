'use strict';

require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');
const ShoppingService = require('../src/shopping-list-service');
const knex = require('knex');


describe('Testing ShoppingService Object', () => {

  // define db (knexInstance) outside to broaden/keep scope
  let db;
  before(() => {
    db = knex( { 
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  describe('Testing getItems() from ShoppingService ', () => {

    it();

  });

})
