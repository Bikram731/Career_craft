# 🚀 CareerCraft: Your AI-Powered Career Navigator

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

**CareerCraft** is a comprehensive, full-stack platform designed to help users discover, track, and achieve their career goals. By leveraging fuzzy search algorithms, custom matching logic, and role-based access control, CareerCraft provides personalized roadmaps and curated resources for software developers, analysts, and competitive exam aspirants.

---

## ✨ Key Features

### 🎯 For Users
* **Smart Career Recommendations:** A custom algorithm calculates a "Match Score" based on user interests, goals, and fuzzy text matching (`Fuse.js`).
* **Interactive Progress Tracking:** Users can save careers and track their journey through specific resources and milestones, visualized with dynamic Donut Charts (`Chart.js`).
* **Career Comparison:** A side-by-side comparison modal to evaluate multiple career paths based on difficulty, resources, and requirements.
* **Live Job Fetching:** Integrated with RapidAPI (JSearch) to fetch real-time, relevant job postings based on the selected career path.
* **Secure Profile Management:** Secure JWT-based authentication with Bcrypt password hashing, rigorous regex-based password strength validation, and Multer-powered profile image uploads.

### 🛡️ For Admins
* **Role-Based Access Control (RBAC):** Dedicated Admin Dashboard protected by custom middleware to prevent unauthorized data manipulation.
* **Dynamic Content Management:** Admins can Create, Read, Update, and Delete (CRUD) career paths, resources, and milestones directly from the UI.

---

## 🛠️ Tech Stack & Architecture

### **Frontend (Client-Side)**
* **React.js** (Functional Components, Hooks, Context API for global state management)
* **Tailwind CSS** (Responsive, utility-first styling)
* **Framer Motion** (Smooth scroll animations and transitions)
* **React Router Dom** (Client-side routing and protected routes)
* **React-Chartjs-2** (Data visualization)

### **Backend (Server-Side)**
* **Node.js & Express.js** (RESTful API architecture)
* **MongoDB & Mongoose** (NoSQL database modeling, complex schema referencing, and population)
* **JSON Web Tokens (JWT)** (Stateless, secure session management)
* **Bcrypt.js** (Cryptographic password hashing)
* **Multer** (Multipart/form-data handling for local file uploads)
* **Fuse.js** (Lightweight fuzzy-search for rapid, typo-tolerant querying)

---

## 🧠 Engineering Highlights

* **Optimized Search:** Implemented a hybrid search strategy. The backend uses MongoDB to filter hard constraints (e.g., Level, Category) to reduce the search space, followed by `Fuse.js` for in-memory fuzzy text matching on the reduced dataset.
* **Deep Array Manipulation:** Engineered complex MongoDB updates to handle nested progress arrays, allowing users to independently toggle completion status for specific nested resources and milestones without overwriting data.
* **Security First:** Enforced strict API protection using a custom `requireAuth` middleware to verify Bearer tokens, coupled with an `isAdmin` middleware layer to restrict destructive endpoints. 

---

## 💻 Running the Project Locally

### Prerequisites
* Node.js (v16+)
* MongoDB (Local instance or MongoDB Atlas URI)

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/careercraft.git](https://github.com/YOUR_USERNAME/careercraft.git)
cd careercraft
