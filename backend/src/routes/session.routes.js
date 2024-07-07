const express = require('express');
const sessionController = require('../controller/session.controller');
const sessionRouter = express.Router();
const { authenticate, adminSecure, trainerSecure, adminTrainerSecure } = require('../middlewares/auth');

sessionRouter.post('/create',authenticate, trainerSecure, sessionController.createSession);
sessionRouter.get('/', authenticate,adminSecure,sessionController.getSessions);
sessionRouter.get('/:id',authenticate, adminSecure, sessionController.getById);
sessionRouter.patch('/:id', authenticate, adminTrainerSecure,sessionController.updateSession);
sessionRouter.delete('/:id',authenticate,adminSecure, sessionController.deleteSession);

module.exports = sessionRouter;