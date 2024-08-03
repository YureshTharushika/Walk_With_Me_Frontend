import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import CreateWalk from './components/CreateWalk';

const App: React.FC = () => {
  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route element={<ProtectedRoute />}>
                      <Route path="/home" element={<Home />} />
                  </Route>
                  <Route element={<ProtectedRoute />}>
                      <Route path="/create-walk" element={<CreateWalk />} />
                  </Route>
                  <Route path="/" element={<h1>Welcome to WalkWithMe</h1>} />
              </Routes>
          </div>
      </Router>
  );
};

export default App
