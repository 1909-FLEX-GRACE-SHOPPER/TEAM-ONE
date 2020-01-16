const router = require("express").Router();

// const { Product } = require("../db/index.js");


router.get('/', (req, res, next) => {
	Product.findAndCountAll()
	.then(products => res.send(products))
	.catch(e => {
		res.status(404)
		next(e);
	})
})

router.get('/:id', (req, res, next) => {
	Product.findByPk(req.params.id)
	.then(product => res.send(product))
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

	Product.create({
		productName,
		productDescription: productDescription || null,
		unitPrice,
		inventory: inventory || 0,
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
		unitPrice: unitPrice || product.unitPrice,
		inventory: inventory || product.inventory,
	}))
})

module.exports = router