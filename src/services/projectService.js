const Project = require("../models/project")
const aqp = require('api-query-params')

const createProjectService = async (data) => {
    let result = null
    if (data.type === "EMPTY-PROJECT") {
        result = Project.create(data)
    }
    if (data.type === "ADD-USERS") {
        let project =  await Project.findById(data.projectId)

        for (let i = 0; i < data.usersArr.length; i++) {
            project.usersInfor.push(data.usersArr[i])
        }

        result = await project.save()
    }
    if (data.type === "REMOVE-USERS") {
        let project =  await Project.findById(data.projectId)

        for (let i = 0; i < data.usersArr.length; i++) {
            project.usersInfor.pull(data.usersArr[i])
        }

        result = await project.save()
    }
    if (data.type === "ADD-TASKS") {
        let project =  await Project.findById(data.projectId)

        for (let i = 0; i < data.taskArr.length; i++) {
            project.tasks.push(data.taskArr[i])
        }

        result = await project.save()
    }
    return result;
}

const getProjectService = async (queryString) => {
    try {
        let page = queryString.page
        const {filter, limit, population} = aqp(queryString)
        let skip = (page - 1) * limit;
        delete filter.page
        result = await Project.find(filter).populate(population).skip(skip).limit(limit).exec();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateProjectService = async (data) => {
    try {
        let result = await Project.updateOne(
            { _id: data.id },
            { $set: data }
        )
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

const deleteAProjectService = async (data) => {
    try {
        let result = await Project.deleteById({ _id: data.id })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createProjectService,
    getProjectService,
    updateProjectService,
    deleteAProjectService
}