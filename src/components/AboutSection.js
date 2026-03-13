import React from 'react';
import ScrollBox from "./ScrollBox";
import ParallaxBox from "./ParallaxBox";
import { Parallax } from 'react-scroll-parallax';

export default function AboutSection() {
  return (
    <div className="bg-black bg-opacity-90 text-white px-6 md:px-20 py-16 border-t-2 border-orange-300">
      {/* About Text Section */}
      <ScrollBox>
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-300 mb-4 font-['Orbitron']">About CareerCraft</h2>
        <p className="text-base sm:text-lg text-gray-300">
          CareerCraft is your personalized platform to explore career paths, follow custom roadmaps, and unlock the resources that actually matter. Whether you dream of becoming a software developer, a data analyst, or preparing for GATE or UPSC — we’ve got you covered.
        </p>
      </div>
      </ScrollBox>

      {/* Feature Boxes */}
      <ScrollBox delay={0.1}>
          <Parallax speed={30}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div  className="bg-gradient-to-r from-slate-800 via-slate-700 to-emerald-900 p-6 rounded-xl shadow-md hover:shadow-orange-400 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-orange-400 mb-2 font-['Orbitron']">🎯 Personalized Paths</h3>
          <p className="text-gray-300">Follow custom career roadmaps tailored to your chosen field.</p>
        </div>

        <div  className="bg-gradient-to-r from-slate-800 via-slate-700 to-emerald-900 p-6 rounded-xl shadow-md hover:shadow-orange-400 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-orange-400 mb-2 font-['Orbitron']">📚 Curated Resources</h3>
          <p className="text-gray-300">Get only the best learning material, hand-picked for your goals.</p>
        </div>

        <div  className="bg-gradient-to-r from-slate-800 via-slate-700 to-emerald-900 p-6 rounded-xl shadow-md hover:shadow-orange-400 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-orange-400 mb-2 font-['Orbitron']">🧭 Real Guidance</h3>
          <p className="text-gray-300">No confusion — clear steps, progress tracking, and next actions.</p>
        </div>

        <div  className="bg-gradient-to-r from-slate-800 via-slate-700 to-emerald-900 p-6 rounded-xl shadow-md hover:shadow-orange-400 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-orange-400 mb-2 font-['Orbitron']">🌐 Diverse Careers</h3>
          <p className="text-gray-300">Explore roadmaps for software, UPSC, GATE, analytics, and more.</p>
        </div>
      </div>
      </Parallax>
      </ScrollBox>
    </div>
  );
}