import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function AdminCareerForm({ career, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    skills: [],
    resources: [],
    milestones: [],
    category: '',
    tags: [],
    difficulty: 'Beginner',
    level: 'Beginner',
    isPopular: false,
  });

  useEffect(() => {
    if (career) {
      setForm({
        ...career,
        skills: career.skills || [],
        resources: career.resources || [],
        milestones: career.milestones || [],
        tags: career.tags || [],
      });
    }
    else {
    // Reset form to blank values for create mode
    setForm({
      title: '',
      description: '',
      skills: [],
      resources: [{ title: '', url: '', type: '' }],
      milestones: [{ milestoneTitle: '', description: '', order: 1 }],
      category: '',
      tags: [],
      difficulty: 'Beginner',
      level: 'Beginner',
      isPopular: false,
    });
  }
  }, [career]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleArrayChange = (field, index, key, value) => {
    const updatedArray = [...form[field]];
    updatedArray[index][key] = value;
    setForm((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const method = career ? "PUT" : "POST";
    const url = career
      ? `http://localhost:5000/api/careers/${career._id}`
      : `http://localhost:5000/api/careers`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `${method} failed`);

    toast.success(`Career ${career ? "updated" : "created"} successfully!`);
    if (onSave) onSave(data); // refresh
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

  return (
    <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded shadow space-y-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold">Edit Career Path</h2>

      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border px-3 py-2" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2" />

      <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border px-3 py-2" />
      <input type="text" name="level" value={form.level} onChange={handleChange} placeholder="Level" className="w-full border px-3 py-2" />
      {/* <input type="text" name="difficulty" value={form.difficulty} onChange={handleChange} placeholder="Difficulty" className="w-full border px-3 py-2" /> */}
      <input type="text" name="tags" value={form.tags.join(',')} onChange={(e) => setForm({ ...form, tags: e.target.value.split(',') })} placeholder="Tags (comma separated)" className="w-full border px-3 py-2" />
      <label>
        <input type="checkbox" name="isPopular" checked={form.isPopular} onChange={handleChange} />
        Popular
      </label>

      {/* Resources */}
      <div>
        <h3 className="font-semibold">Resources</h3>
        {form.resources.map((res, i) => (
          <div key={i} className="border p-2 mb-2">
            <input value={res.title} onChange={(e) => handleArrayChange('resources', i, 'title', e.target.value)} placeholder="Title" className="w-full mb-1 px-2 py-1 border" />
            <input value={res.url} onChange={(e) => handleArrayChange('resources', i, 'url', e.target.value)} placeholder="URL" className="w-full mb-1 px-2 py-1 border" />
            <input value={res.type} onChange={(e) => handleArrayChange('resources', i, 'type', e.target.value)} placeholder="Type" className="w-full px-2 py-1 border" />
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setForm(prev => ({
  ...prev,
  resources: [...prev.resources, { title: '', url: '', type: '' }]
}))}>
  + Add Resource
</button>

      {/* Milestones */}
      <div>
        <h3 className="font-semibold">Milestones</h3>
        {form.milestones.map((m, i) => (
          <div key={i} className="border p-2 mb-2">
            <input value={m.milestoneTitle} onChange={(e) => handleArrayChange('milestones', i, 'milestoneTitle', e.target.value)} placeholder="Milestone Title" className="w-full mb-1 px-2 py-1 border" />
            <input value={m.description} onChange={(e) => handleArrayChange('milestones', i, 'description', e.target.value)} placeholder="Description" className="w-full mb-1 px-2 py-1 border" />
            <input value={m.order} type="number" onChange={(e) => handleArrayChange('milestones', i, 'order', parseInt(e.target.value))} placeholder="Order" className="w-full px-2 py-1 border" />
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setForm(prev => ({
  ...prev,
  milestones: [...prev.milestones, { milestoneTitle: '', description: '', order: prev.milestones.length + 1 }]
}))}>
  + Add Milestone
</button>

      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Career</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
}