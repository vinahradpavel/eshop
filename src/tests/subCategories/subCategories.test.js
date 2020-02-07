process.env.NODE_ENV = 'test';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const request = require('supertest');
const SubCategories = require('../../models/subCategories');
const { subCategoriesData } = require('./mockdata');
const app = require('../../app');

beforeAll(async () => {
  await SubCategories.insertMany(subCategoriesData);
});

afterAll(async () => {
  await SubCategories.deleteMany();
});

describe('GET subCategories', () => {
  test('get all subCategories', async () => {
    const response = await request(app).get('/subcategories');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('subCategories');
  });

  test('get subCategories by name', async () => {
    const response = await request(app).get(`/subcategories?name=${encodeURIComponent('Б')}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('subCategories');
    expect(response.body.subCategories).toHaveLength(2);
    expect(response.body.subCategories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Бег',
        }),
        expect.objectContaining({
          name: 'Баскетбол',
        }),
      ]),
    );
  });
});
