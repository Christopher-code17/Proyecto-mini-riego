const request = require('supertest');
const app = require('../../server');

let server;

beforeAll((done) => {
  server = app.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Irrigation API', () => {
  it('should turn the pump on', async () => {
    const response = await request(app).post('/api/irrigation/pump/on');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Pump turned on');
  });

  it('should turn the pump off', async () => {
    const response = await request(app).post('/api/irrigation/pump/off');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Pump turned off');
  });
});
