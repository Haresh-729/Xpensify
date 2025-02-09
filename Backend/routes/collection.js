const express = require('express');
const authMiddleware = require('../middlewares/auth');

const { createCollection, fetchCollection, getCreatedCollections, getParticipantCollections, reportTriggering } = require("../controllers/collection");

const router = express.Router();

router.post('/', authMiddleware, createCollection);
router.get('/', authMiddleware, fetchCollection);
router.get('/fetch-created/', authMiddleware, getCreatedCollections);
router.get('/fetch-participants/', authMiddleware, getParticipantCollections);

router.get('/reprtTriggering/', reportTriggering);

module.exports = router;