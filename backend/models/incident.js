const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        severity: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "OPEN"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Incident", incidentSchema);