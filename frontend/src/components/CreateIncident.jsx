import { useState } from "react";
import api from "../api/api";
import "../styles/CreateIncident.css";

function CreateIncident({ onCreated }) {

    const [title, setTitle] = useState("");

    const [severity, setSeverity] = useState("HIGH");

    const createIncident = async () => {

        if (!title.trim()) {

            alert("Title is required");

            return;

        }

        try {

            await api.post("/incidents", {
                title,
                severity
            });

            setTitle("");

            setSeverity("HIGH");

            onCreated();

        } catch (error) {

            console.error(error);

            alert("Failed to create incident");

        }

    };

    return (

        <div className="create-box">

            <h2>Create Incident</h2>

            <input

                type="text"

                placeholder="Incident Title"

                value={title}

                onChange={(e) => setTitle(e.target.value)}

            />

            <select

                value={severity}

                onChange={(e) => setSeverity(e.target.value)}

            >

                <option>HIGH</option>

                <option>MEDIUM</option>

                <option>LOW</option>

            </select>

            <button onClick={createIncident}>

                Create Incident

            </button>

        </div>

    );

}

export default CreateIncident;