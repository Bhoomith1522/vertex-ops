const express = require("express");

const {
    analyze,
    analyzeIncidentById,
    getHistory,
    getAnalysis
} = require("../../controllers/aiAnalysisController");

const router = express.Router();

// Analyze incident from request body
router.post("/analyze", analyze);

// Analyze existing incident by ID
router.post("/analyze/:id", analyzeIncidentById);

// Get all AI analyses
router.get("/history", getHistory);

// Get AI analysis for a specific incident
router.get("/:id", getAnalysis);

module.exports = router;