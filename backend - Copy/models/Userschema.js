const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: {
  type: Boolean,
  default: false,
  },  // hashed password later
  createdAt: { type: Date, default: Date.now },
  age: Number,
  college: String,
  interests: [String],
  goal: String,
  savedCareers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'temp' }
  ],
  profilePicture: {
  type: String,
  default: "",
  },
  bio: {
  type: String,
  default: "",
  },
  location: {
  type: String,
  default: "",
  },
  progress: [
  {
    careerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerPath',
      required: true
    },
    completedResources: [Number],
    completedMilestones: [Number], // array of resource indices
  }
  ],
  links: {
  linkedin: { type: String, default: "" },
  portfolio: { type: String, default: "" },
  },
  profileCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);