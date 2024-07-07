const express = require('express');
const reservationController = require('../controller/reservation.controller');
const { authenticate,adminTrainerSecure } = require('../middlewares/auth');

const reservation = express.Router();

reservation.post('/',authenticate,reservationController.createReservation);
reservation.get('/', authenticate,adminTrainerSecure,reservationController.getAllReservations);
reservation.get('/:id',authenticate, adminTrainerSecure, reservationController.getReservationById);
reservation.patch('/:id', authenticate,reservationController.updateReservation);
reservation.delete('/:id',authenticate, reservationController.deleteReservation);
reservation.get('/count/:id',authenticate,adminTrainerSecure,reservationController.getReservationCount);

module.exports = reservation;