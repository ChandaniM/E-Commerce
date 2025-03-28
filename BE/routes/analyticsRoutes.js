const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
router.get('analytic', analyticsController.analyticsDetails);
module.exports = router;