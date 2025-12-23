'use client';

/**
 * SectionContainer - Reusable container component with consistent spacing and max-width
 */
export default function SectionContainer({
  children,
  maxWidth = '5xl', // 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'
  padding = 'px-6 py-16',
  className = ''
}) {
  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  };

  const maxWidthClass = maxWidthClasses[maxWidth] || maxWidthClasses['5xl'];

  return (
    <section className={`${maxWidthClass} mx-auto ${padding} ${className}`}>
      {children}
    </section>
  );
}
