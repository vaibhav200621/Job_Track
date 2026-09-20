
function Applications({ applications, setApplications }) {
  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;

    const newApplication = {
      id: Date.now(),
      company: form.company.value,
      role: form.role.value,
      status: form.status.value,
    };

    setApplications([...applications, newApplication]);
    form.reset();
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

      <form
        className="application-form"
        onSubmit={handleSubmit}
      >
        <input
          name="company"
          type="text"
          placeholder="Company name"
          required
        />

        <input
          name="role"
          type="text"
          placeholder="Job role"
          required
        />

        <select name="status" defaultValue="Applied">
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
            <div
              className="application-item"
              key={application.id}
            >
              <div>
                <h3>{application.company}</h3>
                <p>{application.role}</p>
              </div>

              <select
                value={application.status}
                onChange={(event) =>
                  handleStatusChange(
                    application.id,
                    event.target.value
                  )
                }
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>

              <button
                type="button"
                onClick={() => handleDelete(application.id)}
              >
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