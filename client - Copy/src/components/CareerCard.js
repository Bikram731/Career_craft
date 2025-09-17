import React, { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import DonutChart from './DonutChart';
import { FaEye } from 'react-icons/fa';

// ✅ Helper to highlight query match
const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'ig');
  return text.replace(regex, '<mark>$1</mark>'); // <mark> gives yellow background
};

export default function CareerCard({
  career,onViewDetails,matchScore,onAddCareer,onRemoveCareer,isSaved,progressPercent,completedResources,completedMilestones,totalResources,
  totalMilestones,toggleCompare,isSelectedForCompare,
  searchQuery = "", // ✅ add default empty string
}) {
  const { user } = useContext(AuthContext);

  const title = career?.title || "Untitled";
  const description = career?.description || "No description available.";
  const category = career?.category || "General";
  const level = career?.level || "Beginner";

  const handleUnauthenticated = () => {
    toast.info("Please login to save or remove careers.");
  };
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* ✅ Highlight title */}
      <h2
        className="text-xl font-bold"
        dangerouslySetInnerHTML={{ __html: highlightMatch(title, searchQuery) }}
      />

      {/* ✅ Highlight description */}
      <p
        className="text-gray-600"
        dangerouslySetInnerHTML={{ __html: highlightMatch(description.slice(0, 100), searchQuery) }}
      />

      <div className="mt-2 text-sm text-gray-500">
        {/* ✅ Highlight category */}
        <p>
          <strong>Category:</strong>{' '}
          <span
            dangerouslySetInnerHTML={{ __html: highlightMatch(category, searchQuery) }}
          />
        </p>
        <p><strong>Level:</strong> {level}</p>

      </div>
       {/* Progress bar here */}

     <div style={{ width: "150px", height: "100px" }} className="mt-2">
  <DonutChart
    completedResources={completedResources}
    completedMilestones={completedMilestones}
    total={totalResources + totalMilestones}
  />
</div>

    {typeof matchScore === 'number' && (
    <p className={`text-sm font-semibold mt-3 ${
      matchScore >= 70
        ? "text-green-500"
        : matchScore >= 40
        ? "text-yellow-500"
        : "text-red-500"
      }`}>
      Match Score: {matchScore}%
    </p>)}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => onViewDetails(career)}
      >
        View Details
      </button>

      {toggleCompare && (
      <button
       onClick={() => toggleCompare(career)}
       className={`mt-2 px-4 py-2 rounded ${
        isSelectedForCompare ? 'bg-yellow-500 text-black' : 'bg-gray-200 text-gray-800'
       }`}>
       {isSelectedForCompare ? 'Remove from Compare' : 'Compare'}
      </button>)}

      {user ? (
        isSaved ? (
          <button
            onClick={() => onRemoveCareer && onRemoveCareer(career._id)}
            className="text-red-600 hover:text-red-800 mt-2"
            title="Remove from Saved"
          >
            <FaTrash size={20} />
          </button>
        ) : (
          <button
            onClick={() => onAddCareer && onAddCareer(career._id)}
            className="bg-purple-600 text-white px-4 py-2 rounded mt-2"
          >
            Add
          </button>
        )
      ) : (
        <button
          onClick={handleUnauthenticated}
          className="bg-gray-400 text-white px-4 py-2 rounded mt-2 cursor-not-allowed"
        >
          Add
        </button>
      )}
    </div>
  );
}