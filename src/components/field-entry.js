'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Annotation from './annotation';
import TraceReplay from './trace-replay';

export default function FieldEntry({ project, index }) {
  const isPremium = project.tier === 'premium';

  return (
    <motion.article
      className={`field-entry ${isPremium ? 'bg-code-bg/50 -mx-4 md:-mx-6 px-4 md:px-6 py-8 rounded-lg' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">
              {project.title}
            </h3>
            <p className="text-sm text-muted mt-0.5">{project.subtitle}</p>
          </div>
          {/* Links */}
          <div className="flex gap-2 shrink-0">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-terracotta hover:underline"
              >
                Live <ArrowUpRight size={12} />
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-ink"
              >
                Source <ArrowUpRight size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-0.5 rounded bg-code-bg text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-ink/80 leading-relaxed mb-4 max-w-prose">
        {project.description}
      </p>

      {/* Trace Replay (premium tier only) */}
      {isPremium && <TraceReplay />}

      {/* Impact */}
      {project.impact && (
        <ul className="space-y-1.5 mb-5">
          {project.impact.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
              <span className="text-sage mt-0.5 shrink-0">▸</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Annotations (the signature element) */}
      {project.annotations && project.annotations.length > 0 && (
        <div className={`mt-5 ${isPremium ? '' : ''}`}>
          <p className="text-xs font-mono text-muted/60 uppercase tracking-wider mb-2">
            Field notes
          </p>
          <div className="space-y-2">
            {project.annotations.map((note, i) => (
              <Annotation key={i} note={note} />
            ))}
          </div>
        </div>
      )}

      {/* Bottom border for non-last items */}
      <div className="mt-10 h-px bg-ink/5" />
    </motion.article>
  );
}
