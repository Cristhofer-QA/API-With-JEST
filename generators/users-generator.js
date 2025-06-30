const base = require('./base-generator')

function generate_full_user() {
    return {
        email: base.generate_email(),
        password: base.generate_password()
    };
}

module.exports = {
    generate_full_user
};