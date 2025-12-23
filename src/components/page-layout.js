'use client';

/**
 * PageLayout - Reusable layout component with gradient background and floating elements
 * Used across Home, About, and Projects pages for consistent styling
 */
export default function PageLayout({
  children,
  variant = 'default', // 'default', 'home', 'about', 'projects'
  className = ''
}) {
  const gradients = {
    default: 'from-slate-50 via-blue-50 to-indigo-50',
    home: 'from-slate-50 via-blue-50 to-indigo-50',
    about: 'from-blue-50 via-indigo-50 to-purple-50',
    projects: 'from-slate-50 via-purple-50 to-indigo-50'
  };

  const floatingElements = {
    default: [
      { color: 'bg-blue-200', position: 'top-1/4 left-1/4', size: 'w-64 h-64', delay: '' },
      { color: 'bg-purple-200', position: 'top-3/4 right-1/4', size: 'w-72 h-72', delay: 'delay-1000' },
      { color: 'bg-pink-200', position: 'top-1/2 left-1/2', size: 'w-80 h-80', delay: 'delay-2000' }
    ],
    home: [
      { color: 'bg-blue-200', position: 'top-1/4 left-1/4', size: 'w-64 h-64', delay: '' },
      { color: 'bg-purple-200', position: 'top-3/4 right-1/4', size: 'w-72 h-72', delay: 'delay-1000' },
      { color: 'bg-pink-200', position: 'top-1/2 left-1/2', size: 'w-80 h-80', delay: 'delay-2000' }
    ],
    about: [
      { color: 'bg-blue-300', position: 'top-1/6 right-1/6', size: 'w-40 h-40', delay: '' },
      { color: 'bg-purple-300', position: 'bottom-1/4 left-1/6', size: 'w-48 h-48', delay: 'delay-1000' },
      { color: 'bg-pink-300', position: 'top-1/2 right-1/3', size: 'w-32 h-32', delay: 'delay-2000' }
    ],
    projects: [
      { color: 'bg-purple-300', position: 'top-1/4 right-1/4', size: 'w-48 h-48', delay: '' },
      { color: 'bg-blue-300', position: 'bottom-1/3 left-1/4', size: 'w-64 h-64', delay: 'delay-1000' },
      { color: 'bg-pink-300', position: 'top-1/2 right-1/2', size: 'w-40 h-40', delay: 'delay-2000' }
    ]
  };

  const gradient = gradients[variant] || gradients.default;
  const elements = floatingElements[variant] || floatingElements.default;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} relative ${className}`}>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {elements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.position} ${element.size} ${element.color} rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse ${element.delay}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
