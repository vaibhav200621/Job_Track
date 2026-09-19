
import { useState } from "react";

function Applications() {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("Applied");
    const [applications, setApplications] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();

        const newApplication = {
            id: Date.now(),
            company,
            role,
            status,
        };

        setApplications([...applications, newApplication]);

        setCompany("");
        setRole("");
        setStatus("Applied");
    }


    function handleStatusChange(id, newStatus) {
        setApplications(
            applications.map((application) =>
                application.id === id
                    ? { ...application, status: newStatus }
                    : application
            )
        );
    }


    function handleDelete(id) {
        setApplications(
            applications.filter(
                (application) => application.id !== id
            )
        );
    }

    return (
        <section className="applications-page">
            <h1>Job Applications</h1>
            <p>Manage and track your job applications.</p>

            <form className="application-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Company name"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Job role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    required
                />

                <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <button type="submit">Add Application</button>
            </form>

            <h2>Your Applications</h2>

            {applications.length === 0 ? (
                <p>No applications added yet.</p>
            ) : (
                <div className="application-list">
                    {applications.map((application) => (
                        <div className="application-item" key={application.id}>
                            <div>
                                <h3>{application.company}</h3>
                                <p>{application.role}</p>
                            </div>


                            <select
                                value={application.status}
                                onChange={(event) =>
                                    handleStatusChange(application.id, event.target.value)
                                }
                            >
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>

                            <button onClick={() => handleDelete(application.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Applications;