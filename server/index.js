//May add conditions to { force: true } later to avoid delating the entire database in the deployed app
const app = require('./server.js');
const { db } = require('./db/index.js');
const seed = require('../seed.js');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const PORT = process.env.PORT || 3000;

db.sync({ force: true })
  .then(() => {
    console.log('db synced');
    return seed();
  })
  .then(() => {
    console.log('users, products and cart seeded');
    app.listen(PORT, () => {
      console.log(`App is listening at localhost:${PORT}`);
    });
  })
  .catch(error => console.log('error syncing db ', error));
