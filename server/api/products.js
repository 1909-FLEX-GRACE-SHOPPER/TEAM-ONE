<<<<<<< HEAD
const router = require("express").Router();
const path = require('path')
=======
const router = require('express').Router();
>>>>>>> fc1c67154afb7f9e8802eb7da88c1444082d7d66

const { models } = require('../db/index');
const { Product } = models;

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.status(200).send(products))
    .catch(e => {
      res.status(404);
      next(e);
    });
});

router.get('/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(product => {
      res.status(200).send(product);
    })
    .catch(e => {
      res.status(404);
      next(e);
    });
});

//Creates a new product.
//Sets falsy field in req.body.productDescription to be null.
//Sets falsy field in req.body.inventory to 0.
router.post('/', (req, res, next) => {
  const { productName, productDescription, unitPrice, inventory } = req.body;

<<<<<<< HEAD
	const imageFile = req.files.productImage
	console.log(path.join('__dirname', '..', '/public', '/uploads', `/${ imageFile.name.split(' ').join('-') }`))

	imageFile.mv(path.join('__dirname', '..', '/public', '/uploads', `/${ imageFile.name.split(' ').join('-') }`))
		.then(() => {
			Product.create({
				productName,
				productDescription,
				unitPrice: (unitPrice * 1).toFixed(2),
				inventory: inventory * 1 || 0,
				productImage: `/uploads/${ imageFile.name.split(' ').join('-') }`,
			})
		})
		.then(() => res.status(201))
		.catch(e => {
			res.status(400);
			next(e);
		})
})
=======
  Product.create({
    productName,
    productDescription,
    unitPrice: (unitPrice * 1).toFixed(2),
    inventory: inventory * 1 || 0
  })
    .then(() => res.status(201))
    .catch(e => {
      res.status(400);
      next(e);
    });
});
>>>>>>> fc1c67154afb7f9e8802eb7da88c1444082d7d66

//Deletes a product based on a primary key.
router.delete('/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(product => product.destroy())
    .then(() => res.status(202))
    .catch(e => {
      res.status(404);
      next(e);
    });
});

//Updates a product based on a primary key.
//Falsy fields in req.body are set to the current values.
router.put('/:id', (req, res, next) => {
  const { productName, productDescription, unitPrice, inventory } = req.body;

  Product.findByPk(req.params.id)
    .then(product =>
      product.update({
        productName: productName || product.productName,
        productDescription: productDescription || product.productDescription,
        unitPrice: (unitPrice * 1).toFixed(2) || product.unitPrice,
        inventory: inventory * 1 || product.inventory
      })
    )
    .then(product => res.status(202).send(product))
    .catch(e => {
      res.status(304);
      next(e);
    });
});

module.exports = router;
