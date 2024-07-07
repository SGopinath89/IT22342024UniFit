const { get } = require('mongoose');
const Session = require('../model/session.model');
const User = require('../model/user.model');
const sessionService = require('../services/session.service');

const createSession = async (req, res) => {
    const payload = req.body;
    try {
        const session = await sessionService.createSession(payload);
        return res.status(200).json({ message: 'Session Created Successfully', session });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

const getSessions = async (req, res) => {
    const {trainerId,date} = req.query;
    try {
        if(trainerId){
            const session = await sessionService.getSessionByTrainer(trainerId);
            return res.status(200).json({ session });
        }
        if(date){
            const session = await sessionService.getSessionbyDate(date);
            return res.status(200).json({ session });
        }
        const session = await sessionService.getSessions();
        return res.status(200).json({ session });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

const getById = async (req, res) => {
    const {id} = req.params;
    try {
       const session = await sessionService.getSessionById(id);
        return res.status(200).json({ session });
    } catch (error) {
        return res.status(400).json({message: "Session not found"});
    }
}


const updateSession = async (req, res) => {
    const {id} = req.params;
    const payload = req.body;
    try {
        const session = await sessionService.updateSession(id, payload);
        return res.status(200).json(session);
    } catch (error) {
        return res.status(400).json({ error });
    }
}

const deleteSession = async (req, res) => {
    const {id} = req.params;
    try {
        await sessionService.deleteSession(id);
        return res.status(200).json( {message : "Session deleted successfully"});
    } catch (error) {
        return res.status(400).json({ message: "Session not found"});
    }
}

module.exports = sessionController = {
    createSession,
    getSessions,
    getById,
    updateSession,
    deleteSession,
}