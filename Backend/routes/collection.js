const express = require('express');
const authMiddleware = require('../middlewares/auth');

const { createCollection, fetchCollection, getCreatedCollections, getParticipantCollections } = require("../controllers/collection");

const router = express.Router();

router.post('/', authMiddleware, createCollection);
router.get('/', authMiddleware, fetchCollection);
router.get('/fetch-created/', authMiddleware, getCreatedCollections);
router.get('/fetch-participants/', authMiddleware, getParticipantCollections);

module.exports = router;