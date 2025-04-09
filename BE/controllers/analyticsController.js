const analyticService = require("../services/analyticsService");
const analyticsDetails = async (req, res) => {
  try {
    let res = await analyticService.getanalyticsDetails();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  analyticsDetails,
};
