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
  getCustomersAPI,
  putUpdateCustomerAPI,
  deleteACustomerAPI,
  deleteCustomersAPI,
} = require('../controllers/customerController');

const {
  postCreateProjectAPI,
  getProjectAPI,
  putUpdateProjectAPI,
  deleteAProjectAPI
} = require('../controllers/projectController')

const {
  getTaskAPI,
  postCreateTaskAPI,
  putUpdateTaskAPI,
  deleteATaskAPI,
} = require('../controllers/taskController')

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
routerAPI.put('/customer', putUpdateCustomerAPI);
routerAPI.delete('/customer', deleteACustomerAPI);

routerAPI.get('/customers', getCustomersAPI);
routerAPI.post('/customers', postCreateArrayCustomerAPI);
routerAPI.delete('/customers', deleteCustomersAPI);

routerAPI.get('/project', getProjectAPI);
routerAPI.post('/project', postCreateProjectAPI);
routerAPI.put('/project', putUpdateProjectAPI);
routerAPI.delete('/project', deleteAProjectAPI);

routerAPI.get('/task', getTaskAPI);
routerAPI.post('/task', postCreateTaskAPI);
routerAPI.put('/task', putUpdateTaskAPI);
routerAPI.delete('/task', deleteATaskAPI);

routerAPI.get('/info', (req, res) => {
  console.log('>>> req.query: ', req.query);
  return res.status(200).json({
    errorCode: 0,
    data: req.query,
  });
});

module.exports = routerAPI;
