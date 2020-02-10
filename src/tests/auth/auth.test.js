process.env.NODE_ENV = 'test';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const request = require('supertest');
const Users = require('../../models/users');
const { usersData, sellerCred } = require('./mockdata');
const app = require('../../app');
const { ROLES } = require('../../constants/users');

const { CUSTOMER } = ROLES;

beforeAll(async () => {
  await Users.insertMany(usersData);
});

afterAll(async () => {
  await Users.deleteMany();
});

describe('auth', () => {
  test('registration', async () => {
    const response = await request(app)
      .post('/auth/registration')
      .send(sellerCred);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toMatchObject({
      email: sellerCred.email,
      role: CUSTOMER,
      isActive: false,
    });
  });

  test('authorization', async () => {
    const response = await request(app)
      .post('/auth/authorization')
      .send(sellerCred);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    global.token = response.body.token;
  });

  test('user profile', async () => {
    const response = await request(app)
      .get('/profile')
      .set('Authorization', `bearer ${global.token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
  });

  test('user orders', async () => {
    const response = await request(app)
      .get('/profile/orders')
      .set('Authorization', `bearer ${global.token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('orders');
  });
});
