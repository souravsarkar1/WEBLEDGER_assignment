const express = require('express');
const multer = require('multer'); // Middleware for handling file uploads
const { registerCheck } = require('../Middleware/register.check.middleware');
const { UserModel } = require('../Model/user.model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();


const userRouter = express.Router();




userRouter.post('/register', registerCheck, async (req, res) => {
    try {
        const { name, email, pass, age } = req.body;
        const isEmailRegistered = await UserModel.findOne({ email });

        if (isEmailRegistered) {
            return res.status(200).json({ msg: 'Email is already registered' });
        }

        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                return res.status(400).json({ err: err.message });
            }

            if (hash) {

                const newUser = new UserModel({
                    name,
                    email,
                    pass: hash,
                    age
                });

                await newUser.save();

                return res.status(200).json({ msg: 'New user has been added' , user : newUser });
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


userRouter.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        bcrypt.compare(pass, user.pass, async (error, result) => {
            if (result) {
                const token = jwt.sign(
                    { name: user.name, userId: user._id },
                    process.env.secrate,
                    { expiresIn: '7d' }
                );
                res.status(200).json({
                    msg: 'Login Successful!!',
                    token: token,
                    name: user.name,
                });
            } else {
                res.status(200).json({ msg: 'Wrong Credentials' });
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = { userRouter };
