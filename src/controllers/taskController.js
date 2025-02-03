const {
  createTaskService,
  getTaskService,
  updateTaskService,
  deleteTaskService,
} = require('../services/taskService');

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

module.exports = {
  getTaskAPI: async (req, res, next) => {
    try {
      const task = await getTaskService(req.query);
      return sendResponse(res, task);
    } catch (error) {
      return next(error);
    }
  },

  postCreateTaskAPI: async (req, res, next) => {
    try {
      const task = await createTaskService(req.body);
      return sendResponse(res, task);
    } catch (error) {
      return next(error);
    }
  },

  putUpdateTaskAPI: async (req, res, next) => {
    try {
      const task = await updateTaskService(req.body);
      return sendResponse(res, task);
    } catch (error) {
      return next(error);
    }
  },

  deleteATaskAPI: async (req, res, next) => {
    try {
      const task = await deleteTaskService(req.body);
      return sendResponse(res, task);
    } catch (error) {
      return next(error);
    }
  },
};
