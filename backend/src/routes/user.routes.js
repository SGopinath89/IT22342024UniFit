const express = require('express');
const userController = require('../controller/user.controller');

const user = express.Router();

user.get('/', userController.getAllUsers);
user.get('/:id', userController.getUserById);
user.patch('/:id', userController.updateUser);
user.patch('/change-password/:id', userController.changePassword);
user.delete('/:id', userController.deleteUser);

module.exports = user;