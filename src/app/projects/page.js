'use client';
import { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, CardActions, Button, Typography, Chip } from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, Database, Palette, Server, Brain, BarChart3 } from 'lucide-react';

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Banking Web Application", 
      description: "A comprehensive full-stack application demonstrating CRUD operations for bank clients with modern UI/UX design and secure authentication.",
      detailedDescription: "Built a complete banking system with client management, transaction tracking, and secure user authentication. Features responsive design and follows banking security best practices.",
      technologies: ['ReactJS', 'Java', 'Spring Boot', 'MySQL', 'HTML', 'CSS'],
      category: 'Full-Stack',
      image: '/bank_app.jpg', 
      github: 'https://github.com/aerinng/neueda-fe-project',
      metrics: { duration: '3 months', team: '2 people', lines: '5000+' },
      difficulty: 'Intermediate'
    }, 
    {
      id: 2,
      title: "AI Portfolio Decarbonization Analysis", 
      description: "Advanced NLP research project analyzing decarbonization strategies across Asian financial institutions using cutting-edge AI techniques.", 
      detailedDescription: "Leveraged natural language processing to extract and analyze sustainability commitments from financial reports. Built sentiment analysis models and trend prediction algorithms.",
      technologies: ['Python', 'NLP', 'Machine Learning', 'Pandas', 'scikit-learn', 'NLTK'],
      category: 'AI/ML Research',
      image: '/portfolio_decarbonization.png', 
      github: 'https://github.com/cl-xy/bt4103_esg',
      metrics: { duration: '6 months', team: '4 people', lines: '8000+' },
      difficulty: 'Advanced'
    }, 
  ];

  // Extract all unique technologies with enhanced metadata
  const techStack = {
    'ReactJS': { category: 'Frontend', color: 'from-blue-400 to-cyan-400', icon: Code },
    'Java': { category: 'Backend', color: 'from-orange-400 to-red-400', icon: Server },
    'Spring Boot': { category: 'Backend', color: 'from-green-400 to-emerald-400', icon: Server },
    'MySQL': { category: 'Database', color: 'from-blue-500 to-indigo-500', icon: Database },
    'HTML': { category: 'Frontend', color: 'from-orange-300 to-orange-400', icon: Code },
    'CSS': { category: 'Frontend', color: 'from-blue-300 to-purple-400', icon: Palette },
    'Python': { category: 'Programming', color: 'from-yellow-400 to-yellow-500', icon: Code },
    'NLP': { category: 'AI/ML', color: 'from-purple-400 to-pink-400', icon: Brain },
    'Machine Learning': { category: 'AI/ML', color: 'from-purple-500 to-purple-600', icon: Brain },
    'Pandas': { category: 'Data Science', color: 'from-green-400 to-green-500', icon: BarChart3 },
    'scikit-learn': { category: 'AI/ML', color: 'from-indigo-400 to-purple-500', icon: Brain },
    'NLTK': { category: 'AI/ML', color: 'from-pink-400 to-rose-400', icon: Brain }
  };

  const categoryColors = {
    'Frontend': 'from-blue-100 to-cyan-100 border-blue-300',
    'Backend': 'from-green-100 to-emerald-100 border-green-300',
    'Database': 'from-indigo-100 to-blue-100 border-indigo-300',
    'Programming': 'from-yellow-100 to-amber-100 border-yellow-300',
    'AI/ML': 'from-purple-100 to-pink-100 border-purple-300',
    'Data Science': 'from-emerald-100 to-green-100 border-emerald-300'
  };

  const getProjectsUsingTech = (tech) => {
    return projects.filter(project => project.technologies.includes(tech));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 relative">
        <div className="container relative z-10 mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent">
              Projects
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="backdrop-blur-sm bg-white/90 rounded-3xl shadow-xl border border-white/20 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                    {project.category}
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <div
                          key={tech}
                          className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Github size={18} />
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/2 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 py-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent">
            Projects
          </h1>
        </motion.div>


        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative backdrop-blur-sm bg-white/90 rounded-3xl shadow-xl border border-white/20 overflow-hidden transition-all duration-500 ${
                  hoveredProject === project.id ? 'shadow-2xl scale-[1.02]' : 'hover:shadow-2xl'
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                    {project.category}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {hoveredProject === project.id ? project.detailedDescription : project.description}
                    </p>
                  </div>


                  {/* Technology Stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => {
                        const techData = techStack[tech];
                        return (
                          <motion.div
                            key={tech}
                            className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: techIndex * 0.05 }}
                          >
                            {tech}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} />
                      View Code
                    </motion.a>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}