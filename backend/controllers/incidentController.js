const {
    getAllIncidents,
    createIncident,
    updateIncidentStatus,
    getIncidentById,
    deleteIncidentById
} = require("../services/incidentService");

const getIncidents = async (req, res) => {
    const incidents = await getAllIncidents();

    res.json(incidents);
};

const addIncident = async (req, res) => {
    if (!req.body.title || !req.body.severity) {
    return res.status(400).json({
        message: "Title and severity are required"
    });
}
    const incident = {
        id: Date.now(),
        title: req.body.title,
        severity: req.body.severity,
        status: "OPEN"
    };

    const createdIncident = await createIncident(incident);

    res.status(201).json(createdIncident);
};
const updateStatus = async (req, res) => {
    const updatedIncident = await updateIncidentStatus(
        req.params.id,
        req.body.status
    );

    if (!updatedIncident) {
        return res.status(404).json({
            message: "Incident not found"
        });
    }

    res.json(updatedIncident);
};
const getIncident = async (req, res) => {
    const incident = await getIncidentById(req.params.id);

    if (!incident) {
        return res.status(404).json({
            message: "Incident not found"
        });
    }

    res.json(incident);
};
const deleteIncident = async (req, res) => {
    const deleted = await deleteIncidentById(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            message: "Incident not found"
        });
    }

    res.json({
        message: "Incident deleted successfully"
    });
};

module.exports = {
    getIncidents,
    addIncident,
    updateStatus,
    getIncident,
    deleteIncident
};