import { useState, useContext, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import logo from '../assets/career-path.png';
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const searchRef = useRef(null);
  const closeTimerRef = useRef(null);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchText) params.append("q", searchText);
    if (level) params.append("level", level);
    if (category) params.append("category", category);
    navigate(`/explore-careers?${params.toString()}`);
    setIsSearchOpen(false);
  };

  const handleMouseEnter = () => {
    clearTimeout(closeTimerRef.current);
    setIsSearchOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setIsSearchOpen(false);
    }, 150); // delay prevents flickering
  };

  return (
    <>
      <nav className="w-full bg-gradient-to-r from-slate-800 via-indigo-900 to-emerald-800 text-white shadow-xl sticky top-0 z-50 font-[Work Sans]">
        <div className="w-full px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between relative">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4 min-w-[160px]">
            <img src={logo} alt="CareerCraft Logo" className="w-9 sm:w-20 h-12 object-contain drop-shadow-md" />
            <div className="flex flex-col">
              <span className="font-['Orbitron'] text-2xl sm:text-4xl font-extrabold tracking-wider text-orange-300 drop-shadow-md">
                CareerCraft
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            {/* ✅ Hover Search */}
            <div
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  <button className="p-2 ml-2 rounded hover:bg-slate-700 transition">
    <FaSearch className="text-white text-lg" />
  </button>
</div>

              {isSearchOpen && (
  <div
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    className="fixed top-[64px] left-0 w-screen z-40 bg-slate-900 px-6 py-6 shadow-2xl border-b border-slate-700"
  >
    <div className="w-full max-w-screen-md mx-auto flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="px-3 py-2 rounded bg-gray-800 text-white w-full"
      />
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="px-3 py-2 rounded bg-gray-800 text-white w-full"
      >
        <option value="">All Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 rounded bg-gray-800 text-white w-full"
      >
        <option value="">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Design">Design</option>
        <option value="Business">Business</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-indigo-600 text-white px-4 py-2 rounded self-end"
      >
        Search
      </button>
    </div>
  </div>
)}

            <Link to={user?.isAdmin ? "/admin" : "/home"} className="text-white hover:text-orange-300 transition duration-200">
              Home
            </Link>
            <Link to={user?.isAdmin ? "/admin" : "/dashboard"} className="text-white hover:text-orange-300 transition duration-200">
              Dashboard
            </Link>
            {user && (
              <Link to={user?.isAdmin ? "/admin" : "/profile"} className="text-white hover:text-orange-300 transition duration-200">
                Profile
              </Link>
            )}
            {!user ? (
              <Link to="/login" className="bg-orange-500 text-black px-10 py-1 rounded-lg hover:bg-orange-400 transition font-bold text-lg">
                Login
              </Link>
            ) : (
              <button onClick={handleLogout} className="bg-orange-500 text-black px-10 py-2 rounded-lg hover:bg-orange-400 transition font-bold">
                Logout
              </button>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="text-orange-300 hover:text-orange-500"
            >
              <FaSearch className="text-xl" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-yellow-400 focus:outline-none"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-slate-900 px-6 py-2 pb-4 space-y-2 text-sm font-sans">
            <Link to={user?.isAdmin ? "/admin" : "/home"} className="block bg-orange-400 rounded px-3 py-1 text-black hover:text-yellow-400">
              Home
            </Link>
            <Link to={user?.isAdmin ? "/admin" : "/dashboard"} className="block bg-orange-400 rounded px-3 py-1 text-black hover:text-yellow-400">
              Dashboard
            </Link>
            {user && (
              <Link to={user?.isAdmin ? "/admin" : "/profile"} className="block bg-orange-400 rounded px-3 py-1 text-black hover:text-yellow-400">
                Profile
              </Link>
            )}
            {!user ? (
              <Link to="/login" className="font-bold block bg-orange-500 rounded px-3 py-1 text-black hover:text-yellow-400">
                Login
              </Link>
            ) : (
              <button onClick={handleLogout} className="font-bold block bg-orange-500 rounded px-3 py-1 text-black hover:text-red-400">
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Optional overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 pointer-events-none"></div>
      )}
    </>
  );
}