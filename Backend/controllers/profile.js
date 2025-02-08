const profileService = require('../services/profile');

const getProfileDetail = async (req, res) => {
    try{
        const {id} = req.user;
        const data = await profileService.getProfileDetails(id);
        res.status(200).json({success: true, data});
    } catch(error){
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    getProfileDetail,

}