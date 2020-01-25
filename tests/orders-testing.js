'use strict';

// Assertions
const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);


// Order Model
const { models } = require('../server/db/index');
const { Order } = models

// Order Routes
const app = require('../server/index');
const agent = require('supertest')(app);

// Order Component
// import { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// enzyme.configure({ adapter: new Adapter() });
// import React from 'react';

// Redux

// npm test -- filename


describe('Order Model', () => {
    // testing test set up
    it('should return number of characters in a string', function () {
        const num = "Hello".length
        expect(num).to.equal(5)
    })
    describe('Validations', () => {
        let order;
        before(() => {
            order = Order.build();
        });

        it('requires `orderCost`', async () => {
            try {
                await order.validate()
                throw Error('validation was successful but should have failed without `orderCost`');
            }
            catch (err) {
                expect(err.message).to.contain('orderCost')
            }
        })

    })
})

describe('Order Routes', () => {
    let storedOrders;

    const orderData = [
        {
            id: '07a5ac20-2275-4392-b6c9-0e5bd21a0166',
            orderCost: 40,
            firstName: 'Hana',
            lastName: 'Gin',
            shippingAddress: '7 Hanover Square',
            shippingCity: 'New York',
            shippingState: 'NY',
            shippingZip: 10004
        },
        {
            id: '9df5c385-56ce-4159-8614-af919bd5771a',
            orderCost: 1000,
            firstName: 'Dobby',
            lastName: 'Rum',
            shippingAddress: '11 Hanover Square',
            shippingCity: 'New York',
            shippingState: 'NY',
            shippingZip: 10004
        }
    ];

    beforeEach(async () => {
        const createdOrders = await Order.bulkCreate(orderData);
        storedOrders = createdOrders.map(order => order.dataValues);
    })

    describe('GET `/api/orders`', () => {
        it('should get all orders', async () => {
            const response = await agent
                .get('/api/orders')
                .expect(200)
            expect(response.body).to.have.length(2);
            expect(response.body[0].firstName).to.equal(storedOrders[0].firstName)
        })
    })
})