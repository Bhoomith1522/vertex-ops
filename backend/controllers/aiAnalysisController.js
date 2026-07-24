const { analyzeIncident } = require("../services/aiAnalysisService");

const analyze = async (req, res) => {
    try {
        const analysis = await analyzeIncident(req.body);

        res.json({
            analysis
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    analyze
};