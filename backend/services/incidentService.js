const Incident = require("../models/Incident");

const getAllIncidents = async (search, severity, status) => {

    const query = {};

    if (search) {
        query.title = {
            $regex: search,
            $options: "i"
        };
    }

    if (severity) {
        query.severity = severity;
    }

    if (status) {
        query.status = status;
    }

    return await Incident.find(query);
};

const createIncident = async (incidentData) => {
    const incident = await Incident.create(incidentData);

    return incident;
};
const updateIncidentStatus = async (id, status) => {
    return await Incident.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );
};

const getIncidentById = async (id) => {
    return await Incident.findById(id);
};

const deleteIncidentById = async (id) => {
    const deletedIncident = await Incident.findByIdAndDelete(id);

    return deletedIncident;
};

module.exports = {
    getAllIncidents,
    createIncident,
    updateIncidentStatus,
    getIncidentById,
    deleteIncidentById
};