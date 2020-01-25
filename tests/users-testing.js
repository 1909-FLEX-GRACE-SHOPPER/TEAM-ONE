'use strict';

// Assertions
const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

// User Model
const { models } = require('../server/db/index');
const { User } = models

// User Routes
const app = require('../server/index');
const agent = require('supertest')(app)

// User Component
// import enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// enzyme.configure({ adapter: new Adapter() });
// import React from 'react';

// Redux

describe('User Model', () => {
    describe('Validations', () => {
        let user;
        before(() => {
            user = User.build();
        });

        it('requires `userType`', async () => {
            try {
                await userType.validate()
                throw Error('validation was successful but should have failed without `userType`');
            }
            catch (err) {
                expect(err.message).to.contain('userType')
            }
        })

    })
})

// describe('User Routes', () => {

// })