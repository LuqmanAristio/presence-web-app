import React from 'react'
import {Login} from './pages/Login'
import{ Route, Routes } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { Attendance } from "./pages/Attendance"
import { Databases } from "./pages/Databases"
import { Employees } from "./pages/Employees"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/attendance" element={<Attendance />}></Route>
      <Route path="/databases" element={<Databases />}></Route>
      <Route path="/employees" element={<Employees />}></Route>
    </Routes>
  );
}

export default App;
