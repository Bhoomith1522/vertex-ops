const mongoose = require("mongoose");

const aiAnalysisSchema = new mongoose.Schema(
    {
        incidentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Incident",
            required: true
        },
        rootCause: {
            type: String,
            required: true
        },
        businessImpact: {
            type: String,
            required: true
        },
        suggestedFix: {
            type: [String],
            required: true
        },
        priority: {
            type: String,
            required: true
        },
        confidence: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("AIAnalysis", aiAnalysisSchema);