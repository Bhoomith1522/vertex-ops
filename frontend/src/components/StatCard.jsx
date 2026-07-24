import { AlertTriangle, Activity, CheckCircle2, Brain } from "lucide-react";

function StatCard({ title, value }) {
    const icons = {
        "Total Incidents": <AlertTriangle size={30} />,
        "Open Incidents": <Activity size={30} />,
        "Resolved Incidents": <CheckCircle2 size={30} />,
        "AI Analyses": <Brain size={30} />
    };

    const colors = {
        "Total Incidents": "from-red-500 to-red-700",
        "Open Incidents": "from-yellow-500 to-orange-500",
        "Resolved Incidents": "from-green-500 to-emerald-600",
        "AI Analyses": "from-purple-500 to-indigo-600"
    };

    return (
        <div
            className={`rounded-2xl bg-gradient-to-r ${colors[title]}
            shadow-xl hover:scale-105 transition-all duration-300
            p-6 text-white`}
        >
            <div className="flex justify-between items-center">

                <div>

                    <p className="text-sm opacity-80">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        {value}
                    </h2>

                </div>

                <div>

                    {icons[title]}

                </div>

            </div>

        </div>
    );
}

export default StatCard;