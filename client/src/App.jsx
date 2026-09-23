
import { useEffect, useState } from "react";
import "./App.css";
import Applications from "./Applications";
import Interviews from "./Interviews";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [page, setPage] = useState("Dashboard");
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem("jobtrack-applications");
    return savedApplications ? JSON.parse(savedApplications) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "jobtrack-applications",
      JSON.stringify(applications)
    );
  }, [applications]);

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
    .sort(
      (a, b) =>
        new Date(a.interviewDate) - new Date(b.interviewDate)
    );

  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.appliedDate) - new Date(a.appliedDate)
    )
    .slice(0, 5);

  // Chart ke liye status-wise application count
  const chartData = [
    {
      status: "Applied",
      count: applications.filter(
        (application) => application.status === "Applied"
      ).length,
    },
    {
      status: "Interview",
      count: totalInterviews,
    },
    {
      status: "Offer",
      count: totalOffers,
    },
    {
      status: "Rejected",
      count: totalRejected,
    },
  ];

  return (
    <div className="app-layout">
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

          <button
            onClick={() => alert("Profile page coming soon!")}
          >
            Profile
          </button>
        </nav>
      </aside>

      <main className="main-content">
        {page === "Dashboard" && (
          <>
            <header className="page-header">
              <h1>Dashboard</h1>
              <p>Track your job search progress.</p>
            </header>

            {/* Dashboard statistics */}
            <section className="stats-container">
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
            </section>

            {/* Upcoming interviews */}
            <section className="upcoming-interviews">
              <h2>Upcoming Interviews</h2>

              {upcomingInterviews.length === 0 ? (
                <p>No upcoming interviews scheduled.</p>
              ) : (
                <div className="interview-list">
                  {upcomingInterviews.map((application) => (
                    <div
                      className="interview-card"
                      key={application.id}
                    >
                      <h3>{application.company}</h3>
                      <p>{application.role}</p>
                      <p>
                        Date: {application.interviewDate}
                      </p>

                      {application.interviewNotes && (
                        <p>{application.interviewNotes}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Recent applications */}
            <section className="recent-applications">
              <h2>Recent Applications</h2>

              {recentApplications.length === 0 ? (
                <p>No applications added yet.</p>
              ) : (
                <div className="recent-applications-list">
                  {recentApplications.map((application) => (
                    <div
                      className="recent-application-card"
                      key={application.id}
                    >
                      <div>
                        <h3>{application.company}</h3>
                        <p>{application.role}</p>
                        <small>
                          Applied: {application.appliedDate || "N/A"}
                        </small>
                      </div>

                      <span className="recent-application-status">
                        {application.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Application progress chart */}
            <section className="progress-chart-section">
              <h2>Application Progress</h2>
              <p>Applications grouped by their current status.</p>

              {applications.length === 0 ? (
                <p className="empty-message">
                  Add applications to see your progress chart.
                </p>
              ) : (
                <div className="progress-chart">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="status" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        name="Applications"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </section>
          </>
        )}

        {page === "Applications" && (
          <Applications
            applications={applications}
            setApplications={setApplications}
          />
        )}

        {page === "Interviews" && (
          <Interviews applications={applications} />
        )}
      </main>
    </div>
  );
}

export default App;