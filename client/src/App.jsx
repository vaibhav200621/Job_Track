
import "./App.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">JobTrack</h2>

      <nav>
        <a className="active" href="#dashboard">
          Dashboard
        </a>
        <a href="#applications">Applications</a>
        <a href="#interviews">Interviews</a>
        <a href="#profile">Profile</a>
      </nav>
    </aside>
  );
}

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main-content" id="dashboard">
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
    </div>
  );
}

export default App;