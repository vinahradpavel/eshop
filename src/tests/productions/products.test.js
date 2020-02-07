process.env.NODE_ENV = 'test';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const request = require('supertest');
const Products = require('../../models/products');
const { productsData } = require('./mockdata');
const app = require('../../app');

beforeAll(async () => {
  await Products.insertMany(productsData);
});

afterAll(async () => {
  await Products.deleteMany();
});

describe('GET products', () => {
  test('get all products', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('products');
  });

  test('get products by name', async () => {
    const response = await request(app).get(`/products?name=${encodeURIComponent('Nike')}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('products');
    expect(response.body.products).toHaveLength(3);
    expect(response.body.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Nike REACT ELEMENT 55 BQ6166-010',
        }),
        expect.objectContaining({
          name: 'Nike AIR MAX 90 ESSENTIAL 537384-072',
        }),
        expect.objectContaining({
          name: 'Nike Daybreak CU3016-800',
        }),
      ]),
    );
  });
});
