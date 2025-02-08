const collectionService = require('../services/collection');

const getCollectionBills = async (req, res) => {
  const {c_id} = req.params;
  try {
    const data = await accountService.getAllUsersByRole(role_id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};