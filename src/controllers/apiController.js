const User = require('../models/user');
const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require('../services/fileService');

/**
 * Helper gửi phản hồi thành công
 * @param {Response} res
 * @param {any} data
 * @param {number} status
 */
const sendResponse = (res, data, status = 200) => {
  return res.status(status).json({
    errorCode: 0,
    data,
  });
};

/**
 * Helper gửi phản hồi lỗi
 * @param {Response} res
 * @param {Error|string} error
 * @param {number} status
 */
const sendError = (res, error, status = 500) => {
  return res.status(status).json({
    errorCode: 1,
    message: error.message || error,
  });
};

const getUsersAPI = async (req, res) => {
  try {
    const result = await User.find({});
    return sendResponse(res, result);
  } catch (error) {
    return sendError(res, error);
  }
};

const postCreateUserAPI = async (req, res) => {
  try {
    const { email, name, city } = req.body;
    if (!email || !name || !city) {
      return res.status(400).json({
        errorCode: 1,
        message: 'Missing required fields: email, name, or city.',
      });
    }
    const user = await User.create({ email, name, city });
    return sendResponse(res, user);
  } catch (error) {
    return sendError(res, error);
  }
};

const putUpdateUserAPI = async (req, res) => {
  try {
    const { id, email, name, city } = req.body;
    if (!id) {
      return res.status(400).json({
        errorCode: 1,
        message: 'User id is required.',
      });
    }
    // Sử dụng findByIdAndUpdate để cập nhật và trả về document mới nếu có
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, name, city },
      { new: true } // trả về document đã cập nhật
    );
    if (!updatedUser) {
      return res.status(404).json({
        errorCode: 1,
        message: 'User not found.',
      });
    }
    return sendResponse(res, updatedUser);
  } catch (error) {
    return sendError(res, error);
  }
};

const deleteUserAPI = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        errorCode: 1,
        message: 'User id is required.',
      });
    }
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        errorCode: 1,
        message: 'User not found.',
      });
    }
    return sendResponse(res, deleted);
  } catch (error) {
    return sendError(res, error);
  }
};

const postSingleFileAPI = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).send('No files were uploaded.');
    }
    const result = await uploadSingleFile(req.files.image);
    return sendResponse(res, result);
  } catch (error) {
    return sendError(res, error);
  }
};

const postMultipleFilesAPI = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).send('No files were uploaded.');
    }
    // Nếu không phải mảng, chuyển sang sử dụng hàm upload file đơn
    if (!Array.isArray(req.files.image)) {
      return await postSingleFileAPI(req, res);
    }
    const result = await uploadMultipleFiles(req.files.image);
    return sendResponse(res, result);
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postSingleFileAPI,
  postMultipleFilesAPI,
};
