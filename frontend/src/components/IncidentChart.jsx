import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function IncidentChart({ stats }) {

    const data = [
        {
            name: "Open",
            value: stats.openIncidents
        },
        {
            name: "Resolved",
            value: stats.resolvedIncidents
        }
    ];

    const COLORS = ["#f59e0b", "#22c55e"];

    return (

        <div className="bg-slate-800 rounded-2xl p-6 mt-8 shadow-xl border border-slate-700">

            <h2 className="text-2xl font-bold text-white mb-6">
                Incident Status Distribution
            </h2>

            <div className="h-96">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={140}
                            label
                        >

                            {data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default IncidentChart;