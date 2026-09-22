
function Interviews({ applications }) {
  const interviewApplications = applications.filter(
    (application) => application.status === "Interview"
  );

  const sortedInterviews = [...interviewApplications].sort((a, b) => {
    if (!a.interviewDate) return 1;
    if (!b.interviewDate) return -1;

    return a.interviewDate.localeCompare(b.interviewDate);
  });

  return (
    <section className="interviews-page">
      <h2>My Interviews</h2>
      <p className="page-description">
        Keep track of your scheduled job interviews.
      </p>

      {sortedInterviews.length === 0 ? (
        <div className="empty-state">
          <h3>No interviews yet</h3>
          <p>
            Update an application status to Interview to see it here.
          </p>
        </div>
      ) : (
        <div className="interviews-list">
          {sortedInterviews.map((application) => (
            <article className="interview-card" key={application.id}>
              <div className="interview-card-header">
                <div>
                  <h3>{application.company}</h3>
                  <p>{application.role}</p>
                </div>

                <span className="interview-badge">Interview</span>
              </div>

              <p className="interview-date">
                <strong>Date:</strong>{" "}
                {application.interviewDate || "Date not scheduled"}
              </p>

              {application.interviewNotes && (
                <div className="interview-notes">
                  <strong>Notes</strong>
                  <p>{application.interviewNotes}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Interviews;