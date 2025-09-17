const express = require("express");
const router = express.Router();
const User = require("../models/Userschema");
const multer = require("multer");
const path = require("path");
const requireAuth = require("../middleware/requireAuth"); // your JWT auth middleware

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit size to 5MB
});



router.put("/", requireAuth,upload.single("profilePicture"), async (req, res) => {
  const userId = req.user._id;
  const { name, age, college, interests, goal,bio,location,links, } = req.body;

  let parsedLinks = {};
try {
  parsedLinks = typeof links === "string" ? JSON.parse(links) : links;
} catch (err) {
  console.warn("Could not parse links:", links);
}

  try {
    const updated = await User.findByIdAndUpdate(
      userId,
      {
        name,
        age,
        college,
        goal,
        bio,
        location,
        profilePicture: req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : undefined,
        links: parsedLinks,
        interests: typeof interests === "string"
          ? interests.split(",").map(i => i.trim())
          : interests,
        profileCompleted: true,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile updated", user: updated });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").populate("savedCareers"); // exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// Update profile
router.post("/", requireAuth, upload.single("profilePicture"), async (req, res) => {
  const userId = req.user._id;
  const { name, age, college, interests, goal,bio,location,links } = req.body;

  let parsedLinks = {};
try {
  parsedLinks = typeof links === "string" ? JSON.parse(links) : links;
} catch (err) {
  console.warn("Could not parse links:", links);
}

  try {
    const updated = await User.findByIdAndUpdate(
      userId,
      {
        name,
        age,
        college,
        goal,
        bio,
        location,
        profilePicture: req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : undefined,
        links:parsedLinks,
        interests: typeof interests === "string"
          ? interests.split(",").map(i => i.trim())
          : interests,
        profileCompleted: true
      },
      { new: true }
    );

    res.status(200).json({ message: "Profile updated", user: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /remove-career
router.delete("/remove-career", requireAuth, async (req, res) => {
  const userId = req.user._id;
  const { careerId } = req.body;

  if (!careerId) {
    return res.status(400).json({ message: "Career ID is required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.savedCareers = user.savedCareers.filter(
      (id) => id.toString() !== careerId
    );

    await user.save();
    const updatedUser = await User.findById(userId).select("-password").populate("savedCareers");

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error("Remove Career Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/add-career", requireAuth, async (req, res) => {
  const userId = req.user._id;
  const { careerId } = req.body;
//  console.log(userId)
  if (!careerId) {
    return res.status(400).json({ message: "Career ID is required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.savedCareers.includes(careerId)) {
      return res.status(400).json({ message: "Career already added" });
    }

    user.savedCareers.push(careerId);
    await user.save();
    const updatedUser = await User.findById(userId).select("-password").populate("savedCareers");

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Add Career Error:", error.message, error.stack);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST: Update progress (resources + milestones)
router.post('/progress/update', requireAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { careerId, completedResources, completedMilestones } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let existingProgress = user.progress.find(
      (p) => p.careerId.toString() === careerId
    );

    if (existingProgress) {
      existingProgress.completedResources = completedResources || [];
      existingProgress.completedMilestones = completedMilestones || [];
    } else {
      user.progress.push({
        careerId,
        completedResources: completedResources || [],
        completedMilestones: completedMilestones || [],
      });
    }

    await user.save();
    res.json({ message: 'Progress updated', progress: user.progress });
  } catch (err) {
    console.error('Error updating progress:', err);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// ✅ GET: Fetch progress (resources + milestones) for one career
router.get('/progress/:careerId', requireAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { careerId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const progress = user.progress.find(
      (p) => p.careerId.toString() === careerId
    );

    res.json({
      completedResources: progress?.completedResources || [],
      completedMilestones: progress?.completedMilestones || [],
    });
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ PATCH: Optional per-resource update (no milestone support here)
router.patch('/update-progress', requireAuth, async (req, res) => {
  const { careerId, resourceIndex, completed } = req.body;

  if (!careerId || resourceIndex === undefined || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Missing or invalid data' });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const savedCareer = user.savedCareers.find(
      (c) => c._id.toString() === careerId
    );
    if (!savedCareer) {
      return res.status(404).json({ error: 'Career not saved by user' });
    }

    if (!savedCareer.progress || !Array.isArray(savedCareer.progress)) {
      savedCareer.progress = [];
    }

    const careerData = await CareerPath.findById(careerId);
    const totalResources = careerData?.resources?.length || 0;
    while (savedCareer.progress.length < totalResources) {
      savedCareer.progress.push(false);
    }

    savedCareer.progress[resourceIndex] = completed;

    await user.save();
    res.json({ message: 'Progress updated', progress: savedCareer.progress });
  } catch (err) {
    console.error('Progress update error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;