const sessionService = require("../services/session.service");
const userService = require("../services/user.service");
const reservationService = require("../services/reservation.service");
const uuidv4 = require("uuid").v4

const createReservation = async (req, res) => {
    const {sessionId, userId} = req.body;
    try{
        const session = await sessionService.getSessionById(sessionId);
       if(!session){
              res.status(404).json({message: "Session not found"});
              return;
       }
        const user = await userService.getUserById(userId);
        if(!user){
            res.status(404).json({message: "User not found"});
            return;
        }
        const userReservations = await reservationService.getReservationByUserAndSession(userId, sessionId);
        
        if(userReservations){
            res.status(400).json({message: "Reservation already exists"});
            return;
        }
        const payload = {
            reference: uuidv4(),
            session: sessionId,
            owner: userId,
        };
        const reservation = await reservationService.createReservation(payload);
        res.status(201).json(reservation);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const getAllReservations = async (req, res) => {
    const {sessionId, userId} = req.query;
    try{
        const reservations = await reservationService.getAllReservations(sessionId, userId);
        res.status(200).json(reservations);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

const getReservationById = async (req, res) => {
    const {id} = req.params;
    try{
        const reservation = await reservationService.getReservationsById(id);
        if(!reservation){
            res.status(404).json({message: "Reservation not found"});
            return;
        }
        res.status(200).json(reservation);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const updateReservation = async (req, res) => {
    const {id} = req.params;
    const payload = req.body;
    try{
        const reservation = await reservationService.getReservationsById(id);
        if(!reservation){
            res.status(404).json({message: "Reservation not found"});
            return;
        }
       const updatedReservation = await reservationService.updateReservation(id, payload);
       res.status(200).json(updatedReservation);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const deleteReservation = async (req, res) => {
    const {reservationId} = req.params;
    try{
        await reservationService.deleteReservation(reservationId)
        res.status(200).json({message: "Reservation deleted successfully"})

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
}