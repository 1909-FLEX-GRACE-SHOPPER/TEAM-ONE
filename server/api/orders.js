const router = require("express").Router();

// const { Order, User } = require("../db/index.js");

//Finds and servers all orders
router.get('/', (req, res, next) => {
	Order.findAll()
	.then(orders => res.send(orders))
	.catch(e => {
		res.status(404);
		next(e);
	})
})

//Finds and serves a single order based on a primary key.
//Eager loads associated user.
router.get('/:id', (req, res, next) => {
	Order.findByPk(req.params.id, {
		include: [
			{
				model: User,
			},
		],
	})
	.then(order => res.send(order))
	.catch(e => {
		res.status(404);
		next(e);
	})
})

//Creates a new order.
router.post('/', (req, res, next) => {
	const {
		userId,
		shippingAddress,
		orderCost,
	} = req.body

	Order.create({
		userId,
		shippingAddress,
		orderCost,
	})
	.then(() => res.status(201))
	.catch(e => {
		res.status(400);
		next(e);
	})
})

//Deletes an order based on a primary key.
router.delete('/:id', (req, res, next) => {
	Order.findByPk(req.params.id)
	.then(order => order.destroy())
	.then(() => res.status(202))
	.catch(e => {
		res.status(404)
		next(e)
	})
})

//Updates an order based on a primary key.
//Falsy fields in req.body are set to the current values.
//No need to update a userId
router.put('/:id', (req, res, next) => {
	const {
		shippingAddress,
		orderCost,
	} = req.body

	Order.findByPk(req.params.id)
	.then(order => order.update({
		shippingAddress: shippingAddress || user.shippingAddress,
		orderCost: orderCost || user.orderCost,
	}))
	.then(() => res.status(202))
	.catch(e => {
		res.status(304);
		next(e);
	})
})

module.exports = router