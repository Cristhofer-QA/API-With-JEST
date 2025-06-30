const { createClient } = require('./client');
const endpoints = require('../variables/endpoints');

async function getToken() {
    const client = createClient(true);

    const { method, path } = endpoints.login;
    const send = {
        email: process.env.EMAIL_STANDARD_USER,
        password: process.env.PASSWORD_STANDARD_USER
    };

    const response = await client[method](path)
        .send(send);

    if (response.status !== 200) {
        throw new Error(`Erro no login (getToken, arquivo auth.js). Status: ${response.status}`);
    };

    return response.body.token;
};

module.exports = { getToken };