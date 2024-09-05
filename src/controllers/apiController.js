const User = require('../models/user');
const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require('../services/fileService');

const getUsersAPI = async (req, res) => {
  let result = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const postCreateUserAPI = async (req, res) => {
  let { email, name, city } = req.body;
  let user = await User.create({
    email,
    name,
    city,
  });
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let { id, email, name, city } = req.body;
  let user = await User.updateOne(
    { _id: id },
    {
      email,
      name,
      city,
    }
  );
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const deleteUserAPI = async (req, res) => {
  let id = req.body.id;
  let result = await User.deleteOne({ _id: id });
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const postSingleFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let result = await uploadSingleFile(req.files.image);

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const postMultipleFilesAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  if (!Array.isArray(req.files.image)) {
    return await postSingleFileAPI(req, res);
  }

  let result = await uploadMultipleFiles(req.files.image);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postSingleFileAPI,
  postMultipleFilesAPI,
};
