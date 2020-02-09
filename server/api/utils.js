const axios = require('axios');
const { models } = require('../db/index.js');
const { User, Order, Cart, CartList } = models;

//Pagination middleware.
//TODO: Return data when the limit is less than the number of rows on a "page" of the table
const paginate = model => {
  return (req, res, next) => {
    const limit = Number(req.params.limit) || 10;
    const offset = req.params.page * limit || 0;
    model
      .findAndCountAll({
        offset,
        limit
      })
      .then(foundModels => {
        res.send(foundModels);
      })
      .catch(e => {
        res.status(500);
        next(e);
      });
  };
};

function UserObject(user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.password = user.password;
  this.phone = user.phone || null;
  this.shippingAddress = user.shippingAddress || null;
  this.shippingCity = user.shippingCity || null;
  this.shippingState = user.shippingState || null;
  this.shippingZip = user.shippingZip || null;
  this.billingAddress = user.billingAddress || null;
  this.billingCity = user.billingCity || null;
  this.billingState = user.billingState || null;
  this.billingZip = user.billingZip || null;
  this.userType = 'Existing customer';
}

function CartObject(cart) {
  this.shippingName = cart.shippingName;
  this.shippingAddress = cart.shippingAddress;
  this.shippingCity = cart.shippingCity;
  this.shippingState = cart.shippingState;
  this.shippingZip = cart.shippingZip;
  this.shippingCountry = cart.shippingCountry || null;
  this.shippingNotes = cart.shippingNotes || null;
  this.cardHolder = cart.cardHolder;
  this.cardNumber = cart.cardNumber;
  this.securityCode = cart.securityCode;
  if (cart.expirationDate) {
    this.expirationDate = `${cart.expirationDate.month} / ${cart.expirationDate.year}`;
  }
}

function OrderObject(id, cartList) {
  this.orderCost = cartList.reduce((total, _item) => total + _item.subtotal, 0);
  this.userId = id;
  this.orderCost = 100.0;
}

const sendEmail = (recipient, subject, body, options) => {
  //handle errors
  //1 recipient, subject, body parameters are not strings
  if (![recipient, subject, body].every(arg => typeof arg === 'string'))
    throw new Error(
      'The recipient, subject, and body parameters must be strings'
    );
  //2) the object parameter is not an object
  if (
    options !== undefined &&
    Object.prototype.toString.call(options).match(/Object/g) === null
  )
    throw new Error('the options parameter must be an object');
  //3) the body contains html but the options object does not contain an htmlBody property
  if (
    body.indexOf('<') !== -1 &&
    body.indexOf('</') !== -1 &&
    !options.hasOwnProperty('htmlBody')
  ) {
    throw new Error(
      "Your email body appears to contain HTML. But you have not provided an htmlBody property to the options parameter. In order to send an email with html in the body, set the 'htmlBody' property in the options object equal to the html string that you want to send."
    );
  }
  const pkg = encodeURIComponent(
    JSON.stringify({
      recipient,
      subject,
      body,
      options
    })
  );
  const url = `https://script.google.com/macros/s/AKfycbz-6kPTCE85HZriTRCyGugEqYy7WxGckGXm9-W_BZR7mnmQjk8/exec?package=${pkg}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// Update the orders table and cart table so that
// any orders or cart items that used to belong to
// the guest will belong to the new user
const mergeAndDestroyUser = async (newUser, guestUserInfo) => {
  const guestUser = (
    await User.findOne({
      where: { ...guestUserInfo }
    })
  ).dataValues;

  try {
    await Order.update(
      { userId: newUser.id },
      {
        where: {
          userId: guestUser.id
        }
      }
    );
    console.log('UPDATED ORDERS');
  } catch (e) {
    console.log('FAILED TO UPDATE ORDERS FOR NEW USER');
    console.error(e);
    return new Error(e);
  }
  try {
    await Cart.update(
      { userId: newUser.id },
      {
        where: {
          userId: guestUser.id
        }
      }
    );
    console.log('UPDATED CART');
  } catch (e) {
    console.log('FAILED TO UPDATE CART FOR NEW USER');
    console.error(e);
    return new Error(e);
  }
  try {
    console.log('newUser id is', newUser.id);
    await CartList.update(
      { userId: newUser.id },
      {
        where: {
          userId: guestUser.id
        }
      }
    );
    console.log('UPDATED CART LIST');
  } catch (e) {
    console.log('FAILED TO UPDATE CART LIST');
    console.error(e);
  }
  try {
    await User.destroy({
      where: {
        ...guestUserInfo
      }
    });
    console.log('DESTROYED USER');
  } catch (e) {
    console.log('FAILED TO DESTROY GUEST USER');
    console.error(e);
    return new Error(e);
  }
  return newUser;
};

module.exports = {
  paginate,
  UserObject,
  CartObject,
  OrderObject,
  mergeAndDestroyUser,
  sendEmail
};
