const router = require('express').Router();
const { models } = require('../db/index.js');
const { User, Session } = models;
require('dotenv').config();
const axios = require('axios');

router.get('/login', (req, res, next) => {
	res.redirect(
		`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
	);
});

router.get('/callback', (req, res, next) => {
	const { code } = req.query;
	axios
		.post(
			`https://github.com/login/oauth/access_token?code=${code}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}   `,
			{},
			{
				headers: {
					Accept: 'application/json'
				}
			}
		)
		.then(res => {
			return User.create({
				github_access_token: res.data.access_token,
				sessionId: req.cookies.session_id,
				userType: 'Existing customer'
			});
		})
		.then(() => {
			User.destroy({
				where: {
					sessionId: req.cookies.session_id,
					userType: 'Guest'
				}
			});
		})
		.then(() => {
			res.redirect('/home');
		})
		.catch(e => {
			console.log('Error authentication with Github');
			console.error(e);
			res.redirect('/error');
		});
});

module.exports = router;
