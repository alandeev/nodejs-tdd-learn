const request = require('supertest');
const truncate = require('../utils/truncate');

const app = require('../../src/app');
const { User } = require('../../src/app/models')

describe('Authenticate Router', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should returns 200 when authenticate with valid credentials', async () => {
    const data = {
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123123'
    }

    await User.create(data)

    const response = await request(app)
      .post('/sessions')
      .send({
        email: data.email,
        password: data.password
      });

    expect(response.status).toBe(200);
  });

  it('should returns 401 when authenticate with invalid credentials', async () => {
    const data = {
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123123'
    }

    await User.create(data)

    const response = await request(app)
      .post('/sessions')
      .send({
        email: data.email,
        password: '999999' // invalid_password
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const data = {
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123123'
    }

    await User.create(data)

    const response = await request(app)
    .post('/sessions')
    .send({
      email: data.email,
      password: data.password
    });

    expect(response.body).toHaveProperty('token');
  });
})
