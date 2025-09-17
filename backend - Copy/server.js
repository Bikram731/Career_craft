const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require('./routes/authen');
const profileRoutes = require("./routes/profile");
const dummyCareers = require("./utils/dummyCareers");
const CareerPath = require("./models/temp");
const tempRoutes = require('./routes/careerPaths');
const uploadRoutes = require("./routes/upload");
const fs = require("fs"); 
const jobRoutes = require('./routes/jobs');

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

dotenv.config();

const app = express();
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/careerpaths', require('./routes/careerPaths'));
app.use("/api/user/profile", profileRoutes);
app.use('/api/careers', tempRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));
app.use('/api/jobs', jobRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  const existing = await CareerPath.find();
  await CareerPath.deleteMany({})
  await CareerPath.insertMany(dummyCareers);
  console.log("Inserted dummy careers ✅");
  // console.log("Dummy careers inserted ✅");
  // mongoose.disconnect();
})
.catch(err => console.error("MongoDB connection error:", err));
// Test route
// app.get("/", (req, res) => {
//   res.send("CareerCraft backend is running 🚀");
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});