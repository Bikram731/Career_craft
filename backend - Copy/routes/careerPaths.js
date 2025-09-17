const express = require('express');
const router = express.Router();
const CareerPath = require('../models/temp');  
const User = require("../models/Userschema");
const requireAuth = require("../middleware/requireAuth");
const Fuse = require('fuse.js');
const isAdmin = require("../middleware/isAdmin");

router.get("/recommend", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).lean();
    if (!user) return res.status(404).json({ error: "User not found" });

    const { interests = [], goal = "" } = user;
    const searchQuery = [...interests, goal].join(" ");

    const allCareers = await CareerPath.find().lean();

    const fuse = new Fuse(allCareers, {
      keys: ["title", "description", "category", "tags"],
      threshold: 0.4,
    });

    const results = fuse.search(searchQuery);

    const recommended = results.slice(0, 5).map((r) => r.item);

    res.status(200).json({ recommended });
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/careers/search
router.get('/search', async (req, res) => {
  try {
    const { q, level, category } = req.query;

    // 🔍 Step 1: Build MongoDB filters for level and category
    const filter = {};
    if (level) filter.level = level;
    if (category) filter.category = category;

    // Step 2: Fetch all careers that match level and category (no q yet)
    const careers = await CareerPath.find(filter);

    // Step 3: If there's a query string (q), apply Fuse.js fuzzy search
    if (q) {
      const fuse = new Fuse(careers, {
        keys: ['title', 'description', 'tags', 'category'], // fields to search in
        threshold: 0.3, // 0.2–0.4 = typo-tolerant but relevant
      });

      const fuzzyResults = fuse.search(q); // fuzzy match results
      const matchedCareers = fuzzyResults.map(result => result.item);

      return res.json(matchedCareers);
    }

    // If no query (q), return careers filtered by level and category only
    res.json(careers);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all career paths
router.get("/", async (req, res) => {
  try {
    const careers = await CareerPath.find(); // or remove limit later
    res.status(200).json(careers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch careers" });
  }
});

// GET single career path by ID
router.get('/:id', async (req, res) => {
  try {
    const path = await CareerPath.findById(req.user._id).lean();
    console.log(req.params.id)
    if (!path) return res.status(404).send({error: "Career Path not found"});
    res.json(path);
  } catch (err) {
    res.status(500).send({error:"Server Error"});
  }
});
//  according to category
router.get('/category/:category/:excludeId', async (req, res) => {
  const { category, excludeId } = req.params;
  if (!excludeId || excludeId === "undefined") {
    return res.status(400).json({ error: "Invalid excludeId" });
  }

  try {
    const similarCareers = await CareerPath.find({
      category,
      _id: { $ne: excludeId },
    }).limit(5);
    res.json(similarCareers);
  } catch (error) {
    console.error("Error fetching similar careers:", error);
    res.status(500).json({ error: "Failed to fetch similar careers" });
  }
});

// POST create new career path
router.post('/',requireAuth, isAdmin, async (req, res) => {
  const {
    title,
    description,
    skills,
    resources,
    progressSteps,
    milestones, // ✅ include this
    difficulty,
    category,
    tags,
    isPopular,
    level,
  } = req.body;

  try {
    const newPath = new CareerPath({
      title,
      description,
      skills,
      resources,
      progressSteps,
      milestones, // ✅ now stored
      difficulty,
      category,
      tags,
      isPopular,
      level,
    });

    const saved = await newPath.save();
    res.json(saved);
  } catch (err) {
    console.error("Career creation error:", err);
    res.status(500).send("Server Error");
  }
});
router.put('/:id', requireAuth, isAdmin, async (req, res) => {
  try {
    const updated = await CareerPath.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Career not found" });
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update career" });
  }
});

// ✅ DELETE: Delete a career path (admin only)
router.delete('/:id', requireAuth, isAdmin, async (req, res) => {
  try {
    const deleted = await CareerPath.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Career not found" });
    res.json({ message: "Career deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete career" });
  }
});

module.exports = router;