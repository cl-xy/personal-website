'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ACCENTS = {
  green: {
    border: 'border-green-500',
    hoverBg: 'bg-gradient-to-r from-green-50 to-emerald-50',
  },
  blue: {
    border: 'border-blue-500',
    hoverBg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
  },
};

/**
 * GradientHoverCard - Shared hoverable card shell used for resume
 * experience and education entries: gradient background, accent-colored
 * left border, and a scale/shadow lift on hover.
 */
export default function GradientHoverCard({ children, accent = 'green', delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const { border, hoverBg } = ACCENTS[accent] || ACCENTS.green;

  return (
    <motion.div
      className={`mb-8 p-8 rounded-xl bg-gradient-to-r from-white to-gray-50 border-l-4 ${border} transition-all duration-300 ${
        isHovered ? `shadow-xl ${hoverBg} transform scale-[1.02]` : 'shadow-lg hover:shadow-xl'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
