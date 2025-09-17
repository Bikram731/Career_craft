import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaLinkedin, FaGlobe } from "react-icons/fa";

export default function WelcomeSection({ savedCareers = [] }) {
  const { user } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);

  // ✅ Stats Calculation
  const totalSaved = savedCareers.length;

  let totalResources = 0;
  let completedResources = 0;

  savedCareers.forEach((career) => {
    const total = career.resources?.length || 0;
    const completed =
      user?.progress?.find((p) => p.careerId === career._id)
        ?.completedResources?.length || 0;
    totalResources += total;
    completedResources += completed;
  });

  const overallProgressPercent = totalResources
    ? Math.round((completedResources / totalResources) * 100)
    : 0;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-md mb-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Welcome back, {user?.name} 👋</h2>
      </div>

      {/* ✅ Basic Info */}
      {user?.profilePicture && (
        <div className="flex items-center space-x-4 mb-4 mt-4">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-white"
          />
          <div>
            <p className="text-lg font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-200">{user?.college}</p>
          </div>
        </div>
      )}

      {/* ✅ Stats */}
      <div className="bg-white bg-opacity-10 p-4 rounded-lg text-sm space-y-1">
        <p>📌 <strong>Total Careers Saved:</strong> {totalSaved}</p>
        <p>✅ <strong>Resources Completed:</strong> {completedResources}/{totalResources}</p>
        <p>📊 <strong>Overall Progress:</strong> {overallProgressPercent}%</p>
      </div>

      {/* ✅ Toggle Button */}
      <div className="mt-4">
        <button
          onClick={() => setShowProfile((prev) => !prev)}
          className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded hover:bg-gray-100 transition"
        >
          {showProfile ? "Hide Full Profile" : "View Full Profile"}
        </button>
      </div>

      {/* ✅ Conditionally Render Full Profile */}
      {showProfile && (
  <div className="mt-6 bg-white bg-opacity-10 p-4 rounded-lg text-sm space-y-4">

    {/* 🎓 Personal Info */}
    <div>
      <h3 className="text-white font-bold text-md mb-2 underline">👤 Personal Info</h3>
      <p>🎂 <strong>Age:</strong> {user?.age}</p>
      <p>📚 <strong>College:</strong> {user?.college}</p>
      <p>🌍 <strong>Location:</strong> {user?.location || "Not set"}</p>
      <p>✨ <strong>Interests:</strong> {user?.interests?.join(", ") || "Not set"}</p>
    </div>

    {/* 💼 Professional Info */}
    <div>
      <h3 className="text-white font-bold text-md mb-2 underline">💼 Professional Info</h3>
      <p>🎯 <strong>Goal:</strong> {user?.goal || "Not set"}</p>
      <p>📝 <strong>Bio:</strong> {user?.bio || "Not set"}</p>
      <p>
        🔗 <strong>LinkedIn:</strong>{" "}
  {user?.links?.linkedin ? (
    <a
      href={user.links.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-white text-indigo-700 px-3 py-1 rounded hover:bg-indigo-100 transition"
    >
      <FaLinkedin />
      View Profile
    </a>
  ) : (
    "Not provided"
  )}
      </p>
      <p>
        🌐 <strong>Portfolio:</strong>{" "}
  {user?.links?.portfolio ? (
    <a
      href={user.links.portfolio}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-white text-indigo-700 px-3 py-1 rounded hover:bg-indigo-100 transition"
    >
      <FaGlobe />
      Visit Site
    </a>
  ) : (
    "Not provided"
  )}
      </p>
    </div>
  </div>
)}
    </div>
  );
}