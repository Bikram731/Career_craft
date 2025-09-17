import React, { useState,useContext } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {jwtDecode} from "jwt-decode";
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }
      else{
      localStorage.setItem('token', data.token);
      const decoded = jwtDecode(data.token);
      // console.log("Decoded JWT:", decoded);
      dispatch({ type: "LOGIN", payload: { ...data.user,token: data.token, } });
      // console.log(data.user.profileCompleted)
      toast.success("Login successful 🎉");
      console.log(data.user.profileCompleted)
      if (data.user.profileCompleted) {
        navigate("/dashboard");
      } else {
        navigate("/setup-profile");  // <-- this happens if profile is incomplete
      }

      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-emerald-800 via-indigo-900 to-slate-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-xl shadow-xl w-full max-w-md "
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-400">
          Login to CareerCraft
        </h2>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded border focus:outline-none"
          required
        />

        {/* 👁 Password input with eye toggle */}
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 pr-9 rounded border focus:outline-none"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition duration-200"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Don't have an account?
          <Link to="/register" className="text-indigo-600 hover:underline ml-1">Register</Link>
        </p>
      </form>
    </div>
  );
}