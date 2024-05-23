const request = require('supertest');
const app = require('../../server');

let server;

beforeAll((done) => {
  server = app.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Product API', () => {
  it('should create a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        price: 100,
        description: 'Test Description'
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Product');
  });

  it('should retrieve all products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should update a product', async () => {
    const response = await request(app)
      .put('/api/products/1')
      .send({
        name: 'Updated Product',
        price: 200,
        description: 'Updated Description'
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Product');
  });

  it('should delete a product', async () => {
    const response = await request(app).delete('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product deleted');
  });
});


