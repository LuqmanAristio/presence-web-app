import React from 'react'
import {Login} from './pages/Login'
import{ Route, Routes, Navigate } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { Attendance } from "./pages/Attendance"
import { Databases } from "./pages/Databases"
import { Employees } from "./pages/Employees"
import { useUser } from './component/UserContext'

function App() {
  const currentUser = useUser();
  return (
    <Routes>
      <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <Login />}></Route>
      <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/" />}></Route>
      <Route path="/attendance" element={currentUser ? <Attendance /> : <Navigate to="/" />}></Route>
      <Route path="/databases" element={currentUser ? <Databases /> : <Navigate to="/" />}></Route>
      <Route path="/employees" element={currentUser ? <Employees /> : <Navigate to="/" />}></Route>
    </Routes>
  );
}

export default App;
