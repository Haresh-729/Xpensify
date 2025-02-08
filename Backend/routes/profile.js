const express = require('express');
const authMiddleware = require('../middlewares/auth');

const { getProfileDetail, } = require("../controllers/profile");

const router = express.Router();

router.get('/', authMiddleware, getProfileDetail);

module.exports = router;