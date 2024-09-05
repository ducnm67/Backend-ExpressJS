const Customer = require('../models/customer');

const { uploadSingleFile } = require('../services/fileService');

const {
  createCustomerService,
  createArrayCustomerService,
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
  if (customer) {
    return res.status(200).json({
      errorCode: 0,
      data: customer,
    });
  } else {
    return res.status(400).json({
      errorCode: -1,
      data: customer,
    });
  }
};

module.exports = {
  postCreateCustomerAPI,
  postCreateArrayCustomerAPI,
};
