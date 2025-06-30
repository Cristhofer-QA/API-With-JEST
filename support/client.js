const supertest = require('supertest');
require('dotenv').config();

function createClient(withApiKey = true, token = null) {
  const client = supertest(process.env.API_BASE_URL);

  const applyHeaders = (req) => {
    if (withApiKey) {
      req = req.set('x-api-key', process.env.API_KEY);
    }
    if (token !== null) {
      req = req.set('Token', token);
    }
    return req;
  };

  return {
    get: (url) => applyHeaders(client.get(url)),
    post: (url) => applyHeaders(client.post(url)),
    delete: (url) => applyHeaders(client.delete(url)),
    // TODO: adicionar os demais métodos
  };
};

module.exports = { createClient };
