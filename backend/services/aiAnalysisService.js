const Groq = require("groq-sdk");
const AIAnalysis = require("../models/AIAnalysis");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const analyzeIncident = async (incident) => {

    const prompt = `
You are a Senior DevOps Site Reliability Engineer.

Analyze this incident.

Title: ${incident.title}
Severity: ${incident.severity}
Status: ${incident.status}

Return ONLY valid JSON.

{
  "rootCause": "",
  "businessImpact": "",
  "suggestedFix": [],
  "priority": "",
  "confidence": 0
}

STRICT RULES:
- Return ONLY valid JSON.
- rootCause: Maximum 6 words.
- businessImpact: Maximum 8 words.
- suggestedFix: Exactly 3 items.
- Each suggestedFix item: Maximum 5 words.
- priority: Only LOW, MEDIUM, HIGH or CRITICAL.
- confidence: Integer between 0 and 100.
- No markdown.
- No explanations.
- No code block.
`;

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    });

    const aiResponse = response.choices[0].message.content;

    let analysis;

    try {
        analysis = JSON.parse(aiResponse);
    } catch (error) {
        throw new Error("AI returned an invalid JSON response.");
    }

    // Update existing analysis or create a new one
   await AIAnalysis.findOneAndUpdate(
    {
        incidentId: incident._id
    },
    {
        rootCause: analysis.rootCause,
        businessImpact: analysis.businessImpact,
        suggestedFix: analysis.suggestedFix,
        priority: analysis.priority,
        confidence: analysis.confidence,
        modelUsed: "llama-3.3-70b-versatile",
        analyzedAt: new Date()
    },
    {
        upsert: true,
        returnDocument: "after"
    }
);

    return analysis;
};

const getAnalysisHistory = async () => {
    return await AIAnalysis.find().populate("incidentId");
};

const getAnalysisByIncidentId = async (incidentId) => {
    return await AIAnalysis
        .findOne({ incidentId })
        .populate("incidentId");
};

module.exports = {
    analyzeIncident,
    getAnalysisHistory,
    getAnalysisByIncidentId
};