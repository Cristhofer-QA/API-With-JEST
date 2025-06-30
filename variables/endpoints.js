const { password } = require("./tests/login/correct-login-variables");

module.exports = {
    login: {
        method: 'post',
        path: '/login',
        send: (email_send = null, password_send = null) => ({
            email: email_send,
            password: password_send
        })
    },
    register: {
        method: 'post',
        path: '/register',
        send: (email_send, password_send) => ({
            "email": email_send,
            "password": password_send
        })
    },
    users: {
        method: 'get',
        path: (id) => `/users/${id}`
    },
};