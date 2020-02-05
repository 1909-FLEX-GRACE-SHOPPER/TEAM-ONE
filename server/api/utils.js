//Pagination middleware.
const paginate = model => {
  return (req, res, next) => {
    const limit = req.query.limit * 1 || 10;
    const offset = req.query.page * limit || 0;

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
  if(cart.expirationDate) {
    this.expirationDate = `${ cart.expirationDate.month } / ${ cart.expirationDate.year }`;
  }
}


function OrderObject(id, order) {
  this.userId = id;
  this.orderCost = 100.00;
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

module.exports = { paginate, UserObject, CartObject, OrderObject };
