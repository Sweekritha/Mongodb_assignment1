const request = require('supertest');
const app = require('./app');
const url=require('./secret.js');
const MongoClient = require('mongodb/lib/mongo_client');

beforeAll(async () => {
   const connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('people');
    
    
  });
  
  

app.route('/users')
describe('GET /users', () => {
  test('get users', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('POST /users', () => {
  test('inserting new user', async () => {
    const newUser = { name: 'April' };
    const response = await request(app)
      .post('/users')
      .send(newUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(newUser.name);
  });
});

describe('PUT /users', () => {
  test('updating existing user', async () => {
    const updatedUser = { _id: '646db94745c3e911617af893', name: 'sweekritha_j' };
    const response = await request(app)
      .put('/users')
      .send(updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
  });
});


afterAll(async () => {
    const connection = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
     await connection.close();
  });