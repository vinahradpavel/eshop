const mongoose = require('mongoose');
const express = require('express');
// const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const tokenHandler = require('./middlewares/tokenHandler');
const basketRoutes = require('./routes/basket');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const usersRoutes = require('./routes/users');
const customersRoutes = require('./routes/customers');
const swaggerRoutes = require('./routes/swagger');
const productsRoutes = require('./routes/products');
const subCategoriesRoutes = require('./routes/subCategories');
const categoriesRoutes = require('./routes/categories');
const brandsRoutes = require('./routes/brands');
const ordersRoutes = require('./routes/orders');

const logError = require('./middlewares/errors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
// mongoose.set('debug', true);

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new MongoStore(
    { mongooseConnection: mongoose.connection },
  ),
  cookie: { maxAge: 60 * 1000 },
  resave: true,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
  res.status(200).json({
    session: req.session.id,
  });
});

app.use(express.static(`${__dirname}/routes/swagger`));
app.use('/swagger', swaggerRoutes);

app.use('/auth', authRoutes.public);
app.use('/products', productsRoutes.public);
app.use('/brands', brandsRoutes.public);
app.use('/subCategories', subCategoriesRoutes.public);
app.use('/categories', categoriesRoutes.public);
app.use('/orders', ordersRoutes.public);
app.use('/basket', basketRoutes.public);
app.use(tokenHandler);
app.use('/profile', profileRoutes.private);
app.use('/users', usersRoutes.private);
app.use('/customers', customersRoutes.private);
app.use('/products', productsRoutes.private);
app.use('/subCategories', subCategoriesRoutes.private);
app.use('/categories', categoriesRoutes.private);
app.use('/brands', brandsRoutes.private);
app.use('/orders', ordersRoutes.private);

app.use(logError);

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3000);
}

module.exports = app;
