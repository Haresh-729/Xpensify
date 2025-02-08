const ocrService = require("../services/ocr");

const uploadBills = async (req, res) => {
  try {
    const { id } = req.user;
    const data = await ocrService.uploadBills(id, req);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  uploadBills,
};