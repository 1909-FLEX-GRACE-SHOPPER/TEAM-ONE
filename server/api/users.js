const router = require("express").Router();
const paginate = require("./utils");

// const { User, Order } = require('../db/index.js');

//Finds, counts and serves all users
router.get('/', paginate(User), (req, res, next) => {
	res.send(paginate(res.paginate))
	.catch(e => {
		res.status(404);
		next(e);
	})
})

//Finds and serves a single user based on a primary key.
//Eager loads associated orders.
router.get('/:id', (req, res, next) => {
	User.findByPk(req.params.id, {
		include: [
			{
				model: Order,
			},
		],
	})
	.then(user => res.send(user))
	.catch(e => {
		res.status(404);
		next(e);
	})
})

//Creates a new user.
//Sets falsy fields in req.body that are allowed to be null to null
router.post('/', (req, res, next) => {
	const {
		firstName,
		lastName,
		email,
		password,
		userType,
		phone,
		shippingAddress,
		shippingCity,
		shippingState,
		shippingZip,
		billingAddress,
		billingCity,
		billingState,
		billingZip,
	} = req.body

	User.create({
		firstName,
		lastName,
		email,
		password,
		userType,
		phone: phone || null,
		shippingAddress: shippingAddress || null,
		shippingCity: shippingCity || null,
		shippingState: shippingState || null,
		shippingZip: shippingZip || null,
		billingAddress: billingAddress || null,
		billingCity: billingCity || null,
		billingState: billingState || null,
		billingZip: billingZip || null,
	})
	.then(() => res.status(201))
	.catch(e => {
		res.status(400);
		next(e);
	})
})

//Deletes a user based on a primary key.
router.delete('/:id', (req, res, next) => {
	User.findByPk(req.params.id)
	.then(user => user.destroy())
	.then(() => res.status(202))
	.catch(e => {
		res.status(404);
		next(e);
	})
})

//Updates a user based on a primary key.
//Falsy fields in req.body are set to the current values. 
router.put('/:id', (req, res, next) => {
	const {
		firstName,
		lastName,
		email,
		password,
		userType,
		phone,
		shippingAddress,
		shippingCity,
		shippingState,
		shippingZip,
		billingAddress,
		billingCity,
		billingState,
		billingZip,
	} = req.body

	User.findByPk(req.params.id)
	.then(user => user.update({
		firstName: firstName || user.firstName,
		lastName: lastName || user.lastName,
		email: email || user.email,
		password: password || user.password,
		userType: userType || user.userType,
		phone: phone || user.phone,
		shippingAddress: shippingAddress || user.shippingAddress,
		shippingCity: shippingCity || user.shippingCity,
		shippingState: shippingState || user.shippingState,
		shippingZip: shippingZip || user.shippingZip,
		billingAddress: billingAddress || user.billingAddress,
		billingCity: billingCity || user.billingCity,
		billingState: billingState || user.billingState,
		billingZip: billingZip || user.billingZip,
	}))
	.then(() => res.status(202))
	.catch(e => {
		res.status(304);
		next(e);
	})
})

module.exports = router;