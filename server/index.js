//May add conditions to { force: true } later to avoid delating the entire database in the deployed app
const app = require('./server.js');
const { db } = require('./db/index.js');
const { seedUsers, seedProducts } = require('../seed.js');
const cookieParser = require('cookie-parser');
const { Session } = models;

app.use(cookieParser())

const PORT = process.env.PORT || 3000;

db.sync({ force: true })
	.then(() => {
		console.log('db synced');
		return seedUsers();
	})
	.then(() => {
		console.log('users seeded');
		return seedProducts();
	})
	.then(() => {
		console.log('products seeded');
		app.listen(PORT, () => {
			console.log(`App is listening at localhost:${PORT}`);
		});
	})
	.catch(error => console.log('error syncing db ', error));

