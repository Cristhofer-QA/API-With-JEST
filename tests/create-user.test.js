const { expect, test, describe, beforeAll } = require('@jest/globals');
const { createClient } = require('../support/client');
const { getToken } = require('../support/auth');
const endpoints = require('../variables/endpoints');
const correct_register = require('../variables/tests/register/correct-register-variables')

describe('Usuário - Registro de usuários', () => {
    const { method: method_register_user, path: path_register_user, send: sent_register_user } = endpoints.register;
    const { method: method_consult_users, path: path_consult_users } = endpoints.users;
    let client;
    let logged_user_token;

    beforeAll(async () => {
        // Aqui, para simular uma aplicação real, retornei o token do usuário logado, 
        // para simular um sistema que apenas um usuário logado possa cadatrar um usuário novo
        logged_user_token = await getToken();
        client = createClient(true, logged_user_token);
    });

    test('Cadastrar usuário corretamente deve retornar status 200, id e token', async () => {
        const email = correct_register.email;
        const pasword = correct_register.password;
        const fist_name = correct_register.fist_name;
        const last_name = correct_register.last_name;

        const send = sent_register_user(
            email,
            pasword
        );

        const response = await client[method_register_user](path_register_user).send(send);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).not.toBeNull;
        expect(response.body).toHaveProperty('token');
        expect(response.body.token).not.toBeNull();

        const user_id = response.body.id;

        const response_verify = await client[method_consult_users](path_consult_users(user_id));

        expect(response_verify.status).toBe(200);
        expect(typeof response_verify.body.data).toBe('object');
        expect(Array.isArray(response_verify.body.data)).toBe(false);
        expect(response_verify.body.data.id).toBe(user_id);
        expect(response_verify.body.data.email).toBe(email);
        expect(response_verify.body.data.first_name).toBe(fist_name);
        expect(response_verify.body.data.last_name).toBe(last_name);
    });
});