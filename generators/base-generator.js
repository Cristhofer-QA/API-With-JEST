const { faker } = require('@faker-js/faker');

// Person
function generate_full_name() {
    return faker.person.fullName();
}

function generate_fist_name() {
    return faker.person.firstName();
}

function generate_last_name() {
    return faker.person.lastName();
}


// Internet
function generate_email() {
    return faker.internet.email();
}

function generate_password(lenght = 10) {
    // TODO: Implementar função para usuário selecionar se vai ter maiúscula, minúscula, caracteres especiais, etc
    return faker.internet.password(lenght)
}


module.exports = { 
    generate_full_name, 
    generate_fist_name, 
    generate_last_name, 
    generate_email, 
    generate_password 
};