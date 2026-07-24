const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const analyzeIncident = async (incident) => {
    const prompt = `
    Analyze this DevOps incident:

    Title: ${incident.title}
    Severity: ${incident.severity}
    Status: ${incident.status}

    Provide:
    1. Possible Root Cause
    2. Business Impact
    3. Suggested Fix
    `;

    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        model: "llama-3.3-70b-versatile"
    });

    return response.choices[0].message.content;
};

module.exports = {
    analyzeIncident
};