# 🚀 CareerCraft

**CareerCraft** is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to guide students and professionals through personalized career roadmaps. It features intelligent recommendations, progress tracking, and resource management to help users master new skills effectively.

---

## ✨ Key Features

### 🔐 Authentication & Security
* **Secure Auth:** JWT-based stateless authentication with bcrypt password hashing.
* **Role-Based Access Control (RBAC):** Admin-only dashboards to manage career paths and resources.
* **Protected Routes:** Middleware to secure sensitive endpoints and user data.

### 🧠 Intelligent Recommendation Engine
* **Fuzzy Logic Search:** Implemented **Fuse.js** to provide typo-tolerant search and personalized career suggestions based on user interests.
* **Dynamic Filtering:** Filter careers by difficulty level, category, and popularity.

### 📊 Interactive Dashboard & Progress Tracking
* **Granular Tracking:** Users can mark individual resources and milestones as "Completed".
* **Visual Analytics:** Real-time **Donut Charts** visualize completion rates for every enrolled career path.
* **Career Comparison:** Compare two career paths side-by-side to evaluate requirements and resources.

### 🛠 Admin Capabilities
* **Content Management:** Admins can Create, Read, Update, and Delete (CRUD) career paths, milestones, and learning resources.
* **User Insights:** View platform usage and manage content delivery.

---

## 🛠 Tech Stack

### **Frontend**
* **React.js:** Component-based UI architecture.
* **Tailwind CSS:** Responsive and modern styling.
* **Framer Motion / AOS:** Smooth animations and scroll effects.
* **Chart.js:** Data visualization for user progress.
* **Context API:** Global state management for Authentication.

### **Backend**
* **Node.js & Express.js:** RESTful API architecture.
* **MongoDB & Mongoose:** NoSQL database with normalized schemas for Users and Career Paths.
* **Multer:** Handling file uploads (Profile Pictures).
* **Fuse.js:** In-memory fuzzy search algorithm.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v14+)
* MongoDB (Local or Atlas)

### 1. Clone the Repository
```bash
git clone [https://github.com/Bikram731/careercraft.git](https://github.com/Bikram731/careercraft.git)
cd careercraft
