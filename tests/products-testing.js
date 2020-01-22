'use strict';

// Assertions
const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

// Product Model
const db = require('../server/db');
const Product = db.models('orders');

// Product Routes
const app = require('../server/index');

// Order Component
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import React from 'react';

// Redux

describe('Product Model', () => {
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

describe('Product Routes', () => {

})