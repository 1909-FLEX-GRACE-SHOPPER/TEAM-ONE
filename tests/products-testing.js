'use strict';

// Assertions
const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

// Product Model
const { models } = require('../server/db/index');
const { Product } = models

// Product Routes
const app = require('../server/index');
const agent = require('supertest')(app);

// Product Component
// import enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// enzyme.configure({ adapter: new Adapter() });
// import React from 'react';

// Redux

describe('Product Model', () => {
    describe('Validations', () => {
        let product;
        before(() => {
            product = Product.build();
        });

        it('requires `productName`', async () => {
            try {
                await product.validate()
                throw Error('validation was successful but should have failed without `productName`');
            }
            catch (err) {
                expect(err.message).to.contain('Product name cannot be null')
            }
        })

    })
})

describe('Product Routes', () => {
    let storedProducts;

    const productData = [
        {
            id: '07a5ac20-2275-4392-b6c9-0e5bd21a0166',
            productName: 'JUUL pod',
            productDescription: 'buy two get the third one for free',
            unitPrice: 1000,
            inventory: 3,
            productImage: 'no image'
        },
        {
            id: '9df5c385-56ce-4159-8614-af919bd5771a',
            productName: 'vapor device',
            productDescription: 'buy five get the sixth one for free',
            unitPrice: 6000,
            inventory: 6,
            productImage: 'no image'
        }
    ];

    beforeEach(async () => {
        await Product.destroy({ where: {}, force: true })
        const createdProducts = await Product.bulkCreate(productData);
        storedProducts = createdProducts.map(product => product.dataValues);
    })

    describe('GET `/api/products`', () => {
        it('should get all products', async () => {
            const response = await agent
                .get('/api/products')
                .expect(200)

            expect(response.body).to.have.length(2);
            expect(response.body[0].unitPrice).to.equal(storedProducts[0].unitPrice)
        })
    })
})