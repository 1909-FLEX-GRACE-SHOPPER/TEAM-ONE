const express = require('express');
const app = express();
const path = require('path');
const { db, models } = require('./db/index.js');
const { seedUsers, seedProducts } = require('../seed.js');

app.use(express.json());

app.use(express.static(path.join('__dirname', '..', '/public')));

const PORT = process.env.PORT || 3000;

app.use('/api', require('./api'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//Error-handling endware
app.use('/', (err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ message: err.message } || 'Internal server error');
});

//May add conditions to { force: true } later to avoid delating the entire database in the deployed app
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

module.exports = app;
