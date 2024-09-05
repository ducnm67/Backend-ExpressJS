const express = require('express');

const {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postSingleFileAPI,
  postMultipleFilesAPI,
} = require('../controllers/apiController');

const {
  postCreateCustomerAPI,
  postCreateArrayCustomerAPI,
} = require('../controllers/customerController');

const routerAPI = express.Router();

routerAPI.get('/', (req, res) => {
  res.send('hello world with API !!!');
});

routerAPI.get('/users', getUsersAPI);
routerAPI.post('/users', postCreateUserAPI);
routerAPI.put('/users', putUpdateUserAPI);
routerAPI.delete('/users', deleteUserAPI);

routerAPI.post('/file', postSingleFileAPI);
routerAPI.post('/files', postMultipleFilesAPI);

routerAPI.post('/customer', postCreateCustomerAPI);
routerAPI.post('/customers', postCreateArrayCustomerAPI);

module.exports = routerAPI;
