const express = require("express");
const { listBills, getBillDetails, listUserBils } = require("../controllers/report");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

//all before login
router.get("/get-collection-bills", authMiddleware, listBills);
router.get("/get-single-bill-details", authMiddleware, getBillDetails);
router.get("/get-user-bills", authMiddleware, listUserBils);

module.exports = router;
