const express = require("express");

const {
    getIncidents,
    addIncident,
    updateStatus,
    getIncident,
    deleteIncident
} = require("../../controllers/incidentController");

const router = express.Router();

router.get("/", getIncidents);
router.post("/", addIncident);
router.patch("/:id/status", updateStatus);
router.get("/:id", getIncident);
router.delete("/:id", deleteIncident);
module.exports = router;