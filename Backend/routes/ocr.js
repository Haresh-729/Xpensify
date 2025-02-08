const express = require("express");
const { uploadBills } = require("../controllers/ocr");
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

//all before login
router.post("/upload-bills", authMiddleware, uploadBills);

module.exports = router;
