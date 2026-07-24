function IncidentCard({
    incident,
    onAnalyze,
    onDelete,
    onStatusChange
}) {

    const severityColor = {
        HIGH: "bg-red-500",
        MEDIUM: "bg-yellow-500",
        LOW: "bg-green-500"
    };

    const statusColor = {
        OPEN: "bg-orange-500",
        RESOLVED: "bg-green-600"
    };

    return (

        <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6 hover:border-blue-500 transition-all">

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-xl font-semibold text-white">

                        {incident.title}

                    </h2>

                </div>

                <div className="flex gap-3">

                    <span
                        className={`px-3 py-1 rounded-full text-sm text-white ${severityColor[incident.severity]}`}
                    >

                        {incident.severity}

                    </span>

                    <span
                        className={`px-3 py-1 rounded-full text-sm text-white ${statusColor[incident.status]}`}
                    >

                        {incident.status}

                    </span>

                </div>

            </div>

            <div className="flex gap-3 mt-6">

                <button
                    onClick={() => onAnalyze(incident._id)}
                    className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg"
                >
                    🤖 Analyze
                </button>

                <select
                    value={incident.status}
                    onChange={(e)=>onStatusChange(
                        incident._id,
                        e.target.value
                    )}
                    className="bg-slate-800 text-white rounded-lg px-4"
                >

                    <option value="OPEN">

                        OPEN

                    </option>

                    <option value="RESOLVED">

                        RESOLVED

                    </option>

                </select>

                <button
                    onClick={()=>onDelete(incident._id)}
                    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default IncidentCard;