const user_generator = require('../../../generators/users-generator');

// Fiz assim para simular o uso com o Faker, porém essa API só aceita credenciais fornecidas por ela
// const user = user_generator.generate_full_user();

const user = {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
    fist_name: 'Eve',
    last_name: 'Holt'
};

module.exports = user;