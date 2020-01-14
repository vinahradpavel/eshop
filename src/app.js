const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const tokenHandler = require('./middlewares/tokenHandler');
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(express.static(`${__dirname}/routes/swagger`));
app.use('/', swaggerRoutes);

app.use('/auth', authRoutes.public);
app.use('/products', productsRoutes.public);
app.use('/brands', brandsRoutes.public);
app.use('/subCategories', subCategoriesRoutes.public);
app.use('/categories', categoriesRoutes.public);
app.use(tokenHandler);
app.use('/profile', profileRoutes.private);
app.use('/users', usersRoutes.private);
app.use('/customers', customersRoutes.private);
app.use('/products', productsRoutes.private);
app.use('/subCategories', subCategoriesRoutes.private);
app.use('/categories', categoriesRoutes.private);
app.use('/brands', brandsRoutes.private);
app.use('/profile/orders', ordersRoutes.private);
app.use(logError);

app.listen(3000);
