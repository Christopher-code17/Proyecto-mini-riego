const { server } = require('../../server');

afterAll((done) => {
  server.close(done);
});
