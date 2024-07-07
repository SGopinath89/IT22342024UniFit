const Reservation = require("../model/reservation.model");

const createReservation = async (payload) => {  
    try{
        const reservation = await Reservation.create(payload)
        return reservation
    }
    catch(error){
        throw new Error(error)
    }
}

const getAllReservations = async (sessionId, userId) => {
   
    try{
        if(sessionId){
            const session = await Reservation.find({session: sessionId})
            return session
        }
        if(userId){
            return await Reservation.find({owner: userId})
           
        }
        if(sessionId && userId){
            return await getReservationByUserAndSession(sessionId,userId)
        }
         await Reservation.find()
    }
    catch(error){
        throw new Error(error)
    }
}

const getReservationsById = async (id) => {
    try{
        return await Reservation.findById(id)
    }
    catch(error){
        throw new Error(error)
    }
}

const getResrvationByUserId = async (userId) => {
    try{
        return await Reservation.find(userId)
    }
    catch(error){
        throw new Error(error)
    }
}

const getReservationByUserAndSession = async (sessionId, userId) => {
    try{
        return await Reservation.findOne({sessionId: sessionId, userId: userId})
    }
    catch(error){
        throw new Error(error)
    }
}

const getReservationCountBySession = async (sessionId) => {
    try{
        return await Reservation.countDocuments({sessionId: sessionId})
    }
    catch(error){
        throw new Error(error)
    }
}

const updateReservation = async (id, payload) => {
    try{
        return await Reservation.findByIdAndUpdate(id, payload, {new: true})        
    }
    catch(error){
        throw new Error(error)
    }   
}

const deleteReservation = async (id) => {
    try{
        return await Reservation.findByIdAndDelete(id)
    }
    catch(error){
        throw new Error(error)
    }
}

module.exports = reservationService = {
    createReservation,
    getAllReservations,
    getReservationsById,
    getResrvationByUserId,
    getReservationByUserAndSession,
    getReservationCountBySession,
    updateReservation,
    deleteReservation
}   