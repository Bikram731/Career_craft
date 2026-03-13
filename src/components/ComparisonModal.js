import React from 'react';
import { X } from 'lucide-react'; // or use any close icon you prefer

export default function ComparisonModal({ careers, onClose }) {
  if (!careers || careers.length !== 2) return null;

  const [left, right] = careers;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="bg-white text-gray-800 rounded-lg w-full max-w-5xl p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Career Comparison
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* LEFT career */}
          <div className="border p-4 rounded bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">{left.title}</h3>
            <p className="mb-2"><strong>Category:</strong> {left.category}</p>
            <p className="mb-2"><strong>Level:</strong> {left.level}</p>
            <p className="mb-2"><strong>Description:</strong> {left.description}</p>
            <p className="mb-2"><strong>Resources:</strong> {left.resources?.length || 0}</p>
          </div>

          {/* RIGHT career */}
          <div className="border p-4 rounded bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">{right.title}</h3>
            <p className="mb-2"><strong>Category:</strong> {right.category}</p>
            <p className="mb-2"><strong>Level:</strong> {right.level}</p>
            <p className="mb-2"><strong>Description:</strong> {right.description}</p>
            <p className="mb-2"><strong>Resources:</strong> {right.resources?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}