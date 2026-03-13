import React from 'react';

export default function JobList({ jobs }) {
  if (!jobs?.length) return <p className="text-gray-500 mt-4">No jobs found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {jobs.map((job, idx) => (
        <div key={idx} className="bg-white text-black rounded-lg shadow-md p-4 border hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-indigo-700">{job.job_title}</h3>
          <p className="text-sm text-gray-700">{job.company_name} – {job.job_city}</p>
          <p className="text-sm mt-1 text-gray-500">{job.job_employment_type}</p>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{job.job_description.slice(0, 100)}...</p>
          <a
            href={job.job_apply_link}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
          >
            Apply Now
          </a>
        </div>
      ))}
    </div>
  );
}