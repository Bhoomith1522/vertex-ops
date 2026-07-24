const incidents = [];
const Incident = require("../models/Incident");

const getAllIncidents = async () => {
    return await Incident.find();
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