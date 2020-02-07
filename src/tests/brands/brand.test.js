process.env.NODE_ENV = 'test';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const request = require('supertest');
const Brands = require('../../models/brands');
const { brandsData } = require('./mockdata');
const app = require('../../app');

beforeAll(async () => {
  await Brands.insertMany(brandsData);
});

afterAll(async () => {
  await Brands.deleteMany();
});

describe('GET brands', () => {
  test('get all brands', async () => {
    const response = await request(app).get('/brands');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('brands');
  });

  test('get brand by name', async () => {
    const response = await request(app).get('/brands?name=A');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('brands');
    expect(response.body.brands).toHaveLength(2);
    expect(response.body.brands).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Adidas',
        }),
        expect.objectContaining({
          name: 'Asics',
        }),
      ]),
    );
  });
});
