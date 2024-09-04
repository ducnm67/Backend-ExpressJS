const express = require('express');
const {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
} = require('../controllers/apiController');

const routerAPI = express.Router();

routerAPI.get('/', (req, res) => {
  res.send('hello world with API !!!');
});

routerAPI.get('/users', getUsersAPI);

routerAPI.post('/users', postCreateUserAPI);

routerAPI.put('/users', putUpdateUserAPI);

routerAPI.delete('/users', deleteUserAPI);

module.exports = routerAPI;
