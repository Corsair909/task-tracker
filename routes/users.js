const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


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

// Registration
router.post('/register', (req, res, next) => {
    let newUser = new User({
        job: req.body.job,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222email,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg:'User registered'});
        }
    });
});

router.post('/register_project', (req, res, next) => {
    let newProject = new Project({
        projectName: req.body.projectName,
        description: req.body.description,
        topics: req.body.topics
    });

    newProject.save(function (err) {
        if (err) return handleError(err);
        // saved!
      })
});

// Authentication
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password.toString(), user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        firstname: user.firstname,
                        job: user.job,
                        lastname: user.lastname,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// get profile
router.get('/profile', (req, res, next) => {
    let str = req.header('User');
    let r = User.getUserById(str);
    console.log(r);
});

router.get('/dashboard', function(req, res, next) {
   Project.find(function(err, tasks) {
    if (err) {
        res.send(err);
    }
    console.log(tasks);
    res.json(tasks);
   }); 
});

router.get('/get_project/:id', function(req, res, next) {
    console.log(req.params.id);
    Project.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, function(err, task) {
        
        if (err) {
            res.send(err);
        }
        console.log(task);
        res.json(task);
        
    }); 
});

module.exports = router;