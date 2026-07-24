import Dashboard from "../components/Dashboard";
import CreateIncident from "../components/CreateIncident";
import IncidentTable from "../components/IncidentTable";
import IncidentChart from "../components/IncidentChart";
import { useEffect, useState } from "react";
import api from "../api/api";

function DashboardPage() {

    const [stats, setStats] = useState(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const response = await api.get("/dashboard/stats");
        setStats(response.data);
    };

    const refresh = () => {
        window.location.reload();
    };

    if (!stats) return <h2 className="text-white">Loading...</h2>;

    return (

        <div className="min-h-screen bg-slate-950 p-8">

            <Dashboard />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

                <IncidentChart stats={stats} />

                <CreateIncident onCreated={refresh} />

            </div>

            <div className="mt-8">

                <IncidentTable />

            </div>

        </div>

    );

}

export default DashboardPage;