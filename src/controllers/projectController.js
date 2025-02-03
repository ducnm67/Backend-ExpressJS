const {
  createProjectService,
  getProjectService,
  updateProjectService,
  deleteAProjectService,
} = require('../services/projectService');

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

const postCreateProjectAPI = async (req, res, next) => {
  try {
    const project = await createProjectService(req.body);
    return sendResponse(res, project);
  } catch (error) {
    return next(error);
  }
};

const getProjectAPI = async (req, res, next) => {
  try {
    const project = await getProjectService(req.query);
    return sendResponse(res, project);
  } catch (error) {
    return next(error);
  }
};

const putUpdateProjectAPI = async (req, res, next) => {
  try {
    const project = await updateProjectService(req.body);
    return sendResponse(res, project);
  } catch (error) {
    return next(error);
  }
};

const deleteAProjectAPI = async (req, res, next) => {
  try {
    // Nếu cần, bạn có thể kiểm tra dữ liệu đầu vào ở đây
    const project = await deleteAProjectService(req.body);
    return sendResponse(res, project);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postCreateProjectAPI,
  getProjectAPI,
  putUpdateProjectAPI,
  deleteAProjectAPI,
};
