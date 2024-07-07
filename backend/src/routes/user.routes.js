const express = require('express');
const userController = require('../controller/user.controller');
const { authenticate, adminSecure, trainerSecure, adminTrainerSecure } = require('../middlewares/auth');
const user = express.Router();

user.get('/', authenticate, adminTrainerSecure,userController.getAllUsers);
user.get('/:id', authenticate, adminTrainerSecure, userController.getUserById);
user.patch('/:id', authenticate, adminSecure, userController.updateUser);
user.delete('/:id', authenticate, adminSecure, userController.deleteUser);

module.exports = user;