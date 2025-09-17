import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CareerCard from './CareerCard';
import JobList from './JobList';



export default function CareerDetails({ career, onBack }) {
  console.log("💡 CareerDetails mounted with career:", career);
  const [resources, setResources] = useState([]);
  const [relatedCareers, setRelatedCareers] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const [milestones, setMilestones] = useState([]); // ✅ include dispatch

  const [showJobs, setShowJobs] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  useEffect(() => {
    setResources(career.resources || []);

    const fetchProgress = async () => {
      if (!user || !career?._id) return;
      setLoadingProgress(true);

      try {
        const res = await fetch(
          `http://localhost:5000/api/user/profile/progress/${career._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        if (data?.completedResources) {
          const updated = career.resources.map((res, index) => ({
            ...res,
            completed: data.completedResources.includes(index),
          }));
          setResources(updated);
        }
        if (data?.completedMilestones) {
         const updatedMilestones = career.milestones?.map((m, index) => ({
            ...m,
            completed: data.completedMilestones.includes(index),
         })) || [];
          setMilestones(updatedMilestones);
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchProgress();
  }, [career, user]);

  const handleFetchJobs = async () => {
  setLoadingJobs(true);
  try {
    const res = await fetch(`http://localhost:5000/api/jobs?query=${career.title}`);
    const data = await res.json();
    setJobs(data.jobs || []);
    setShowJobs(true); // Only show after fetch
  } catch (err) {
    console.error("Error fetching jobs:", err);
  } finally {
    setLoadingJobs(false);
  }
};

  // ✅ Save progress and update global user context
  const handleToggleComplete = async (index) => {
    if (!user) return;

    const updated = [...resources];
    updated[index].completed = !updated[index].completed;
    setResources(updated);

    const completedResources = updated
      .map((r, i) => (r.completed ? i : null))
      .filter((i) => i !== null);

    const completedMilestones = milestones
      .map((m, i) => (m.completed ? i : null))
      .filter((i) => i !== null);

    try {
      const res = await fetch('http://localhost:5000/api/user/profile/progress/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          careerId: career._id,
          completedResources,
          completedMilestones,
        }),
      });

      const data = await res.json();

      if (res.ok && data.progress) {
        // ✅ fetch updated user profile to update context
        const updatedRes = await fetch("http://localhost:5000/api/user/profile/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const updatedUser = await updatedRes.json();

        if (updatedRes.ok) {
          dispatch({
            type: "LOGIN",
            payload: {
              ...updatedUser,
              token: localStorage.getItem("token"),
            },
          });
        }
      }
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  const handleToggleMilestone = async (index) => {
  if (!user) return;

  const updated = [...milestones];
  updated[index].completed = !updated[index].completed;
  setMilestones(updated);

  const completedMilestones = updated
    .map((m, i) => (m.completed ? i : null))
    .filter((i) => i !== null);

  const completedResources = resources
    .map((r, i) => (r.completed ? i : null))
    .filter((i) => i !== null);

  try {
     const res=await fetch('http://localhost:5000/api/user/profile/progress/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        careerId: career._id,
        completedResources,
        completedMilestones,
      }),
    });
    const data = await res.json();

    // ✅ Sync updated user progress to AuthContext
    if (res.ok && data.progress) {
      const updatedRes = await fetch("http://localhost:5000/api/user/profile/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const updatedUser = await updatedRes.json();

      if (updatedRes.ok) {
        dispatch({
          type: "LOGIN",
          payload: {
            ...updatedUser,
            token: localStorage.getItem("token"),
          },
        });
      }
    }
    
  } catch (err) {
    console.error("Error updating milestone progress:", err);
  }
};

  const totalItems = resources.length + milestones.length;
const completedItems =
  resources.filter(r => r.completed).length + milestones.filter(m => m.completed).length;
const progressPercent = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;

  useEffect(() => {
    if (!career || !career._id || !career.category) return;

    const fetchRelatedCareers = async () => {
      //  console.log("✅ Fetching related for:", career.category, career._id);
      try {
        const res = await fetch(
          `http://localhost:5000/api/careers/category/${career.category}/${career._id}`
        );
        const data = await res.json();
        setRelatedCareers(data);
      } catch (err) {
        console.error("Error fetching related careers:", err);
      }
    };
      fetchRelatedCareers();
  }, [career]);

  if (!career) return null;
  console.log(career);

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold">{career.title}</h1>
      <p className="mt-2 text-gray-600">{career.description}</p>

      {milestones.length > 0 && (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">Milestones</h3>
    <ul className="space-y-3">
      {milestones.map((milestone, index) => (
        <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
          <div>
            <p className="font-medium">
              {milestone.order ? `Step ${milestone.order}` : `Step ${index + 1}`}: {milestone.milestoneTitle}
            </p>
            <p className="text-sm text-gray-600">{milestone.description}</p>
          </div>
          <div>
            <input
              type="checkbox"
              checked={milestone.completed}
              onChange={() => handleToggleMilestone(index)}
              disabled={!user}
              title={!user ? 'Login to track progress' : 'Mark as complete'}
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
)}

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-600 mb-1">
          Progress: {user ? `${progressPercent}%` : 'Login to track your progress'}
        </div>
        <div className="w-full h-4 bg-gray-200 rounded">
          <div
            className="h-4 bg-green-500 rounded transition-all duration-300"
            style={{ width: `${user ? progressPercent : 0}%` }}
          ></div>
        </div>
      </div>

      {/* Resource List */}
      <h3 className="text-xl font-semibold mb-3">Resources:</h3>
      {loadingProgress ? (
        <p className="text-sm text-gray-500">Loading progress...</p>
      ) : (
        <ul className="space-y-3">
          {resources.map((res, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded border"
            >
              <div>
                <p className="font-medium">{res.title}</p>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  View Resource
                </a>
                <p className="text-xs text-gray-500">Type: {res.type}</p>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={res.completed}
                  onChange={() => handleToggleComplete(index)}
                  disabled={!user}
                  title={!user ? 'Login to track progress' : 'Mark as complete'}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
  onClick={handleFetchJobs}
  className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
>
  {loadingJobs ? "Fetching jobs..." : "Find Related Jobs"}
</button>

{showJobs && <JobList jobs={jobs} />}

      {/* You Might Also Like */}
      {relatedCareers.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">You Might Also Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCareers.map((c) => (
              <CareerCard
                key={c._id}
                career={c}
                onViewDetails={() => {
                  onBack(); // Close current view
                  setTimeout(() => window.scrollTo(0, 0), 0); // Optional scroll-to-top
                }}
                isSaved={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}