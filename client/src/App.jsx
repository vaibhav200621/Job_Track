
import { useEffect, useState } from "react";
import "./App.css";
import Applications from "./Applications";
import Interviews from "./Interviews";

function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <h2 className="logo">JobTrack</h2>

      <nav className="sidebar-nav">
        <button
          className={page === "Dashboard" ? "active" : ""}
          onClick={() => setPage("Dashboard")}
        >
          Dashboard
        </button>

        <button
          className={page === "Applications" ? "active" : ""}
          onClick={() => setPage("Applications")}
        >
          Applications
        </button>

        <button
          className={page === "Interviews" ? "active" : ""}
          onClick={() => setPage("Interviews")}
        >
          Interviews
        </button>

        <button onClick={() => alert("Coming soon!")}>
          Profile
        </button>
      </nav>
    </aside>
  );
}

function Dashboard({ applications }) {
  const totalApplications = applications.length;

  const totalInterviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const totalOffers = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  const totalRejected = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  const today = new Date().toISOString().split("T")[0];

  const upcomingInterviews = applications
    .filter(
      (application) =>
        application.status === "Interview" &&
        application.interviewDate &&
        application.interviewDate >= today
    )
    .sort((a, b) =>
      a.interviewDate.localeCompare(b.interviewDate)
    );

  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.appliedDate) - new Date(a.appliedDate)
    )
    .slice(0, 5);

  return (
    <div className="page-content">
      <h1>Dashboard</h1>
      <p className="page-subtitle">
        Welcome to your JobTrack dashboard!
      </p>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>{totalApplications}</p>
        </div>

        <div className="stat-card">
          <h3>Interviews</h3>
          <p>{totalInterviews}</p>
        </div>

        <div className="stat-card">
          <h3>Offers</h3>
          <p>{totalOffers}</p>
        </div>

        <div className="stat-card">
          <h3>Rejected</h3>
          <p>{totalRejected}</p>
        </div>
      </div>

      <section className="upcoming-interviews">
        <h2>Upcoming Interviews</h2>

        {upcomingInterviews.length === 0 ? (
          <p className="empty-message">
            No upcoming interviews. Add an interview date to an
            application with Interview status.
          </p>
        ) : (
          <div className="applications-list">
            {upcomingInterviews.map((application) => (
              <div
                className="upcoming-interview-card"
                key={application.id}
              >
                <div>
                  <h3>{application.company}</h3>
                  <p>{application.role}</p>
                </div>

                <div className="upcoming-interview-date">
                  <span>Interview Date</span>
                  <strong>{application.interviewDate}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="recent-applications">
        <h2>Recent Applications</h2>

        {recentApplications.length === 0 ? (
          <p className="empty-message">
            No applications yet. Add your first application!
          </p>
        ) : (
          <div className="applications-list">
            {recentApplications.map((application) => (
              <div
                className="recent-application-card"
                key={application.id}
              >
                <div>
                  <h3>{application.company}</h3>
                  <p>{application.role}</p>
                  <span>
                    Applied:{" "}
                    {application.appliedDate || "Date not available"}
                  </span>
                </div>

                <span className="recent-application-status">
                  {application.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("Dashboard");

  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem(
      "jobtrack-applications"
    );

    if (savedApplications) {
      try {
        return JSON.parse(savedApplications);
      } catch {
        return [];
      }
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      "jobtrack-applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  return (
    <div className="app-layout">
      <Sidebar page={page} setPage={setPage} />

      <main className="main-content">
        {page === "Dashboard" ? (
          <Dashboard applications={applications} />
        ) : page === "Applications" ? (
          <Applications
            applications={applications}
            setApplications={setApplications}
          />
        ) : page === "Interviews" ? (
          <Interviews applications={applications} />
        ) : null}
      </main>
    </div>
  );
}

export default App;