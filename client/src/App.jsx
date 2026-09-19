
import { useState } from "react";
import "./App.css";
import Applications from "./Applications";

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

function Dashboard() {
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
          <p>0</p>
        </div>

        <div className="card">
          <h3>Interviews</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Offers</h3>
          <p>0</p>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} />

      {page === "dashboard" ? (
        <Dashboard />
      ) : (
        <main className="main-content">
          <Applications />
        </main>
      )}
    </div>
  );
}

export default App;