import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <h2>JobTrack</h2>
        <span>Placemnt Dashboard</span>
      </header>

      <main className="dashboard">
        <section className="welcome">
          <h1>Welcome to JobTrack 👋</h1>
          <p>Track your placement journey in one place</p>
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
            <h3>offers</h3>
            <p>0</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;