import { useEffect, useState } from "react";
import api from "../api/api";
import StatCard from "./StatCard";

function Dashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {

        const response = await api.get("/dashboard/stats");

        setStats(response.data);

    };

    if (!stats) {
        return <h2 className="text-white text-2xl">Loading...</h2>;
    }

    return (

        <div>

            <div className="mb-8">

                <h1 className="text-5xl font-bold text-white">
                    ⚡ NexusOps AI
                </h1>

                <p className="text-gray-400 mt-2 text-lg">
                    AI Powered DevOps Command Center
                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                <StatCard
                    title="Total Incidents"
                    value={stats.totalIncidents}
                />

                <StatCard
                    title="Open Incidents"
                    value={stats.openIncidents}
                />

                <StatCard
                    title="Resolved Incidents"
                    value={stats.resolvedIncidents}
                />

                <StatCard
                    title="AI Analyses"
                    value={stats.aiAnalyses}
                />

            </div>

        </div>

    );

}

export default Dashboard;