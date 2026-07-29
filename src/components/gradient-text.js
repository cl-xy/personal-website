'use client';

/**
 * GradientText - Reusable gradient text component
 *
 * Gradient classes must be listed as static literals so Tailwind's build-time
 * scanner can find them - it cannot detect classes assembled via string
 * interpolation (e.g. `from-${from}`).
 */
const GRADIENTS = {
  blue: 'from-gray-800 to-blue-600',
  purple: 'from-gray-800 to-purple-600',
};

export default function GradientText({
  children,
  variant = 'blue',
  className = ''
}) {
  const gradient = GRADIENTS[variant] || GRADIENTS.blue;

  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}
