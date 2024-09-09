const Customer = require('../models/customer');

const { uploadSingleFile } = require('../services/fileService');

const {
  createCustomerService,
  createArrayCustomerService,
  getCustomersService,
  putUpdateCustomerService,
  deleteACustomerService,
  deleteCustomersService,
} = require('../services/customerService');

const postCreateCustomerAPI = async (req, res) => {
  let { name, address, phone, email, description } = req.body;

  let imageUrl = '';

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  } else {
    let result = await uploadSingleFile(req.files.image);
    imageUrl = result.path;
  }

  let customerData = {
    name,
    address,
    phone,
    email,
    description,
    image: imageUrl,
  };

  let customer = await createCustomerService(customerData);

  return res.status(200).json({
    errorCode: 0,
    data: customer,
  });
};

const postCreateArrayCustomerAPI = async (req, res) => {
  let customer = await createArrayCustomerService(req.body.customer);
  return res.status(200).json({
    errorCode: 0,
    data: customer,
  });
};

const getCustomersAPI = async (req, res) => {
  let result = null;
  let limit = req.query.limit
  let page = req.query.page

  if (limit && page) {
    result = await getCustomersService(limit, page, req.query);
  } else {
    result = await getCustomersService();
  }

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const putUpdateCustomerAPI = async (req, res) => {
  let { id, name, address, phone, email, description } = req.body;
  let result = await putUpdateCustomerService(
    id,
    name,
    address,
    phone,
    email,
    description
  );
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const deleteACustomerAPI = async (req, res) => {
  let id = req.body.id;
  let result = await deleteACustomerService(id);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const deleteCustomersAPI = async (req, res) => {
  let result = await deleteCustomersService(req.body.id);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

module.exports = {
  postCreateCustomerAPI,
  postCreateArrayCustomerAPI,
  getCustomersAPI,
  putUpdateCustomerAPI,
  deleteACustomerAPI,
  deleteCustomersAPI,
};
