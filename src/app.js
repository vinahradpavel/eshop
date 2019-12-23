const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const tokenHandler = require('./middlewares/tokenHandler');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const usersRoutes = require('./routes/users');
const customersRoutes = require('./routes/customers');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use('/auth', authRoutes.public);
app.use(tokenHandler);
app.use('/profile', profileRoutes.private);
app.use('/users', usersRoutes.private);
app.use('/customers', customersRoutes.private);

app.listen(3000);
