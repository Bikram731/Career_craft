import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxBox({ children, offset = 50 }) {
  const ref = useRef(null);

  // Scroll position relative to this box
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // start animating when element enters
  });

  // Move the element upward slightly as user scrolls
  const y = useTransform(scrollYProgress, [0, 1], [0, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className="will-change-transform">
      {children}
    </motion.div>
  );
}