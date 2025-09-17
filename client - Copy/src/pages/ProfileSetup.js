import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    college: "",
    interests: "",
    goal: "",
    bio: "",
    location: "",
    profilePicture: "",
    links: {
      linkedin: "",
      portfolio: ""
    }
  });
   
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "linkedin" || name === "portfolio") {
      setForm({ ...form, links: { ...form.links, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "links") {
        formData.append("linkedin", value.linkedin);
        formData.append("portfolio", value.portfolio);
      } else {
        formData.append(key, value);
      }
    });

    if (imageFile) {
      formData.append("profilePicture", imageFile);
    }

    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to save profile");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-[#2d2d2d] text-white rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">College Name</label>
          <input
            name="college"
            placeholder="College Name"
            value={form.college}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Interests (comma-separated)</label>
          <input
            name="interests"
            placeholder="e.g. Web Dev, AI, UI/UX"
            value={form.interests}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Career Goal</label>
          <textarea
            name="goal"
            placeholder="Your Career Goal (optional)"
            value={form.goal}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Short Bio</label>
          <textarea
            name="bio"
            placeholder="Tell us about yourself"
            value={form.bio}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            name="location"
            placeholder="e.g. Delhi, India"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">LinkedIn URL</label>
          <input
            name="linkedin"
            placeholder="https://linkedin.com/in/yourprofile"
            value={form.links.linkedin}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Portfolio URL</label>
          <input
            name="portfolio"
            placeholder="https://your-portfolio.com"
            value={form.links.portfolio}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-full" />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 p-2 rounded font-semibold"
        >
          {loading ? "Saving..." : "Save and Continue"}
        </button>
      </form>
    </div>
  );
}