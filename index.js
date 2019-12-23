require('dotenv').config({ path: process.env === 'production' ? '.env' : `.env.${process.env.NODE_ENV}` });
require('./src/app');
