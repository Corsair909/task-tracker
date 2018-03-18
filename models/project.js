const mongoose = require('mongoose');
const config = require('../config/database');

/*------------------------------

USER SCHEMA

-------------------------------*/

const ProjectSchema = mongoose.Schema({
    projectName: {
        type: String,
    },
    description: {
        type: String,
    },
    topics: {
        type: Array,
    },
});

const Project = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.getProjectById = function(id, callback){
    Project.findById(id, callback);
}

module.exports.getProjectByProjectName = function(projectName, callback) {
    const query = {projectName: projectName}
    Project.findOne(query, callback);
}

module.exports.getList = function(req, res, next) {
    Project.findOne(function(err, projects) {
        if(err) {
            res.send(err);
        }
        return projects;
    });
};

module.exports.addProject = function(newProject, callback) {
    newProject.save();
};