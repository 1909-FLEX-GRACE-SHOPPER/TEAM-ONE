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

module.exports = { paginate, UserObject };
