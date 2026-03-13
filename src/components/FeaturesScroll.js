import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const howItems = [
  {
    icon: "👤",
    title: "Create Your Profile",
    desc: "Sign up and tell us your background, interests, and goals.",
  },
  {
    icon: "🔍",
    title: "Explore Career Paths",
    desc: "Smart suggestions tailored to your stream and ambition.",
  },
  {
    icon: "🧭",
    title: "Get Roadmap",
    desc: "We generate a customized career roadmap for you.",
  },
];

const whyItems = [
  {
    icon: "🚀",
    title: "Personalized Roadmap",
    desc: "Your journey, your way — mapped just for you.",
    link: "/learn-more/personalized-roadmap",
  },
  {
    icon: "📈",
    title: "Track Your Growth",
    desc: "See your progress unfold, step by step.",
    link: "/learn-more/track-growth",
  },
  {
    icon: "🤖",
    title: "AI-Powered Suggestions",
    desc: "Let smart tech guide your next career move.",
    link: "/learn-more/ai-suggestions",
  },
  {
    icon: "🧠",
    title: "Built by Experts",
    desc: "Crafted with care by top-tier minds in tech.",
    link: "/learn-more/built-by-experts",
  },
];

const ScrollStrip = ({ items, title }) => {
  const [speed, setSpeed] = useState(40); // default scroll duration in seconds
  const containerRef = useRef();

  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-6 text-center font-['Orbitron']">{title}</h2>
      <div
        className="overflow-hidden relative"
        onMouseEnter={() => setSpeed(80)} // slows down on hover
        onMouseLeave={() => setSpeed(40)}
        ref={containerRef}
      >
        <motion.div
          className="flex gap-6 w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: speed,
          }}
        >
          {[...items, ...items].map((item, idx) => (
            <div
              key={idx}
              className="min-w-[250px] bg-[#2d2d2d] p-6 rounded-xl text-white shrink-0 hover:scale-105 transition-transform h-[200px] flex flex-col justify-between"
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
              {item.link && (
                <Link
                  to={item.link}
                  className="mt-2 text-orange-400 hover:text-indigo-500 text-sm"
                >
                  Learn More →
                </Link>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function HowWhyScroll() {
  return (
    <section className="bg-black text-white py-40 px-6 md:px-20 border-t-2 border-[#2d2d2d]">
      <ScrollStrip items={howItems} title="How It Works" />
      <ScrollStrip items={whyItems} title="Why Choose Us?" />
    </section>
  );
}