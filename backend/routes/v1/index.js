const express = require("express");

const healthRoutes = require("./healthRoutes");
const incidentRoutes = require("./incidentRoutes");
const monitoringRoutes = require("./monitoringRoutes");
const aiAnalysisRoutes = require("./aiAnalysisRoutes");
const selfHealingRoutes = require("./selfHealingRoutes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/incidents", incidentRoutes);
router.use("/monitoring", monitoringRoutes);
router.use("/ai-analysis", aiAnalysisRoutes);
router.use("/self-healing", selfHealingRoutes);

module.exports = router;