'use strict';

// Assertions
const chai = require('chai');
const expect = chai.expect;

// Order Model
const db = require('../server/db');
const Order = db.models('orders');

// Order Routes
const app = require('../server/index');

describe('Order Model', () => {
    it('should return number of characters in a string', function () {
        const num = "Hello".length
        expect(num).to.equal(4)
    })
    // describe('Validations', () => {
    // it('requires `orderCost`', async () => {
    //     const order = Order.build();
    //     try {
    //         await order.validate()
    //         throw Error('validation was successful but should have failed without `orderCost`');
    //     }
    //     catch (err) {
    //         expect(err.meesage).to.contain('orderCost cannot be null')
    //     }
    // })
    // })
})

describe('Order Routes', () => {

})