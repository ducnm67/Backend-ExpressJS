const Project = require('../models/project');
const aqp = require('api-query-params');

const createProjectService = async (data) => {
  let result = null;

  switch (data.type) {
    case 'EMPTY-PROJECT':
      result = await Project.create(data);
      break;

    case 'ADD-USERS':
      result = await Project.findByIdAndUpdate(
        data.projectId,
        { $addToSet: { usersInfor: { $each: data.usersArr } } },
        { new: true }
      );
      break;

    case 'REMOVE-USERS':
      result = await Project.findByIdAndUpdate(
        data.projectId,
        { $pull: { usersInfor: { $in: data.usersArr } } },
        { new: true }
      );
      break;

    case 'ADD-TASKS':
      result = await Project.findByIdAndUpdate(
        data.projectId,
        { $addToSet: { tasks: { $each: data.taskArr } } },
        { new: true }
      );
      break;

    default:
      console.warn('Invalid project type:', data.type);
  }

  return result;
};

const getProjectService = async (queryString) => {
  try {
    const { filter, limit = 10, population } = aqp(queryString);
    const page = parseInt(queryString.page) || 1;
    const skip = (page - 1) * limit;

    delete filter.page;

    const result = await Project.find(filter)
      .populate(population || [])
      .skip(skip)
      .limit(limit)
      .exec();

    return result;
  } catch (error) {
    console.error('Error in getProjectService:', error);
    return null;
  }
};

const updateProjectService = async (data) => {
  try {
    return await Project.findByIdAndUpdate(
      data.id,
      { $set: data },
      { new: true }
    );
  } catch (error) {
    console.error('Error in updateProjectService:', error);
    return null;
  }
};

const deleteAProjectService = async (data) => {
  try {
    return await Project.findByIdAndDelete(data.id);
  } catch (error) {
    console.error('Error in deleteAProjectService:', error);
    return null;
  }
};

module.exports = {
  createProjectService,
  getProjectService,
  updateProjectService,
  deleteAProjectService,
};
