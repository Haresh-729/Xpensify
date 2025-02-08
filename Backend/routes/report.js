const express = require("express");
const { listBills, getBillDetails } = require("../controllers/report");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

//all before login
router.get("/get-collection-bills", authMiddleware, listBills);
router.get("/get-single-bill-details", authMiddleware, getBillDetails);

module.exports = router;
