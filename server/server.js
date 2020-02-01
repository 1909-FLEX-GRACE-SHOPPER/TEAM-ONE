const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');

app.use(express.json());

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(express.static(path.join('__dirname', '..', '/public')));

app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests , "*" -will send our react application

//Error-handling endware
app.use('/', (err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ message: err.message } || 'Internal server error');
});

module.exports = app;
