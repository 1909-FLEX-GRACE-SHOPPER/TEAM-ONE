'use strict';

// Assertions
const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

// User Model
const db = require('../server/db');
const User = db.models('orders');

// User Routes
const app = require('../server/index');

// User Component
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import React from 'react';

// Redux

describe('User Model', () => {

})

describe('User Routes', () => {

})