import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { usePrompt } from "../hooks/usePrompt"; // ✅ hook for navigation prompt
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user, dispatch } = useContext(AuthContext);

  const initialForm = {
    name: user?.name || "",
    age: user?.age || "",
    college: user?.college || "",
    goal: user?.goal || "",
    interests: user?.interests?.join(", ") || "",
    bio: user?.bio || "",
    location: user?.location || "",
    profilePicture: user?.profilePicture || "",
    links: {
      linkedin: user?.links?.linkedin || "",
      portfolio: user?.links?.portfolio || "",
    },
  };

  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(user?.profilePicture || "");
  const [isDirty, setIsDirty] = useState(false);

  usePrompt("You have unsaved changes. Are you sure you want to leave?", isDirty);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsDirty(true);

    if (name === "linkedin" || name === "portfolio") {
      setForm((prev) => ({
        ...prev,
        links: { ...prev.links, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setIsDirty(true);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
  if (key === "links") {
    formData.append("links", JSON.stringify(value));
  } else {
    formData.append(key, value);
  }
});
    if (imageFile) formData.append("profilePicture", imageFile);

    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Profile update failed");

      const data = await res.json();
      dispatch({
        type: "LOGIN",
        payload: { token: localStorage.getItem("token"), ...data.user },
      });
      toast.success("Profile updated!");
      setIsDirty(false); // ✅ reset dirty flag
    } catch (err) {
      toast.error("Update failed.");
    }
  };

   const handleReset = () => {
    setForm(initialForm);
    setPreview(initialForm.profilePicture);
    setImageFile(null);
    setIsDirty(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Edit Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
        <Input label="Age" name="age" value={form.age} onChange={handleChange} />
        <Input label="College" name="college" value={form.college} onChange={handleChange} />
        <Input label="Interests" name="interests" value={form.interests} onChange={handleChange} />
        <Textarea label="Career Goal" name="goal" value={form.goal} onChange={handleChange} />
        <Input label="Location" name="location" value={form.location} onChange={handleChange} />
        <Textarea label="Bio" name="bio" value={form.bio} onChange={handleChange} />
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
          {preview && <img src={preview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-full" />}
        </div>
        <Input label="LinkedIn" name="linkedin" value={form.links.linkedin} onChange={handleChange} />
        <Input label="Portfolio" name="portfolio" value={form.links.portfolio} onChange={handleChange} />

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Save Changes
        </button>
        <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Reset Changes
          </button>
      </form>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input name={name} value={value} onChange={onChange} className="w-full p-2 border rounded" />
    </div>
  );
}

function Textarea({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea name={name} value={value} onChange={onChange} className="w-full p-2 border rounded" />
    </div>
  );
}