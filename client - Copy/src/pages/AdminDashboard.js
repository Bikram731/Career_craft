import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminCareerForm from "../components/AdminCareerForm";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [careerList, setCareerList] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const fetchCareers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/careers");
      const data = await res.json();
      setCareerList(data);
    } catch (err) {
      console.error("Failed to fetch careers:", err);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this career?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/careers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete career");
      setCareerList((prev) => prev.filter((c) => c._id !== id));
      setSelectedCareer(null);
      toast.success("Career deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

   return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Career Management</h1>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setSelectedCareer(null);
            setIsCreating(true);
          }}
          className="bg-green-600 px-4 py-2 rounded"
        >
          + Create New Career
        </button>

        {selectedCareer && (
          <button
            onClick={handleDelete}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Delete Career
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: List of careers */}
        <div className="lg:w-1/3 bg-gray-800 p-4 rounded shadow-lg max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Career List</h2>
          {careerList.map((career) => (
            <div
              key={career._id}
              className={`p-2 mb-2 rounded cursor-pointer hover:bg-gray-700 ${
                selectedCareer?._id === career._id ? "bg-gray-700" : "bg-gray-600"
              }`}
              onClick={() => {
                setSelectedCareer(career);
                setIsCreating(false);
              }}
            >
              <p className="font-medium">{career.title}</p>
              <p className="text-sm text-gray-300">
                {career.level} - {career.category}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Create or Edit Form */}
        <div className="lg:w-2/3">
          <AdminCareerForm
            career={isCreating ? null : selectedCareer}
            onSave={() => {
              fetchCareers();
              setIsCreating(false);
            }}
            onCancel={() => {
              setIsCreating(false);
              setSelectedCareer(null);
            }}
          />
        </div>
      </div>
    </div>
  );
}