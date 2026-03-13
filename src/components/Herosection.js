import React from "react";
import heroImage2 from '../assets/handsome-man-working-with-laptop.jpg';
import backgroundVideo from "../assets/istockphoto-1491463133-640_adpp_is.mp4";
import { Parallax } from 'react-scroll-parallax';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r py-20 sm:py-28 md:py-36 lg:py-44 px-4 sm:px-6 md:px-20 -mt-2 overflow-hidden">
      {/* ✅ Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-70 z-0" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
        
        {/* Left Text Content */}
        <div className="w-full max-w-xl text-left flex flex-col items-start">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-['Orbitron'] text-orange-300 leading-tight">
            Your Dream Career Starts Here 🚀
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-300">
            Explore curated career paths, track your progress, and access the best resources to fuel your future.
          </p>
          <button className="mt-6 bg-orange-400 hover:bg-indigo-500 text-black font-semibold px-6 py-2 rounded-md transition">
            Start Exploring
          </button>
        </div>

        {/* Right Image with Parallax but aligned correctly */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Parallax speed={30}>
            <img
              src={heroImage2}
              alt="Hero Illustration"
              className="max-w-full h-auto object-contain rounded-xl shadow-lg"
            />
          </Parallax>
        </div>
      </div>
    </div>
  );
}