const Task = require('../models/task');

module.exports = {
  createTaskService: async (data) => {
    try {
      return await Task.create({
        name: data.name,
        description: data.description,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate,
      });
    } catch (error) {
      console.error('Error in createTaskService:', error);
      return null;
    }
  },

  getTaskService: async (data) => {
    try {
      const page = parseInt(data.page) || 1;
      const limit = parseInt(data.limit) || 10;
      const skip = (page - 1) * limit;

      return await Task.find().skip(skip).limit(limit).exec();
    } catch (error) {
      console.error('Error in getTaskService:', error);
      return null;
    }
  },

  updateTaskService: async (data) => {
    try {
      return await Task.findByIdAndUpdate(
        data.id,
        { $set: data },
        { new: true }
      );
    } catch (error) {
      console.error('Error in updateTaskService:', error);
      return null;
    }
  },

  deleteTaskService: async (data) => {
    try {
      return await Task.findByIdAndDelete(data.id);
    } catch (error) {
      console.error('Error in deleteTaskService:', error);
      return null;
    }
  },
};
