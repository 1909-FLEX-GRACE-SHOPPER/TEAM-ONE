const router = require("express").Router();

const { Order, User } = require("../db/index.js");

//Finds and servers all orders
router.get('/', (req, res, next) => {
	Order.findAllAndCount()
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

//Finds and serves a single user based on a primary key.
//Eager loads associated cart.
router.get('/:orderId/cart', (req, res, next) => {
	User.findByPk(req.params.orderId, {
		include: [
			{
				model: Cart,
			},
		],
	})
	.then((user) => res.send(user))
	.catch(e => {
		res.status(404);
		next(e);
	})
})

//Adds a new item to the cart
router.post('/:orderId/cart', (req, res, next) => {
	const { productId, productQuantity, productCost } = req.body;
	const { orderId } = req.params;

	Cart.create({
		orderId: orderId * 1,
		productId: productId * 1,
		productQuantity: productQuantity * 1,
		productCost: (productCost * 1).toFixed(2),
	})
	.then(() => res.status(201))
	.catch(e => {
		res.status(400);
		next(e);
	})
})

//Deletes an item from a cart
router.delete('/:orderId/cart/:cartId', (req, res, next) => {
	const { cartId } = req.params;

	Cart.findByPk(cartId)
	.then(cart => cart.destroy())
	.then(() => res.status(202))
	.catch(e => {
		res.status(404);
		next(e);
	})
})

//Updates an existing item in the cart
router.put('/:orderId/cart/:cartId', (req, res, next) => {
	const { 
		productId,
		productQuantity,
		productCost
	} = req.body;
	const { orderId, cartId } = req.params;

	Cart.findByPk(cartId)
	.then(cart => cart.update({
		orderId: orderId * 1,
		productId: productId * 1 || cart.productId,
		productQuantity: productQuantity * 1 || cart.productQuantity,
		productCost: productCost * 1 || cart.productCost
	}))
	.then(() => res.status(202))
	.catch(e => {
		res.status(304);
		next(e);
	})
})

module.exports = router