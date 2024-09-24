import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './nav/Navbar';
import Profile from './pages/Profile'; // Adjust the path if Profile is in a different directory



import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DepartmentForm from './pages/DepartmentForm';
import ResearchLabForm from './pages/ResearchLabForm';
import UserForm from './pages/UserForm';
import RoleMasterForm from './pages/RoleMasterForm';
import AssignRole from './pages/AssignRole';




function App() {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        

        <Route path="/departments" element={<DepartmentForm />} />
        <Route path="/research-lab" element={<ResearchLabForm />} />
        <Route path="/user" element={<UserForm />} />
        <Route path="/role-master" element={<RoleMasterForm />} />
        <Route path="/assign-role" element={<AssignRole />} />
        <Route path="/settings" element={<Profile />} />

        {/* Add more routes here if needed */}
      </Routes>
    </div>
  );
}

export default App;
