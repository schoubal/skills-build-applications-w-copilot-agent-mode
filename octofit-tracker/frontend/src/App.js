import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.svg';

function App() {
  return (
    <div className="App container py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-4 px-3 py-2">
        <div className="container-fluid align-items-center">
          <div className="d-flex align-items-center">
            <img src={logo} alt="OctoFit" className="app-logo-sm me-3" />
            <span className="navbar-brand fw-bold mb-0">OctoFit Tracker</span>
          </div>
          <div className="navbar-nav flex-wrap">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/activities">
              Activities
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/teams">
              Teams
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/users">
              Users
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="card tracker-card shadow-sm mb-4">
              <div className="card-body">
                <h1 className="h3 mb-3 tracker-heading">Welcome to OctoFit Tracker</h1>
                <p className="lead mb-3 tracker-text">
                  Navigate the menu to view backend REST API responses in a clean Bootstrap layout.
                </p>
                <p className="mb-0 tracker-text">
                  The app will use <code>REACT_APP_CODESPACE_NAME</code> to resolve backend URLs automatically.
                </p>
              </div>
            </div>
          }
        />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
