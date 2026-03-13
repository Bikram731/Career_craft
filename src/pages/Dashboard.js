import React, { useState, useEffect, useContext } from 'react';
import WelcomeSection from "../components/WelcomeSection";
import CareerCard from "../components/CareerCard";
import CareerDetails from '../components/CareerDetail';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import ComparisonModal from "../components/ComparisonModal";

// ✅ Reusable Sort + Filter Bar
function SortFilterBar({ sortOption, setSortOption, sortOrder, setSortOrder, levelFilter, setLevelFilter }) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="bg-white text-black border border-gray-300 px-2 py-1 rounded shadow-sm"
      >
        <option value="">Sort By</option>
        <option value="title">Title</option>
        <option value="level">Level</option>
        <option value="matchScore">Match Score</option>
        <option value="progressPercent">Progress</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="bg-white text-black border border-gray-300 px-2 py-1 rounded shadow-sm"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <select
        value={levelFilter}
        onChange={(e) => setLevelFilter(e.target.value)}
        className="bg-white text-black border border-gray-300 px-2 py-1 rounded shadow-sm"
      >
        <option value="">All Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  );
}

function calculateMatchScore(user, career) {
  let score = 0;
  if (user?.goal && career.category?.toLowerCase().includes(user.goal.toLowerCase())) {
    score += 30;
  }
  if (user?.goal && career.title?.toLowerCase().includes(user.goal.toLowerCase())) {
    score += 20;
  }
  const matches = user?.interests?.filter(i =>
    career.title.toLowerCase().includes(i.toLowerCase())
  );
  if (matches?.length) {
    score += matches.length * 10;
  }
  return Math.min(score, 100);
}

export default function Dashboard() {
  const [careerPaths, setCareerPaths] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const [recommendedOrder, setRecommendedOrder] = useState('asc');
  const [savedOrder, setSavedOrder] = useState('asc');
  const levelOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };

  const [savedSort, setSavedSort] = useState('');
  const [savedLevel, setSavedLevel] = useState('');
  const [recommendedSort, setRecommendedSort] = useState('');
  const [recommendedLevel, setRecommendedLevel] = useState('');

  const { user, dispatch } = useContext(AuthContext);
  const token = user?.token;

  const savedCareers = user?.savedCareers || [];
  const savedCareerIds = savedCareers.map(c => c._id);

  const computeMatchScore = (career) => {
    if (!user?.interests) return 0;
    const interests = user.interests.map(i => i.toLowerCase());
    const text = `${career.title} ${career.description} ${career.category}`.toLowerCase();
    const matches = interests.filter((i) => text.includes(i));
    return Math.min(100, Math.round((matches.length / interests.length) * 100));
  };

  const toggleCompare = (career) => {
    setCompareList(prev => {
      if (prev.find(c => c._id === career._id)) {
        return prev.filter(c => c._id !== career._id);
      } else if (prev.length < 2) {
        return [...prev, career];
      } else {
        toast.info("You can only compare 2 careers at a time.");
        return prev;
      }
    });
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return;
      try {
        const res = await fetch('http://localhost:5000/api/user/profile/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          dispatch({ type: "LOGIN", payload: { ...data, token } });
        }
      } catch (err) {
        console.error("Error refreshing user data:", err);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) return; 
      try {
        const res = await fetch("http://localhost:5000/api/careers/recommend", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        const enriched = data.recommended.map(career => ({
          ...career,
          matchScore: calculateMatchScore(user, career),
        }));
        setCareerPaths(enriched);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
      }
    };
    fetchRecommendations();
  }, [user]);

    const handleAddCareer = async (careerId) => {
    try {
      const res = await fetch('http://localhost:5000/api/user/profile/add-career', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ careerId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      toast.success('Career added!');
      dispatch({ type: "LOGIN", payload: { ...data.user, token } });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRemoveCareer = async (careerId) => {
    try {
      const res = await fetch('http://localhost:5000/api/user/profile/remove-career', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ careerId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to remove');
      toast.success("Career removed!");
      dispatch({ type: "LOGIN", payload: { token, ...data.user } });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const enrichCareers = (careers) => {
  return careers.map(career => {
    const progressEntry = user.progress?.find(p => p.careerId === career._id);
    const completedResources = progressEntry?.completedResources?.length || 0;
    const completedMilestones = progressEntry?.completedMilestones?.length || 0;

    const totalResources = career.resources?.length || 0;
    const totalMilestones = career.milestones?.length || 0;

    const total = totalResources + totalMilestones;
    const completed = completedResources + completedMilestones;

    const progressPercent = total ? Math.round((completed / total) * 100) : 0;
    const matchScore = computeMatchScore(career);

    return {
      ...career,
      progressPercent,
      matchScore,
    };
  });
};

  const enrichedRecommended = enrichCareers(careerPaths);

const filteredRecommendedCareers = enrichedRecommended
  .filter(c => recommendedLevel ? c.level === recommendedLevel : true)
  .sort((a, b) => {
  let result = 0;
  if (recommendedSort === "title") result = a.title.localeCompare(b.title);
  else if (recommendedSort === "level") {
    result = (levelOrder[a.level] || 0) - (levelOrder[b.level] || 0);
  } else if (recommendedSort === "matchScore") {
    result = a.matchScore - b.matchScore;
  } else if (recommendedSort === "progressPercent") {
    result = a.progressPercent - b.progressPercent;
  }

  return recommendedOrder === 'asc' ? result : -result;
})

  const enrichedSaved = enrichCareers(savedCareers);

const filteredSavedCareers = enrichedSaved
  .filter(c => savedLevel ? c.level === savedLevel : true)
  .sort((a, b) => {
  let result = 0;
  if (savedSort === "title") result = a.title.localeCompare(b.title);
  else if (savedSort === "level") {
    result = (levelOrder[a.level] || 0) - (levelOrder[b.level] || 0);
  } else if (savedSort === "matchScore") {
    result = a.matchScore - b.matchScore;
  } else if (savedSort === "progressPercent") {
    result = a.progressPercent - b.progressPercent;
  }

  return savedOrder === 'asc' ? result : -result;
})

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <section className="mb-10">
        <WelcomeSection savedCareers={savedCareers} />
      </section>

      {compareList.length === 2 && !showComparison && (
        <button onClick={() => setShowComparison(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 z-50">
          Compare Careers
        </button>
      )}

      {/* RECOMMENDED CAREERS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recommended Career Paths</h2>
        <SortFilterBar
          sortOption={recommendedSort}
          setSortOption={setRecommendedSort}
          sortOrder={recommendedOrder}
          setSortOrder={setRecommendedOrder}
          levelFilter={recommendedLevel}
          setLevelFilter={setRecommendedLevel}
        />
        <div className="p-6 w-full px-0 md:px-0">
          {selectedCareer && selectedSection === "recommended" ? (
            <CareerDetails career={selectedCareer} onBack={() => {setSelectedCareer(null);setSelectedSection(null);}} />
          ) : (
            filteredRecommendedCareers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendedCareers.map((career) => {
                const progressEntry = user.progress?.find(p => p.careerId === career._id);
                const completedResources = progressEntry?.completedResources?.length || 0;
                const completedMilestones = progressEntry?.completedMilestones?.length || 0;

                const totalResources = career.resources?.length || 0;
                const totalMilestones = career.milestones?.length || 0;

                const total = totalResources + totalMilestones;
                const completed = completedResources + completedMilestones;

                const progressPercent = total ? Math.round((completed / total) * 100) : 0;
                const matchScore = computeMatchScore(career);
              return(
                <CareerCard
                  key={career._id}
                  career={career}
                  matchScore={matchScore}
                  onViewDetails={() => {setSelectedCareer(career);setSelectedSection("recommended")}} // Set based on which section you're in
                  progressPercent={progressPercent}
                  completedResources={completedResources}
                  completedMilestones={completedMilestones}
                  totalResources={totalResources}
                  totalMilestones={totalMilestones}
                  onAddCareer={handleAddCareer}
                  onRemoveCareer={handleRemoveCareer}
                  toggleCompare={toggleCompare}
                  isSelectedForCompare={compareList.some(c => c._id === career._id)}
                  isSaved={savedCareerIds.includes(career._id)}
                />
              );
             })}
            </div>
            ) : (
          <p className="text-gray-400">No careers recommended yet.</p>
          ))}
        </div>
      </section>

      {/* SAVED CAREERS */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">My Saved Careers</h2>
        <SortFilterBar
          sortOption={savedSort}
          setSortOption={setSavedSort}
          sortOrder={savedOrder} // ✅ CORRECT
          setSortOrder={setSavedOrder}
          levelFilter={savedLevel}
          setLevelFilter={setSavedLevel}
        />
        <div className="p-6 w-full px-0 md:px-0">
          {selectedCareer && selectedSection === "saved" ? (
            <CareerDetails career={selectedCareer} onBack={() => {setSelectedCareer(null);setSelectedSection(null);}} />
          ) : (
        filteredSavedCareers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-start">
            {filteredSavedCareers.map((career) => {
              const progressEntry = user.progress?.find(p => p.careerId === career._id);
              const completedResources = progressEntry?.completedResources?.length || 0;
              const completedMilestones = progressEntry?.completedMilestones?.length || 0;

              const totalResources = career.resources?.length || 0;
              const totalMilestones = career.milestones?.length || 0;

              const total = totalResources + totalMilestones;
              const completed = completedResources + completedMilestones;

              const progressPercent = total ? Math.round((completed / total) * 100) : 0; 
              const matchScore = computeMatchScore(career);             

              return (
                <CareerCard
                  key={career._id}
                  career={career}
                  onViewDetails={() => {
  setSelectedCareer(career);
  setSelectedSection("saved"); // Set based on which section you're in
}}
                  onRemoveCareer={handleRemoveCareer}
                  isSaved={true}
                  progressPercent={progressPercent}
                  completedResources={completedResources}
                  completedMilestones={completedMilestones}
                  totalResources={totalResources}
                  totalMilestones={totalMilestones}
                  matchScore={matchScore}
                  toggleCompare={toggleCompare}
                  isSelectedForCompare={compareList.some(c => c._id === career._id)}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400">No careers saved yet.</p>
        ))}
        </div>
      </section>

      {showComparison && (
        <ComparisonModal
          careers={compareList}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
}