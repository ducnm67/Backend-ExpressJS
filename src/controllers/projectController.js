
const {createProjectService, getProjectService,
     updateProjectService, deleteAProjectService} = require('../services/projectService')

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

const putUpdateProjectAPI = async (req, res) => {
    let project = await updateProjectService(req.body)

    return res.status(200).json({
        errorCode: 0,
        data: project
    })
}

const deleteAProjectAPI = async (req, res) => {
    console.log(req.body)
    let project = await deleteAProjectService(req.body)
    return res.status(200).json({
        errorCode: 0,
        data: project
    })
}

module.exports = {
    postCreateProjectAPI,
    getProjectAPI,
    putUpdateProjectAPI,
    deleteAProjectAPI
}