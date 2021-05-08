const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const authenticationService = require('../services/authentication.service');

const auth = jwt({
    secret: 'NISHCHAY',
    userProperty: 'payload',
    algorithms: ['HS256']
})

router.post('/signup', (req, res, next) => {
    authenticationService.createUser(req.body).then((token) => {
        if (token) {
            res.status(201);
            res.json({
                "token": token
            });
        }
    }).catch((error) => {
        next(error);
    })
})

router.post('/login', (req, res, next) => {
    authenticationService.loginUser(req.body).then((token) => {
        if (token) {
            res.status(200);
            res.json({
                "token": token
            });
        }
    }).catch((error) => {
        next(error);
    })
})

router.get('/profile', auth, (req, res, next) => {
    authenticationService.userProfile(req).then((userData) => {
        if (userData) {
            res.status(200);
            res.json(userData);
        }
    }).catch((error) => {
        next(error);
    })
})

router.get('/getall', (req, res, next) => {
    authenticationService.getAllUsers().then((data) => {
        res.send(data);
    }).catch((error) => {
        next(error);
    })
})

module.exports = router;