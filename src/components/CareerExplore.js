import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CareerCard from "../components/CareerCard";
import CareerDetails from "../components/CareerDetail";
import { AuthContext } from "../context/AuthContext";

export default function CareerExplore() {
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [savedCareerIds, setSavedCareerIds] = useState([]);
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);

  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch careers based on filters in URL
  useEffect(() => {
    const fetchCareers = async () => {
      const params = new URLSearchParams(location.search);
      const q = params.get("q") || "";
      const level = params.get("level") || "";
      const category = params.get("category") || "";

      let url = `http://localhost:5000/api/careers/search?q=${q}`;
      if (level) url += `&level=${level}`;
      if (category) url += `&category=${category}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setCareers(data);
      } catch (error) {
        console.error("Error fetching careers:", error);
      }
    };

    fetchCareers();
  }, [location.search]);

  // Fetch saved career IDs from backend
  useEffect(() => {
    const fetchSavedCareers = async () => {
      if (!user) return;
      try {
        const res = await fetch("http://localhost:5000/api/user/profile/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        const ids = data.savedCareers?.map((career) => career._id) || [];
        setSavedCareerIds(ids);
      } catch (err) {
        console.error("Error fetching saved careers:", err);
      }
    };

    fetchSavedCareers();
  }, [user]);

  const handleAddCareer = async (careerId) => {
    try {
      const res = await fetch("http://localhost:5000/api/user/profile/add-career", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ careerId }),
      });

      if (res.ok) {
        const data = await res.json();
        setSavedCareerIds((prev) => [...prev, careerId]);
        setUser(data.user);
      }
    } catch (err) {
      console.error("Error adding career:", err);
    }
  };

  const handleRemoveCareer = async (careerId) => {
    try {
      const res = await fetch("http://localhost:5000/api/user/profile/remove-career", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ careerId }),
      });

      if (res.ok) {
        const data = await res.json();
        setSavedCareerIds((prev) => prev.filter((id) => id !== careerId));
        setUser(data.user);
      }
    } catch (err) {
      console.error("Error removing career:", err);
    }
  };

  const computeMatchScore = (career) => {
  if (!user?.interests) return 0;
  const interests = user.interests.map(i => i.toLowerCase());
  const text = `${career.title} ${career.description} ${career.category}`.toLowerCase();
  const matches = interests.filter(i => text.includes(i));
  return Math.min(100, Math.round((matches.length / interests.length) * 100));
};

const computeProgress = (career) => {
  const progressEntry = user?.progress?.find(p => p.careerId === career._id);
  const completedResources = progressEntry?.completedResources?.length || 0;
  const completedMilestones = progressEntry?.completedMilestones?.length || 0;
  const totalResources = career.resources?.length || 0;
  const totalMilestones = career.milestones?.length || 0;
  const total = totalResources + totalMilestones;
  const completed = completedResources + completedMilestones;
  return total ? Math.round((completed / total) * 100) : 0;
};

const levelOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };

const sortedCareers = [...careers].sort((a, b) => {
  let valA = 0, valB = 0;

  if (sortOption === "title") {
    valA = a.title;
    valB = b.title;
    return sortOrder === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  }

  if (sortOption === "level") {
    valA = levelOrder[a.level] || 0;
    valB = levelOrder[b.level] || 0;
  }

  if (sortOption === "matchScore") {
    valA = computeMatchScore(a);
    valB = computeMatchScore(b);
  }

  if (sortOption === "progress") {
    valA = computeProgress(a);
    valB = computeProgress(b);
  }

  return sortOrder === "asc" ? valA - valB : valB - valA;
});

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-[Work Sans]">
      <h2 className="text-3xl font-bold text-indigo-800 mb-4">Explore Careers</h2>

      <div className="mb-4">
       <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}
        className="bg-white text-black border border-gray-300 px-3 py-1 rounded shadow-sm">
         <option value="">Sort By</option>
         <option value="title">Title</option>
         <option value="level">Level</option>
         <option value="matchScore">Match Score</option>
         <option value="progress">Progress</option>
       </select>

       <button onClick={() => setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))}
         className="bg-indigo-600 text-white px-3 py-1 rounded shadow-sm hover:bg-indigo-700">
          {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
       </button>
      </div>

      {!user && (
        <p className="text-red-500 font-medium mb-4">
          Login to save careers and track progress.
        </p>
      )}

      {/* 🔁 Show only career details if selectedCareer is set */}
      {selectedCareer ? (
        <CareerDetails
          career={selectedCareer}
          onBack={() => setSelectedCareer(null)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCareers.length > 0 ? (
            sortedCareers.map((career) => {
              const progressEntry = user?.progress?.find(p => p.careerId === career._id);
              const completedResources = progressEntry?.completedResources?.length || 0;
              const completedMilestones = progressEntry?.completedMilestones?.length || 0;
              const totalResources = career.resources?.length || 0;
              const totalMilestones = career.milestones?.length || 0;
              const total = totalResources + totalMilestones;
              return (
              <CareerCard
                key={career._id}
                career={career}
                onViewDetails={setSelectedCareer}
                onAddCareer={handleAddCareer}
                onRemoveCareer={handleRemoveCareer}
                progressPercent={computeProgress(career)}
                completedResources={completedResources}
                completedMilestones={completedMilestones}
                totalResources={totalResources}
                totalMilestones={totalMilestones}
                matchScore={computeMatchScore(career)} 
                isSaved={savedCareerIds.includes(career._id)}
              />
              );
              })
          ) : (
            <p className="text-gray-600">No careers found. Try different filters.</p>
          )}
        </div>
      )}
    </div>
  );
}