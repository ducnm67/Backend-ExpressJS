const express = require('express');
const { getHomepage, getSample } = require('../controllers/homeController');
const routes = express.Router();

routes.get('/', getHomepage);

routes.get('/sample', getSample);

module.exports = routes;
