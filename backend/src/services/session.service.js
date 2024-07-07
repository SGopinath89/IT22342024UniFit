const Session = require("../model/session.model");
const User = require("../model/user.model");

const createSession = async (payload) => {
    const session = await Session.create(payload);
    return session;
}
const getSessions = async () => {
    const session = await Session.find();
    return session;
}
const getSessionById = async (id) => {
    if(!id){
        throw new Error("Session ID not found")
    }
    
    const session = await Session.findById(id)
    return session;
}

const getSessionByTrainer = async (trainerId) => {
    const session = await Session.find({
        trainer : trainerId
    })
    return session;
}

const getSessionbyDate = async (payload) => {
    const date = new Date(payload);
    const session = await Session.find({
        date : date
    })
    return session;

}

const updateSession = async (id, payload) => {
    if(!id){
        throw new Error("Session ID not found")
    }
    const session = await Session.findByIdAndUpdate(id,payload,{new:true})
    return session;
}

const deleteSession = async (id) => {
    if(!id){
        throw new Error("Session ID not found")
    }
    const session = await Session.findByIdAndDelete(id)
    return session;
}
module.exports = sessionService = {
    createSession,
    getSessions,
    updateSession,
    deleteSession,
    getSessionById,
    getSessionByTrainer,
    getSessionbyDate,
}