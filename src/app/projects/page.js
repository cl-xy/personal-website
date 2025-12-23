'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import PageLayout from '@/components/page-layout';
import SectionContainer from '@/components/section-container';
import AnimatedCard from '@/components/animated-card';
import GradientText from '@/components/gradient-text';
import { fadeInUp, ANIMATION_DELAYS } from '@/lib/animations';

export default function Projects() {
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

  if (!mounted) {
    return (
      <PageLayout variant="projects">
        <SectionContainer>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold">
              <GradientText from="gray-800" to="purple-600">
                Projects
              </GradientText>
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="backdrop-blur-sm bg-white/90 rounded-3xl shadow-xl border border-white/20 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
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
        </SectionContainer>
      </PageLayout>
    );
  }

  return (
    <PageLayout variant="projects">
      <SectionContainer>
        {/* Header */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.8, delay: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold">
            <GradientText from="gray-800" to="purple-600">
              Projects
            </GradientText>
          </h1>
        </motion.div>


        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {projects.map((project, index) => (
              <AnimatedCard
                key={project.id}
                delay={index * 0.1}
                variant="glass"
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                isHovered={hoveredProject === project.id}
                className="group overflow-hidden"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: techIndex * 0.05 }}
                        >
                          {tech}
                        </motion.div>
                      ))}
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
              </AnimatedCard>
            ))}
          </AnimatePresence>
        </div>
      </SectionContainer>
    </PageLayout>
  );
}