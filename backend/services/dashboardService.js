const Incident = require("../models/Incident");
const AIAnalysis = require("../models/AIAnalysis");

const getDashboardStats = async () => {

    const totalIncidents = await Incident.countDocuments();

    const openIncidents = await Incident.countDocuments({
        status: "OPEN"
    });

    const resolvedIncidents = await Incident.countDocuments({
        status: "RESOLVED"
    });

    const highSeverityIncidents = await Incident.countDocuments({
        severity: "HIGH"
    });

    const aiAnalyses = await AIAnalysis.countDocuments();

    return {
        totalIncidents,
        openIncidents,
        resolvedIncidents,
        highSeverityIncidents,
        aiAnalyses
    };
};

module.exports = {
    getDashboardStats
};