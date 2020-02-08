const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const Session = require('./db/models/sessions');
const User = require('./db/models/users');

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  //The user doesn't have a session cookie so we create a session
  if (!req.cookies['session_id']) {
    Session.create()
      .then(session =>
        User.create({
          userType: 'Guest',
          sessionId: session.id
        })
      )
      // because this is a new session we create a guest user and give them the new session id
      .then(guest => {
        res.cookie('session_id', guest.dataValues.sessionId, {
          path: '/',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
        });
        req.user = guest;
        next();
      })
      .catch(e => {
        console.error(e);
        res.status(404).redirect('/error');
      });
  } else {
    // the user has an active session id (their cookie)
    // find the user by session id and add it to req
    User.findOne({
      where: {
        sessionId: req.cookies['session_id']
      }
    })
      .then(user => {
        if (!user) {
          Session.create()
            .then(session =>
              User.create({
                userType: 'Guest',
                sessionId: session.id
              })
            )
            .then(guest => {
              console.log('CREATED A GUEST USER');
              res.cookie('session_id', guest.dataValues.sessionId, {
                path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
              });
              req.user = guest;
              next();
            })
            .catch(e => {
              console.error(e);
              res.status(404).redirect('/error');
            });
        } else {
          req.user = user;
          next();
        }
      })
      .catch(e => {
        console.error(e);
        res.status(404).redirect('/error');
      });
  }
});

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
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
