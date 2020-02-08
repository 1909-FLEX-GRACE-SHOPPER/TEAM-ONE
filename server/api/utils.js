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

function OrderObject(id, order) {
  this.userId = id;
  this.orderCost = 100.0;
  this.shippingName = order.shippingName;
  this.shippingAddress = order.shippingAddress;
  this.shippingCity = order.shippingCity;
  this.shippingState = order.shippingState;
  this.shippingZip = order.shippingZip;
  this.shippingCountry = order.shippingCountry || null;
  this.shippingNotes = order.shippingNotes || null;
  this.cardHolder = order.cardHolder;
  this.cardNumber = order.cardNumber;
  this.securityCode = order.securityCode;
  this.expirationDate = order.expirationDate;
}

// Update the orders table and cart table so that
// any orders or cart items that used to belong to
// the guest will belong to the new user
const mergeAndDestroyUser = async (newUser, guestUserInfo) => {
  const guestUser = await User.findOne({
    where: { ...guestUserInfo }
  });
  console.log('FOUND GUEST USER');
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
    await CartList.update(
      { userId: newUser.id },
      {
        where: {
          userId: guestUser.id
        }
      }
    );
  } catch (e) {
    console.log('FAILED TO UPDATE CART LIST');
    console.error(e);
  }
  return newUser;
};

module.exports = {
  paginate,
  UserObject,
  CartObject,
  OrderObject,
  mergeAndDestroyUser
};
