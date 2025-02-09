const express = require("express");
const { listBills, getBillDetails, listUserBils, billApproval,listAllBills } = require("../controllers/report");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

//all before login
router.get("/get-collection-bills", authMiddleware, listBills);
router.get("/get-single-bill-details", authMiddleware, getBillDetails);
router.get("/getlistbils", authMiddleware, listAllBills);

router.put("/getBillApproval", authMiddleware, billApproval);
router.get("/get-user-bills", authMiddleware, listUserBils);

module.exports = router;
