import React from 'react'
import { useState } from 'react'
import {Login} from './pages/Login'
import{ Route, Routes, Navigate } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { Attendance } from "./pages/Attendance"
import { Databases } from "./pages/Databases"
import { Employees } from "./pages/Employees"

function App() {
  const [currentUser, setCurrentUser] = useState('');
  return (
    <Routes>
      <Route path="/" element={currentUser ?
        <Navigate to="/dashboard" /> :
        <Login setCurrentUser={setCurrentUser} />
      }>
      </Route>
      <Route path="/dashboard" element={currentUser ?
        <Dashboard currentUser={currentUser} /> :
        <Navigate to="/" />
      }>
      </Route>
      <Route path="/attendance" element={currentUser ?
        <Attendance currentUser={currentUser} /> :
        <Navigate to="/" />
      }>
      </Route>
      <Route path="/databases" element={currentUser ?
        <Databases currentUser={currentUser} /> :
        <Navigate to="/" />
      }>
      </Route>
      <Route path="/employees" element={currentUser ?
        <Employees currentUser={currentUser} /> :
        <Navigate to="/" />
      }>
      </Route>
    </Routes>
  );
}

export default App;
