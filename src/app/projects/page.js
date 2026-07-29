'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import PageLayout from '@/components/page-layout';
import SectionContainer from '@/components/section-container';
import AnimatedCard from '@/components/animated-card';
import GradientText from '@/components/gradient-text';
import { fadeInUp, ANIMATION_DELAYS } from '@/lib/animations';
import { projects } from '@/lib/data';

export default function Projects() {
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
            <GradientText variant="purple">
              Projects
            </GradientText>
          </h1>
        </motion.div>


        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {projects.map((project) => (
              <AnimatedCard
                key={project.id}
                delay={0}
                variant="glass"
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
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {project.description}
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
