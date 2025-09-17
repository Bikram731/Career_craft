import React, { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Navbar from './components/Navbar';
import Register from './pages/Register';
import PrivateRoute from "./components/PrivateRoute";
import PersonalizedRoadmap from "./pages/Learnmore/PersonalizedRoadmap";
import TrackGrowth from "./pages/Learnmore/TrackGrowth";
import AIPoweredSuggestions from "./pages/Learnmore/AISuggestions";
import BuiltByExperts from "./pages/Learnmore/BuiltByExperts";
import ProfileSetup from "./pages/ProfileSetup";
import ProfilePage from "./pages/ProfilePage";
import CareerExplore from "./components/CareerExplore";
import AdminDashboard from './pages/AdminDashboard';

import AOS from 'aos';              // ✅ Import AOS
import 'aos/dist/aos.css';    
import { ParallaxProvider } from 'react-scroll-parallax';      // ✅ Import AOS styles

function App() {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,        // animate only once
      offset: 120,       // trigger point offset
      easing: 'ease-out-back'
    });
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-white">Loading...</div>;
  }

  return (
    <Router>
      <ParallaxProvider>
      <Navbar />
      <Routes>
        <Route path="/explore-careers" element={<CareerExplore />} />

        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/setup-profile"
          element={
            user && !user.profileCompleted ? (
              <ProfileSetup />
            ) : user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/login" />
            ) : !user.profileCompleted ? (
              <Navigate to="/setup-profile" />
            ) : user.isAdmin ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/login"
          element={
            !user ? (
              <Login />
            ) : !user.profileCompleted ? (
              <Navigate to="/setup-profile" />
            ) : user.isAdmin ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route path="/home" element={<Home />} />
        <Route path="/learn-more/personalized-roadmap" element={<PersonalizedRoadmap />} />
        <Route path="/learn-more/track-growth" element={<TrackGrowth />} />
        <Route path="/learn-more/ai-suggestions" element={<AIPoweredSuggestions />} />
        <Route path="/learn-more/built-by-experts" element={<BuiltByExperts />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              {user?.isAdmin ? <AdminDashboard /> : <Navigate to="/dashboard" />}
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} />
      </ParallaxProvider>
    </Router>
  );
}

export default App;