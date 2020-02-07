process.env.NODE_ENV = 'test';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const request = require('supertest');
const Categories = require('../../models/categories');
const { categoriesData } = require('./mockdata');
const app = require('../../app');

beforeAll(async () => {
  await Categories.insertMany(categoriesData);
});

afterAll(async () => {
  await Categories.deleteMany();
});

describe('GET categories', () => {
  test('get all categories', async () => {
    const response = await request(app).get('/categories');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('categories');
  });

  test('get categories by name', async () => {
    const response = await request(app).get(`/categories?name=${encodeURIComponent('Обувь')}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('categories');
    expect(response.body.categories).toHaveLength(1);
    expect(response.body.categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Обувь',
        }),
      ]),
    );
  });
});
