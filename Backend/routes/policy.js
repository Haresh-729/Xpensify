const express = require('express');
const router = express.Router();
const  authMiddleware = require('../middlewares/auth');
const {
  getEventPolicies,
  createPolicy,
  getCatagory,
  deletePolicyById,
  getEventPoliciesFormatted,
} = require('../controllers/policy');

// Proper routes without conflicts
router.post('/', authMiddleware, createPolicy);  // Create new policy   
router.get('/events', authMiddleware, getEventPoliciesFormatted);  // Get formatted event policies
router.get('/event/:event_id', authMiddleware, getEventPolicies);  // Get event policies
router.delete('/policy/:policy_id', authMiddleware, deletePolicyById);  // Delete policy
router.get('/categories', authMiddleware, getCatagory);  // Get categories

module.exports = router;
