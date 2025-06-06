import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Links from "../../components/Navigation/Links";


import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Signup from '../../pages/Signup/Signup';
import Tasks from '../../pages/Tasks/Tasks';
import Summaries from '../../pages/Summaries/Summaries';
import Community from '../../pages/Community/Community';
import Profile from '../../pages/Profile/Profile';
import Help from '../../pages/Help/Help';
import Settings from '../../pages/Settings/Settings';
import Admin from '../../pages/Admin/Admin';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/summaries" element={<Summaries />} />
      <Route path="/community" element={<Community />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/help" element={<Help />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default AppRoutes;
