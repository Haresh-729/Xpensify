const collectionService = require('../services/collection');

const createCollection = async (req, res) => {
    try{
        const {id} = req.user;
        const {name, description, users} = req.body;
        console.log(name, users);
        const data = await collectionService.createCollections(id, name, description, users);
        res.status(200).json({success: true, data});
    } catch(error){
        res.status(400).json({ success: false, message: error.message });
    }
};

const fetchCollection = async (req, res) => {
    try{
        const {id} = req.user;
        const {name, description, users} = req.body;
        console.log(name, users);
        const data = await collectionService.getCollections();
        res.status(200).json({success: true, data});
    } catch(error){
        res.status(400).json({ success: false, message: error.message });
    }
};

const getCreatedCollections = async (req, res) => {
    try{
        const {id} = req.user;
        const data = await collectionService.getCreatedCollections(id);
        res.status(200).json({success: true, data});
    } catch(error){
        res.status(400).json({ success: false, message: error.message });
    }
};
const getParticipantCollections = async (req, res) => {
    try{
        const {id} = req.user;
        const data = await collectionService.getUserParticipant(id);
        res.status(200).json({success: true, data});
    } catch(error){
        res.status(400).json({ success: false, message: error.message });
    }
};
const getCollectionsTrigger = async (req, res) => {
    try{
        const {days, detailed} = req.query;
        const data = await collectionService.getCollectionsTrigger(days, detailed);
        res.status(200).json({success: true, data});
    } catch(error){
        res.status(400).json({ success: false, message: error.message });
    }
};
const reportTriggering = async (req, res) => {
    try{
        console.log(req.query);
        const {days, deteailed} = req.query;
        const data = await collectionService.reportTriggering(days, deteailed);
        res.status(200).json({success: true, data});
    } catch(error){
        res.status(400).json({ success: false, message: error.message });
    }
};
module.exports = {
    createCollection, fetchCollection, getCreatedCollections, getParticipantCollections, getCollectionsTrigger, reportTriggering

}