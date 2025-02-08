const reportService = require("../services/report");

const listBills = async (req, res) => {
  try {
    const { id } = req.user;
    const data = await reportService.listBills(id, req);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const listUserBils = async (req, res) => {
  try {
    const { id } = req.user;
    const data = await reportService.listUserBills(id, req);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getBillDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const data = await reportService.getBillDetails(id, req);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  listBills,
  getBillDetails,
  listUserBils,
};