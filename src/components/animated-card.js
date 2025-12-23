'use client';
import { motion } from 'framer-motion';

/**
 * AnimatedCard - Reusable card component with hover effects and animations
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {number} props.delay - Animation delay in seconds
 * @param {Function} props.onHoverStart - Callback when hover starts
 * @param {Function} props.onHoverEnd - Callback when hover ends
 * @param {boolean} props.isHovered - External hover state
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.hoverClassName - Classes to apply on hover
 * @param {string} props.variant - Card style variant ('default', 'glass', 'solid')
 */
export default function AnimatedCard({
  children,
  delay = 0,
  onHoverStart,
  onHoverEnd,
  isHovered = false,
  className = '',
  hoverClassName = 'shadow-2xl scale-[1.02]',
  variant = 'glass'
}) {
  const variants = {
    default: 'bg-white rounded-3xl shadow-xl border border-gray-200',
    glass: 'backdrop-blur-sm bg-white/90 rounded-3xl shadow-xl border border-white/20',
    solid: 'bg-white rounded-3xl shadow-xl'
  };

  const baseClasses = variants[variant] || variants.glass;
  const hoverClasses = isHovered ? hoverClassName : 'hover:shadow-2xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`${baseClasses} ${hoverClasses} transition-all duration-300 ${className}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
}
