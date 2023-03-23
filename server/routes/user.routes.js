const express = require('express')
const routes = express.Router();
const jwt = require('jsonwebtoken');
const { createUser, loginUser } = require('../controllers/user.contrtoller');
require('dotenv').config()
const auth = require('../middleware/auth');
const userModel = require('../models/user.model');


routes.post('/signup', async (req, res) => {

    const user = req.body;
    
    const newUser = await createUser(user);
    
    console.log(newUser);
    try {
        if (newUser.status) {
            res.status(400).json(newUser);
        }
        else {
            res.status(201).json({ user: newUser, message: 'User created successfully' });
        }
    }
    catch (error) {
        res.status(504).json(error.message);
    }
})


routes.post('/login', async (req, res) => {
    const user = req.body;
    const newUser = await loginUser(user);
    console.log(newUser);

    if (newUser.status) {
        res.status(404).json(newUser);
    }
    else {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.status(200).send({ user: newUser, token: token, message: 'User Logged In successfully' });
    }
})



module.exports = routes;