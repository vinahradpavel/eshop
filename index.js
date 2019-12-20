// process.env.NODE_ENV === 'production' ?
const path = process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development';
require('dotenv').config({ path });

console.log(process.env);
require('./src/app');
