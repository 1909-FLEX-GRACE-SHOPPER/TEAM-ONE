const router = require('express').Router();
const { models } = require('../db/index.js');
const { Cart, Product, User } = models;

router.get('/:userId', (req, res, next) => {
    Cart.findAll({
        where: {
            userId: req.params.userId
        }
    })
        .then(productsInCart => res.status(200).send(productsInCart))
        .catch(e => res.status(400).next(e))
});

router.post('/add/:userId', (req, res, next) => {
    Cart.create(req.body)
        .then(product => res.status(201).send(product))
        .catch(e => res.status(400).next(e))
})

router.put('/:userId', (req, res, next) => {
    Cart.update({
        productQuantity: req.body.productQuantity,
    }, {
        where: { id: req.params.productId },
        returning: true
    })
        .then(() => res.status(202))
        .catch(e => res.status(304).next(e))
})

router.delete('/remote:userId', (req, res, next) => {
    Cart.findByPk(req.params.productId)
        .then(product => product.destroy())
        .then(() => res.status(200).send('Product deleted'))
        .catch(e => res.status(400).next(e))
})