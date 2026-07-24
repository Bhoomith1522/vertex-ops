const { getHealthData } = require("../services/healthService");

const getHealthStatus = (req, res) => {
    const healthData = getHealthData();

    res.json(healthData);
};

module.exports = {
    getHealthStatus
};