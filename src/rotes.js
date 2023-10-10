const express = require('express');
const categories = require('./controllers/products');
const {registerUser, login, detailUser, updateUser } = require('./controllers/user');
const checkLogin = require('./filters/checkLogin');
const rotes = express();

rotes.get('/categorias', categories);
rotes.post('/usuario', registerUser);
rotes.post('/login', login);

rotes.use(checkLogin);

rotes.get('/usuario', detailUser);
rotes.put('/usuario', updateUser);

module.exports = rotes;