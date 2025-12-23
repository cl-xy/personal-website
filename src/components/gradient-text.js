'use client';

/**
 * GradientText - Reusable gradient text component
 */
export default function GradientText({
  children,
  from = 'gray-800',
  to = 'blue-600',
  className = ''
}) {
  return (
    <span className={`bg-gradient-to-r from-${from} to-${to} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}
