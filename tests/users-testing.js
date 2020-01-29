"use strict";

// Assertions
import chai, { expect } from "chai";
import chaiThings from "chai-things";
chai.use(chaiThings);

// User Model
const { models, db } = require("../server/db/index");
const { User } = models;

// User Routes
const app = require("../server/index");
const agent = require("supertest")(app);

// User Component
import enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
enzyme.configure({ adapter: new Adapter() });
import React from "react";
import { Login } from "../app/components/Login";
import { Button } from "react-bootstrap";

// Redux

// When run a test: npm test -- tests/users-testing.js

//TO DO: write tests about frontend or backend if necessary

describe("User Model", () => {
  describe("Validations", () => {
    let user;
    before(() => {
      user = User.build();
    });

    it("requires `userType`", async () => {
      try {
        await userType.validate();
        throw Error(
          "validation was successful but should have failed without `userType`"
        );
      } catch (err) {
        expect(err.message).to.contain("userType");
      }
    });
  });
});

describe("User Routes", () => {
  let storedUsers;

  const userData = [
    {
      id: "07a5ac20-2275-4392-b6c9-0e5bd21a0166",
      userType: "Guest"
      // email: 'haha@gmail.com',
      // password: '234145',
      // phone: 2029934857,
      // shippingZip: 23423,
      // cardNumber: 2727383849495050,
      // securityCode: 234,
      // billingZip: 23423,
    },
    {
      id: "9df5c385-56ce-4159-8614-af919bd5771a",
      userType: "Admin"
      // email: 'lol@gmail.com',
      // password: '234145',
      // phone: 2029934857,
      // shippingZip: 23423,
      // cardNumber: 2727383849495050,
      // securityCode: 234,
      // billingZip: 23423,
    }
  ];

  beforeEach(async () => {
    await User.destroy({ where: {}, force: true });
    const createdUsers = await User.bulkCreate(userData);
    storedUsers = createdUsers.map(user => user.dataValues);
  });

  xdescribe("GET `/api/users`", () => {
    it("should get all users", async () => {
      const response = await agent.get("/api/users").expect(200);
      // console.log(response.body)
      expect(response.body.count).to.equal(2);
      expect(response.body.rows[1]["userType"]).to.equal(
        storedUsers[1]["userType"]
      );
    });
  });
});

describe("Login Component render", () => {
  xit("should have a button", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(Button)).to.have.length(1);
  });
});
