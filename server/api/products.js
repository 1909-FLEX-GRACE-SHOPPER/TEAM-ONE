const router = require("express").Router();
const path = require('path')

const { models } = require("../db/index");
const { Product } = models;

router.get('/', (req, res, next) => {
	Product.findAll()
	.then(products => res.status(200).send(products))
	.catch(e => {
		res.status(404);
		next(e);
	})
})

router.get('/:id', (req, res, next) => {
	Product.findByPk(req.params.id)
	.then(product => res.status(200).send(product))
	.catch(e => {
		res.status(404);
		next(e);
	})
})

//Creates a new product.
//Sets falsy field in req.body.productDescription to be null.
//Sets falsy field in req.body.inventory to 0.
router.post('/', (req, res, next) => {
	const {
		productName,
		productDescription,
		unitPrice,
		inventory,
	} = req.body

	console.log(req)

	const imageFile = req.files.productImage

	imageFile.mv(path.join('__dirname', '..', '/public', '/uploads', `/${ imageFile.name }`), err => {
		if(err) {
			return res.status(500).send(err);
		}

		Product.create({
			productName,
			productDescription,
			unitPrice: (unitPrice * 1).toFixed(2),
			inventory: inventory * 1 || 0,
			productImage: imageFile.name,
		})
	})
	.then(() => res.status(201))
	.catch(e => {
		res.status(400);
		next(e);
	})

})

//Deletes a product based on a primary key.
router.delete('/:id', (req, res, next) => {
	Product.findByPk(req.params.id)
	.then(product => product.destroy())
	.then(() => res.status(202))
	.catch(e => {
		res.status(404);
		next(e);
	})
})

//Updates a product based on a primary key.
//Falsy fields in req.body are set to the current values.
router.put('/:id', (req, res, next) => {
	const {
		productName,
		productDescription,
		unitPrice,
		inventory,
	} = req.body

	Product.findByPk(req.params.id)
	.then(product => product.update({
		productName: productName || product.productName,
		productDescription: productDescription || product.productDescription,
		unitPrice: (unitPrice * 1).toFixed(2) || product.unitPrice,
		inventory: inventory * 1 || product.inventory,
	}))
	.then(product => res.status(202).send(product))
	.catch(e => {
		res.status(304);
		next(e);
	})
})

module.exports = router