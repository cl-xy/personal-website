'use client';

import { ArrowUpRight } from 'lucide-react';
import TraceReplay from './trace-replay';

function IncidentBlock({ failure, index }) {
  return (
    <div className="incident-block">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-xs font-mono text-incident font-bold shrink-0 mt-0.5">
          INCIDENT {index + 1}
        </span>
      </div>
      <p className="text-sm font-heading font-semibold text-ink leading-snug mb-4">
        {failure.what}
      </p>
      <div className="space-y-3 text-sm">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-incident/70 block mb-0.5">
            Symptom
          </span>
          <p className="text-ink/70 leading-relaxed">
            {failure.symptom}
          </p>
        </div>
      </div>
    </div>
  );
}

function FixBlock({ failure }) {
  return (
    <div className="fix-block">
      <span className="text-[10px] font-mono uppercase tracking-widest text-fix block mb-1">
        Resolution
      </span>
      <p className="text-sm text-ink/80 leading-relaxed">
        {failure.fix}
      </p>
      <p className="text-xs font-mono text-muted mt-3 italic leading-relaxed">
        ↳ {failure.lesson}
      </p>
    </div>
  );
}

function IncidentPair({ failure, index }) {
  return (
    <div className="relative">
      {/* Timeline connector */}
      <div className="absolute left-6 top-0 bottom-0 w-px border-l border-dashed border-border hidden sm:block" />

      <IncidentBlock failure={failure} index={index} />
      <div className="ml-0 sm:ml-8 mt-3">
        <FixBlock failure={failure} />
      </div>
    </div>
  );
}

export default function FieldEntry({ project, index }) {
  const isPremium = project.tier === 'premium';

  return (
    <article className={`${index > 0 ? 'border-t border-border pt-12 mt-12' : ''}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.logo && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={project.logo} alt="" width={28} height={28} className="object-contain" />
            )}
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-ink tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm text-muted mt-0.5">{project.subtitle}</p>
            </div>
          </div>
          {/* Links */}
          <div className="flex gap-3 shrink-0">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-ink hover:text-incident transition-colors"
              >
                Live <ArrowUpRight size={12} />
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-ink transition-colors"
              >
                Source <ArrowUpRight size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 bg-paper text-muted border border-border"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project image */}
      {project.image && (
        <div className="relative w-full h-48 sm:h-56 mb-8 overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={`${project.title} screenshot`} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Objective */}
      <div className="mb-8">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted block mb-1.5">
          Objective
        </span>
        <p className="text-ink/80 leading-relaxed max-w-prose">
          {project.objective}
        </p>
      </div>

      {/* Trace Replay (premium tier only) */}
      {isPremium && (
        <div className="mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted block mb-3">
            Production trace (pre-recorded)
          </span>
          <TraceReplay />
        </div>
      )}

      {/* Incidents — THE PRIMARY CONTENT */}
      {project.failures && project.failures.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-incident font-bold">
              What broke
            </span>
            <span className="text-[10px] font-mono text-muted">
              — {project.failures.length} incident{project.failures.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="space-y-6">
            {project.failures.map((failure, i) => (
              <IncidentPair key={i} failure={failure} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Shipped — proof it worked */}
      {project.proof && (
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-fix font-bold block mb-3">
            Shipped
          </span>
          <ul className="space-y-2">
            {project.proof.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ink/70">
                <span className="shipped-badge shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
