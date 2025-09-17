const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage,limits: { fileSize: 10 * 1024 * 1024 }});

// Upload endpoint
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.status(200).json({ url: imageUrl });
});

module.exports = router;