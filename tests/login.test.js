const { expect, test } = require('@jest/globals');
const { createClient } = require('../support/client');
const endpoints = require('../variables/endpoints');
const correct_login = require('../variables/tests/login/correct-login-variables');
const login_incorrect_password = require('../variables/tests/login/login-incorrect-password-variables');


describe('Autenticação - Login', () => {
    const login_message_without_password = 'Missing password';

    const client = createClient(true);
    const { method: method_login, path: path_login, send: send_login } = endpoints.login;


    test('Login com credenciais válidas devem retornar token', async () => {
        const send = send_login(correct_login.email, correct_login.password);
        const response = await client[method_login](path_login).send(send);
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.token).not.toBeNull();
        expect(response.body).toHaveProperty('token');
    });

    test('Login com credenciais inválidas não devem retornar token', async () => {
        const send = send_login(login_incorrect_password.email);
        const response = await client[method_login](path_login).send(send)
        expect(response.status).toBe(400);
        expect(response.body.token).not.toBeDefined();
        expect(response.body).not.toHaveProperty('token');
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toEqual(login_message_without_password);
    });

});