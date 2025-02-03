const Customer = require('../models/customer');
const Joi = require('joi');
const { uploadSingleFile } = require('../services/fileService');

const {
  createCustomerService,
  createArrayCustomerService,
  getCustomersService,
  putUpdateCustomerService,
  deleteACustomerService,
  deleteCustomersService,
} = require('../services/customerService');

/**
 * Helper gửi phản hồi thành công
 * @param {object} res Express response object
 * @param {any} data Dữ liệu trả về
 * @param {number} status Mã trạng thái HTTP (mặc định: 200)
 */
const sendResponse = (res, data, status = 200) => {
  return res.status(status).json({
    errorCode: 0,
    data,
  });
};

/**
 * Helper gửi phản hồi lỗi
 * @param {object} res Express response object
 * @param {Error|string} error Thông tin lỗi
 * @param {number} status Mã trạng thái HTTP (mặc định: 500)
 */
const sendError = (res, error, status = 500) => {
  return res.status(status).json({
    errorCode: 1,
    message: error.message || error,
  });
};

const postCreateCustomerAPI = async (req, res) => {
  try {
    const { name, address, phone, email, description } = req.body;
    // Định nghĩa schema validate với Joi
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      address: Joi.string().required(),
      phone: Joi.string().pattern(new RegExp('^[0-9]{8,11}$')).required(),
      email: Joi.string().email().required(),
      description: Joi.string().allow('', null),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        errorCode: 1,
        message: 'Validation error',
        details: error.details, // chi tiết lỗi validate
      });
    }

    // Kiểm tra sự tồn tại của file upload
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        errorCode: 1,
        message: 'No files were uploaded.',
      });
    }

    // Upload file
    const fileResult = await uploadSingleFile(req.files.image);
    const imageUrl = fileResult.path;

    // Tạo dữ liệu khách hàng
    const customerData = {
      name,
      address,
      phone,
      email,
      description,
      image: imageUrl,
    };

    const customer = await createCustomerService(customerData);
    return sendResponse(res, customer);
  } catch (error) {
    return sendError(res, error);
  }
};

const postCreateArrayCustomerAPI = async (req, res) => {
  try {
    const customers = req.body.customer;
    const result = await createArrayCustomerService(customers);
    return sendResponse(res, result);
  } catch (error) {
    return sendError(res, error);
  }
};

const getCustomersAPI = async (req, res) => {
  try {
    let result = null;
    const { limit, page, ...filters } = req.query;
    // Nếu có phân trang, truyền tham số phân trang và bộ lọc
    if (limit && page) {
      result = await getCustomersService(limit, page, filters);
    } else {
      result = await getCustomersService();
    }
    return sendResponse(res, result);
  } catch (error) {
    return sendError(res, error);
  }
};

const putUpdateCustomerAPI = async (req, res) => {
  try {
    const { id, name, address, phone, email, description } = req.body;
    if (!id) {
      return res.status(400).json({
        errorCode: 1,
        message: 'Customer id is required.',
      });
    }
    const result = await putUpdateCustomerService(
      id,
      name,
      address,
      phone,
      email,
      description
    );
    return sendResponse(res, result);
  } catch (error) {
    return sendError(res, error);
  }
};

const deleteACustomerAPI = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        errorCode: 1,
        message: 'Customer id is required.',
      });
    }
    const result = await deleteACustomerService(id);
    return sendResponse(res, result);
  } catch (error) {
    return sendError(res, error);
  }
};

const deleteCustomersAPI = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        errorCode: 1,
        message: 'Customer id(s) is required.',
      });
    }
    const result = await deleteCustomersService(id);
    return sendResponse(res, result);
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = {
  postCreateCustomerAPI,
  postCreateArrayCustomerAPI,
  getCustomersAPI,
  putUpdateCustomerAPI,
  deleteACustomerAPI,
  deleteCustomersAPI,
};
