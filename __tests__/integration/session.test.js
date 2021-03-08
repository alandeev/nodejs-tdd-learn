const request = require('supertest');
const truncate = require('../utils/truncate');

const app = require('../../src/app');
const factory = require('../factories');

describe('Authenticate Router', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should returns 200 when authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })  

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      });

    expect(response.status).toBe(200);
  });

  it('should returns 401 when authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })  

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '999999' // invalid_password
      });

    expect(response.status).toBe(401);
  });

  it('should returns 400 if not send email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        password: 'valid_password'
      });

    expect(response.status).toBe(400);
  });

  it('should returns 400 if not send password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'valid_email@gmail.com'
      });

    expect(response.status).toBe(400);
  });

  it('should returns 401 if user not found', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'invalid_email@gmail.com',
        password: 'invalid_password'
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })  

    const response = await request(app)
    .post('/sessions')
    .send({
      email: user.email,
      password: '123123'
    });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to access private routes when is authenticate', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })  

    const response = await request(app)
    .get('/oauth')
    .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes when not is authenticate', async () => {
    const response = await request(app).get('/oauth');
  
    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes when token is invalid', async () => {
    const response = await request(app)
    .get('/oauth')
    .set('Authorization', `Bearer invalid_token`);

    expect(response.status).toBe(401);
  });
})
