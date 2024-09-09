
const {createProjectService, getProjectService} = require('../services/projectService')

const postCreateProjectAPI = async (req, res) => {
    let project = await createProjectService(req.body)

    return res.status(200).json({
        errorCode: 0,
        data: project
    })
}

const getProjectAPI = async (req, res) => {
    let project = await getProjectService(req.query)
    
    return res.status(200).json({
        errorCode: 0,
        data: project
    })
}

module.exports = {
    postCreateProjectAPI,
    getProjectAPI
}