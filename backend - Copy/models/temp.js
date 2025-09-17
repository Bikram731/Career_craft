const mongoose = require('mongoose');
const milestoneSchema = new mongoose.Schema({
  milestoneTitle: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true }
});

const careerPathSchema = new mongoose.Schema({
  title: String,
  description: String,
  skills: [String],
  resources: [
    {
      title: String,
      url: String,
      type: {type:String},
      completed:{ type: Boolean, default: false } // e.g., "video", "article", "book"
    }
  ],
  progressSteps: [
    {
      stepTitle: String,
      completed: { type: Boolean, default: false }
    }
  ],
  milestones: [milestoneSchema],
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String], // e.g., ["python", "ai", "machine learning"]
  isPopular: {
    type: Boolean,
    default: false,
  },
  views: {
  type: Number,
  default: 0,
  },
  level: String, // e.g., "Beginner", "Intermediate", "Advanced"
}, { timestamps: true });

module.exports = mongoose.models.temp || mongoose.model("temp", careerPathSchema);