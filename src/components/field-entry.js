'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Annotation from './annotation';
import TraceReplay from './trace-replay';

export default function FieldEntry({ project, index }) {
  const isPremium = project.tier === 'premium';

  return (
    <article
      className={`field-entry ${isPremium ? 'bg-code-bg/50 -mx-4 md:-mx-6 px-4 md:px-6 py-8 rounded-md border border-ink/5' : ''} ${index > 0 ? 'border-t border-ink/10 pt-10' : ''}`}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.logo && (
              <Image
                src={project.logo}
                alt=""
                width={28}
                height={28}
                className="rounded-none object-contain"
              />
            )}
            <div>
              <h3 className="font-heading text-xl font-semibold text-ink">
                {project.title}
              </h3>
              <p className="text-sm text-muted mt-0.5">{project.subtitle}</p>
            </div>
          </div>
          {/* Links */}
          <div className="flex gap-2 shrink-0">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-ink hover:underline"
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
              className="text-xs font-mono px-2 py-0.5 rounded-none bg-code-bg text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project image */}
      {project.image && (
        <div className="relative w-full h-48 sm:h-56 mb-4 rounded-none overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
      )}

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
        <div className="mt-5 lg:grid lg:grid-cols-[1fr_200px] lg:gap-6">
          <div>
            <p className="text-xs font-mono text-muted/60 uppercase tracking-wider mb-2 lg:hidden">
              Field notes
            </p>
          </div>
          <div className="space-y-2 lg:col-start-2 lg:row-start-1">
            <p className="text-xs font-mono text-muted/60 uppercase tracking-wider mb-2 hidden lg:block">
              Field notes
            </p>
            {project.annotations.map((note, i) => (
              <Annotation key={i} note={note} />
            ))}
          </div>
          {/* On mobile, annotations go inline */}
          <div className="space-y-2 lg:hidden">
            {project.annotations.map((note, i) => (
              <Annotation key={`mobile-${i}`} note={note} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
