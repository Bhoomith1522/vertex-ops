import "../styles/AIAnalysisModal.css";

function AIAnalysisModal({ analysis, onClose }) {

    if (!analysis) return null;

    // Handle nested responses if they exist
    const data = analysis.analysis || analysis;

    return (
        <div className="modal-overlay">

            <div className="modal">

                <h2>🤖 AI Incident Analysis</h2>

                <div className="section">
                    <h3>Root Cause</h3>
                    <p>{data.rootCause || "Not available"}</p>
                </div>

                <div className="section">
                    <h3>Business Impact</h3>
                    <p>{data.businessImpact || "Not available"}</p>
                </div>

                <div className="section">
                    <h3>Suggested Fixes</h3>

                    {Array.isArray(data.suggestedFix) ? (
                        <ul>
                            {data.suggestedFix.map((fix, index) => (
                                <li key={index}>{fix}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No suggestions available.</p>
                    )}

                </div>

                <div className="footer">

                    <span>
                        <strong>Priority:</strong>{" "}
                        {data.priority || "Unknown"}
                    </span>

                    <span>
                        <strong>Confidence:</strong>{" "}
                        {data.confidence ?? 0}%
                    </span>

                </div>

                <button onClick={onClose}>
                    Close
                </button>

            </div>

        </div>
    );
}

export default AIAnalysisModal;