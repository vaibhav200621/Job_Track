
import { useState } from "react";

function Applications({ applications, setApplications }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingId, setEditingId] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;

    const company = form.company.value.trim();
    const role = form.role.value.trim();
    const status = form.status.value;
    const appliedDate = form.appliedDate.value;

    if (!company || !role || !appliedDate) {
      return;
    }

    const newApplication = {
      id: Date.now(),
      company,
      role,
      status,
      appliedDate,
      interviewDate: "",
      interviewNotes: "",
    };

    setApplications((previousApplications) => [
      ...previousApplications,
      newApplication,
    ]);

    form.reset();
  }

  function handleStatusChange(id, newStatus) {
    setApplications((previousApplications) =>
      previousApplications.map((application) =>
        application.id === id
          ? { ...application, status: newStatus }
          : application
      )
    );
  }

  function handleInterviewChange(id, field, value) {
    setApplications((previousApplications) =>
      previousApplications.map((application) =>
        application.id === id
          ? { ...application, [field]: value }
          : application
      )
    );
  }

  function handleEdit(id) {
    setEditingId(id);
  }

  function handleEditSubmit(event, id) {
    event.preventDefault();

    const form = event.target;

    const updatedApplication = {
      company: form.company.value.trim(),
      role: form.role.value.trim(),
      status: form.status.value,
      appliedDate: form.appliedDate.value,
      interviewDate: form.interviewDate.value,
      interviewNotes: form.interviewNotes.value.trim(),
    };

    if (
      !updatedApplication.company ||
      !updatedApplication.role ||
      !updatedApplication.appliedDate
    ) {
      return;
    }

    setApplications((previousApplications) =>
      previousApplications.map((application) =>
        application.id === id
          ? { ...application, ...updatedApplication }
          : application
      )
    );

    setEditingId(null);
  }

  function handleDelete(id) {
    setApplications((previousApplications) =>
      previousApplications.filter(
        (application) => application.id !== id
      )
    );

    if (editingId === id) {
      setEditingId(null);
    }
  }

  const filteredApplications = applications.filter((application) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      application.company.toLowerCase().includes(searchText) ||
      application.role.toLowerCase().includes(searchText);

    const matchesStatus =
      filterStatus === "All" ||
      application.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-content">
      <h1>Applications</h1>
      <p className="page-subtitle">
        Manage and track your job applications.
      </p>

      <section className="application-form-section">
        <h2>Add New Application</h2>

        <form
          className="application-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="company"
            placeholder="Company name"
            required
          />

          <input
            type="text"
            name="role"
            placeholder="Job role"
            required
          />

          <select name="status" defaultValue="Applied">
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <input
            type="date"
            name="appliedDate"
            aria-label="Application date"
            required
          />

          <button type="submit">Add Application</button>
        </form>
      </section>

      <section className="applications-section">
        <h2>Your Applications</h2>

        <div className="application-filters">
          <input
            type="text"
            placeholder="Search company or role..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={filterStatus}
            onChange={(event) => setFilterStatus(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {filteredApplications.length === 0 ? (
          <p className="empty-message">
            {applications.length === 0
              ? "No applications yet. Add your first application above!"
              : "No applications match your search or filter."}
          </p>
        ) : (
          <div className="applications-list">
            {filteredApplications.map((application) => (
              <div
                className="application-item"
                key={application.id}
              >
                {editingId === application.id ? (
                  <form
                    className="edit-application-form"
                    onSubmit={(event) =>
                      handleEditSubmit(event, application.id)
                    }
                  >
                    <h3>Edit Application</h3>

                    <label>
                      Company
                      <input
                        type="text"
                        name="company"
                        defaultValue={application.company}
                        required
                      />
                    </label>

                    <label>
                      Job Role
                      <input
                        type="text"
                        name="role"
                        defaultValue={application.role}
                        required
                      />
                    </label>

                    <label>
                      Status
                      <select
                        name="status"
                        defaultValue={application.status}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </label>

                    <label>
                      Applied Date
                      <input
                        type="date"
                        name="appliedDate"
                        defaultValue={application.appliedDate || ""}
                        required
                      />
                    </label>

                    <label>
                      Interview Date
                      <input
                        type="date"
                        name="interviewDate"
                        defaultValue={application.interviewDate || ""}
                      />
                    </label>

                    <label>
                      Interview Notes
                      <textarea
                        name="interviewNotes"
                        defaultValue={application.interviewNotes || ""}
                        rows={3}
                        placeholder="Topics to prepare, interview round, etc."
                      />
                    </label>

                    <div className="application-actions">
                      <button type="submit">Save Changes</button>

                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="application-info">
                      <h3>{application.company}</h3>
                      <p>{application.role}</p>

                      <p className="application-date">
                        Applied on:{" "}
                        {application.appliedDate || "Date not available"}
                      </p>

                      <div className="interview-details">
                        <label>
                          Interview Date
                          <input
                            type="date"
                            value={application.interviewDate || ""}
                            onChange={(event) =>
                              handleInterviewChange(
                                application.id,
                                "interviewDate",
                                event.target.value
                              )
                            }
                          />
                        </label>

                        <label>
                          Interview Notes
                          <textarea
                            value={application.interviewNotes || ""}
                            onChange={(event) =>
                              handleInterviewChange(
                                application.id,
                                "interviewNotes",
                                event.target.value
                              )
                            }
                            placeholder="Topics to prepare, interview round, etc."
                            rows={3}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="application-actions">
                      <select
                        value={application.status}
                        onChange={(event) =>
                          handleStatusChange(
                            application.id,
                            event.target.value
                          )
                        }
                        aria-label={`Status for ${application.company}`}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => handleEdit(application.id)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDelete(application.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Applications;