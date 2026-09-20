
import { useState } from "react";
import "./App.css";
import Applications from "./Applications";

// Sidebar Component
function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <h2 className="logo">JobTrack</h2>

      <nav>
        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={page === "applications" ? "active" : ""}
          onClick={() => setPage("applications")}
        >
          Applications
        </button>

        <button onClick={() => alert("Coming soon!")}>
          Interviews
        </button>

        <button onClick={() => alert("Coming soon!")}>
          Profile
        </button>
      </nav>
    </aside>
  );
}

// Dashboard Component
function Dashboard({ applications }) {
  const totalApplications = applications.length;

  const totalInterviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const totalOffers = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  return (
    <main className="main-content">
      <header className="topbar">
        <h2>Placement Dashboard</h2>
        <span>Welcome, Vaibhav 👋</span>
      </header>

      <section className="welcome">
        <h1>Your placement journey starts here!</h1>
        <p>Track your progress and stay organized.</p>
      </section>

      <section className="stats">
        <div className="card">
          <h3>Applications</h3>
          <p>{totalApplications}</p>
        </div>

        <div className="card">
          <h3>Interviews</h3>
          <p>{totalInterviews}</p>
        </div>

        <div className="card">
          <h3>Offers</h3>
          <p>{totalOffers}</p>
        </div>
      </section>
    </main>
  );
}

// Main App Component
function App() {
  const [page, setPage] = useState("dashboard");
  const [applications, setApplications] = useState([]);

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} />

      {page === "dashboard" ? (
        <Dashboard applications={applications} />
      ) : (
        <main className="main-content">
          <Applications
            applications={applications}
            setApplications={setApplications}
          />
        </main>
      )}
    </div>
  );
}

export default App;