const policyService = require('../services/policy');

const getEventPolicies = async (req, res) => {
  try {
    const data = await policyService.getEventPolicies(req.params.event_id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getCatagory = async (req, res) => {
  try {
    const data = await policyService.getCatagory();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createPolicy = async (req, res) => {
  try {
    const eventData = req.body; // Get data from request body
    const data = await policyService.createPolicy(eventData);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePolicyById = async (req, res) => {
  const {policy_id} = req.params;
  try {
    const data = await policyService.deletePolicyById(policy_id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 const getEventPoliciesFormatted = async (req, res) => {
    try {
      const data = await policyService.getEventPoliciesFormatted();
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };



module.exports = { getEventPoliciesFormatted, getEventPolicies, getCatagory, createPolicy, deletePolicyById};
