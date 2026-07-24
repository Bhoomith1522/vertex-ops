const Incident = require("../models/Incident");

const {
    analyzeIncident,
    getAnalysisHistory,
    getAnalysisByIncidentId
} = require("../services/aiAnalysisService");

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

const analyzeIncidentById = async (req, res) => {
    try {

        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({
                message: "Incident not found"
            });
        }

        const analysis = await analyzeIncident(incident);

        res.json({
            incident,
            analysis
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getHistory = async (req, res) => {
    try {

        const history = await getAnalysisHistory();

        res.json(history);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAnalysis = async (req, res) => {
    try {

        const analysis = await getAnalysisByIncidentId(req.params.id);

        if (!analysis) {
            return res.status(404).json({
                message: "Analysis not found"
            });
        }

        res.json(analysis);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    analyze,
    analyzeIncidentById,
    getHistory,
    getAnalysis
};