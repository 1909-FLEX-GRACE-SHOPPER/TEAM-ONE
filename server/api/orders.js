const router = require("express").Router();

const { models } = require("../db/index.js");
const { Order, OrderDetail, User } = models;

const paginate = require('./utils');

//Finds and servers all orders
router.get('/', paginate(Order), (req, res, next) => {
	res.status(200).send(res.foundModels)
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
		.then(order => res.status(200).send(order))
		.catch(e => {
			res.status(404);
			next(e);
		})
})

//Finds and serves a single user based on a primary key.
//Eager loads associated cart.
router.get('/:orderId/orderDetails', (req, res, next) => {
	User.findByPk(req.params.orderId, {
		include: [
			{
				model: OrderDetail,
			},
		],
	})
		.then((user) => res.status(200).send(user))
		.catch(e => {
			res.status(404);
			next(e);
		})
})

//Adds a new item to the cart
router.post('/:orderId/orderDetails', (req, res, next) => {
	const { productId, productQuantity, productCost } = req.body;
	const { orderId } = req.params;

	OrderDetail.create({
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
router.delete('/:orderId/orderDetails/:orderDetailId', (req, res, next) => {
	const { orderDetailId } = req.params;

	orderDetail.findByPk(orderDetailId)
		.then(orderDetail => orderDetail.destroy())
		.then(() => res.status(202))
		.catch(e => {
			res.status(404);
			next(e);
		})
})

//Updates an existing item in the cart
router.put('/:orderId/orderDetails/:orderDetailId', (req, res, next) => {
	const {
		productId,
		productQuantity,
		productCost
	} = req.body;
	const { orderId, orderDetailId } = req.params;

	OrderDetail.findByPk(orderDetailId)
		.then(orderDetail => orderDetail.update({
			orderId: orderId * 1,
			productId: productId * 1 || orderDetail.productId,
			productQuantity: productQuantity * 1 || orderDetail.productQuantity,
			productCost: productCost * 1 || orderDetail.productCost
		}))
		.then(() => res.status(202))
		.catch(e => {
			res.status(304);
			next(e);
		})
})

module.exports = router