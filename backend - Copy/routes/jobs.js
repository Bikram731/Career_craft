const express = require('express');
const router = express.Router();
const fetchJobsFromAPI = require('../utils/fetchJobs');

router.get('/', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: "Query is required" });

  try {
    const jobs = await fetchJobsFromAPI(query);
    res.json({ jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

module.exports = router;