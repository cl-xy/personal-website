'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight, X } from 'lucide-react';
import { siteConfig, projects } from '@/lib/data';

export default function RecruiterView({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-trace-bg/95 backdrop-blur-sm overflow-y-auto"
    >
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-12 sm:py-20 font-sans">
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 p-2 text-trace-muted hover:text-trace-text transition-colors"
          aria-label="Close summary view"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-trace-text tracking-tight mb-2">
            {siteConfig.name}
          </h1>
          <p className="text-lg text-trace-muted">
            {siteConfig.role} · {siteConfig.location}
          </p>
          <p className="text-trace-text/70 mt-4 leading-relaxed max-w-lg">
            I ship AI systems, then publish what broke. Currently at Citi building LLM agents,
            RAG pipelines, and full-stack AI services.
          </p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Hours/yr saved', value: '7,000' },
            { label: 'Systems deployed', value: '4' },
            { label: 'Agent architectures', value: '3' },
            { label: 'Capstone grade', value: 'Distinction' },
          ].map((metric) => (
            <div
              key={metric.label}
              className="bg-trace-surface border border-trace-border rounded-lg p-4"
            >
              <div className="text-xl sm:text-2xl font-bold text-trace-text font-mono">
                {metric.value}
              </div>
              <div className="text-xs text-trace-muted mt-1">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-trace-text mb-4">
            Key Projects
          </h2>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="bg-trace-surface border border-trace-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-trace-text">{project.title}</h3>
                    <p className="text-sm text-trace-muted mt-1">
                      {project.subtitle}
                    </p>
                  </div>
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-trace-blue hover:text-trace-blue/80 transition-colors shrink-0"
                      aria-label={`View ${project.title} live`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2 py-0.5 bg-trace-border/30 text-trace-muted rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-trace-text mb-4">Contact</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm text-trace-text hover:text-trace-blue transition-colors"
            >
              <Mail size={16} />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-trace-text hover:text-trace-blue transition-colors"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-trace-text hover:text-trace-blue transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </div>

        {/* Back to trace */}
        <button
          onClick={onClose}
          className="text-sm text-trace-muted hover:text-trace-text transition-colors font-mono"
        >
          ← back to trace
        </button>
      </div>
    </motion.div>
  );
}
