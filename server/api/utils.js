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
  this.shippingName = cart.shippingName || null;
  this.shippingAddress = cart.shippingAddress || null;
  this.shippingCity = cart.shippingCity || null;
  this.shippingState = cart.shippingState || null;
  this.shippingZip = cart.shippingZip || null;
  this.shippingCountry = cart.shippingCountry || null;
  this.shippingNotes = cart.shippingNotes || null;
  this.cardHolder = cart.cardHolder || null;
  this.cardNumber = cart.cardNumber || null;
  this.securityCode = cart.securityCode || null;
  this.expirationDate = cart.expirationDate || null;
}

module.exports = { paginate, UserObject, CartObject };
