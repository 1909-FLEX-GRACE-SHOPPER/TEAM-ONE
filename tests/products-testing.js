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

})

describe('Product Routes', () => {

})