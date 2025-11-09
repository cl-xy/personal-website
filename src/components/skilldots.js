'use client';
import { motion } from 'framer-motion';

const SkillDots = ({ skill, level }) => {
  const getDotCount = (skillLevel) => {
    switch (skillLevel.toLowerCase()) {
      case 'expert':
        return { filled: 3, total: 3 };
      case 'intermediate':
        return { filled: 2, total: 3 };
      case 'beginner':
        return { filled: 1, total: 3 };
      default:
        return { filled: 0, total: 3 };
    }
  };

  const getDotStyle = (dotIndex, skillLevel) => {
    const baseColors = {
      0: 'bg-gradient-to-r from-purple-300 to-purple-200', // First dot - lightest
      1: 'bg-gradient-to-r from-purple-400 to-purple-300', // Second dot - medium
      2: 'bg-gradient-to-r from-purple-500 to-purple-400', // Third dot - darkest
    };
    return baseColors[dotIndex] || 'bg-gray-300';
  };

  const { filled, total } = getDotCount(level);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
    >
      <span className="font-medium text-gray-800 flex-1">{skill}</span>
      <div className="flex items-center gap-1 ml-4">
        {[...Array(total)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.2 }}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index < filled
                ? `${getDotStyle(index, level)} border-0 shadow-sm`
                : 'bg-gray-100 border-2 border-gray-300'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SkillDots;