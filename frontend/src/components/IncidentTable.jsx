import { useEffect, useState } from "react";
import api from "../api/api";
import AIAnalysisModal from "./AIAnalysisModal";
import "../styles/IncidentTable.css";

function IncidentTable() {

    const [incidents, setIncidents] = useState([]);
    const [analysis, setAnalysis] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        loadIncidents();
    }, []);

    const loadIncidents = async () => {
        try {

            let url = "/incidents?";

            if (search) url += `search=${search}&`;
            if (severity) url += `severity=${severity}&`;
            if (status) url += `status=${status}`;

            const response = await api.get(url);

            setIncidents(response.data);

        } catch (err) {
            console.error(err);
        }
    };

    const analyzeIncident = async (id) => {

        try {

            await api.post(`/ai-analysis/analyze/${id}`);

            const response = await api.get(`/ai-analysis/${id}`);

            setAnalysis(response.data);

            setShowModal(true);

        } catch (err) {

            console.error(err);

            alert("AI Analysis failed");

        }

    };

    const updateStatus = async (id, newStatus) => {

        try {

            await api.patch(`/incidents/${id}/status`, {
                status: newStatus
            });

            loadIncidents();

        } catch (err) {

            console.error(err);

        }

    };

    const deleteIncident = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this incident?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/incidents/${id}`);

            loadIncidents();

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="table-container">

            <h2>Incident Management</h2>

            <div className="filters">

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />

                <select
                    value={severity}
                    onChange={(e)=>setSeverity(e.target.value)}
                >

                    <option value="">All Severity</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>

                </select>

                <select
                    value={status}
                    onChange={(e)=>setStatus(e.target.value)}
                >

                    <option value="">All Status</option>
                    <option value="OPEN">OPEN</option>
                    <option value="RESOLVED">RESOLVED</option>

                </select>

                <button onClick={loadIncidents}>
                    Search
                </button>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Title</th>
                        <th>Severity</th>
                        <th>Status</th>
                        <th>AI</th>
                        <th>Delete</th>

                    </tr>

                </thead>

                <tbody>

                    {incidents.map((incident)=>(

                        <tr key={incident._id}>

                            <td>{incident.title}</td>

                            <td>{incident.severity}</td>

                            <td>

                                <select
                                    value={incident.status}
                                    onChange={(e)=>
                                        updateStatus(
                                            incident._id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="OPEN">
                                        OPEN
                                    </option>

                                    <option value="RESOLVED">
                                        RESOLVED
                                    </option>

                                </select>

                            </td>

                            <td>

                                <button
                                    onClick={()=>
                                        analyzeIncident(
                                            incident._id
                                        )
                                    }
                                >

                                    Analyze

                                </button>

                            </td>

                            <td>

                                <button
                                    onClick={()=>
                                        deleteIncident(
                                            incident._id
                                        )
                                    }
                                >

                                    🗑

                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {
                showModal && (

                    <AIAnalysisModal

                        analysis={analysis}

                        onClose={()=>
                            setShowModal(false)
                        }

                    />

                )
            }

        </div>

    );

}

export default IncidentTable;