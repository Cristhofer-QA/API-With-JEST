const { expect, test, describe } = require('@jest/globals');
const { createClient } = require('../support/client');
const endpoints = require('../variables/endpoints');

describe('Autenticação - API Key', () => {
    const { method: method_login, path: path_login, send: send_login } = endpoints.login;
    const message_call_without_api_key = 'Missing API key.';

    test('Login com usuário padrão sem API Key não deve ser realizado', async () => {
        const client = createClient(false);
        const send = send_login(process.env.EMAIL_STANDARD_USER, process.env.PASSWORD_STANDARD_USER);
        const response = await client[method_login](path_login).send(send);
        expect(response.status).toBe(401);
        expect(response.body.token).not.toBeDefined();;
        expect(response.body).not.toHaveProperty('token')
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toEqual(message_call_without_api_key);
    });
});