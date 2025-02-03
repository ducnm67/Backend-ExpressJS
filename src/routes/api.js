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
  deleteAProjectAPI,
} = require('../controllers/projectController');

const {
  getTaskAPI,
  postCreateTaskAPI,
  putUpdateTaskAPI,
  deleteATaskAPI,
} = require('../controllers/taskController');

const routerAPI = express.Router();

// Route chính của API
routerAPI.get('/', (req, res) => {
  res.send('hello world with API !!!');
});

// ------------------ USER ROUTES ------------------
routerAPI
  .route('/users')
  .get(getUsersAPI)
  .post(postCreateUserAPI)
  .put(putUpdateUserAPI)
  .delete(deleteUserAPI);

// ------------------ FILE ROUTES ------------------
routerAPI.post('/file', postSingleFileAPI);
routerAPI.post('/files', postMultipleFilesAPI);

// ------------------ CUSTOMER ROUTES ------------------
routerAPI
  .route('/customer')
  .post(postCreateCustomerAPI)
  .put(putUpdateCustomerAPI)
  .delete(deleteACustomerAPI);

routerAPI
  .route('/customers')
  .get(getCustomersAPI)
  .post(postCreateArrayCustomerAPI)
  .delete(deleteCustomersAPI);

// ------------------ PROJECT ROUTES ------------------
routerAPI
  .route('/project')
  .get(getProjectAPI)
  .post(postCreateProjectAPI)
  .put(putUpdateProjectAPI)
  .delete(deleteAProjectAPI);

// ------------------ TASK ROUTES ------------------
routerAPI
  .route('/task')
  .get(getTaskAPI)
  .post(postCreateTaskAPI)
  .put(putUpdateTaskAPI)
  .delete(deleteATaskAPI);

// ------------------ INFO ROUTE ------------------
routerAPI.get('/info', (req, res) => {
  console.log('>>> req.query: ', req.query);
  return res.status(200).json({
    errorCode: 0,
    data: req.query,
  });
});

module.exports = routerAPI;
