const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use('/auth', authRoutes.public);

app.use((req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ');
    const { user } = jwt.verify(token, process.env.JWTSECRET);

    if (!user) {
      return res.status(401).json({
        error: 'Invalid token.',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token.',
    });
  }
});

app.use('/profile', authRoutes.private);


app.listen(3000);
