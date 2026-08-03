'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import TraceReplay from './trace-replay';

function FailureEntry({ failure, index }) {
  return (
    <div className="border-l-2 border-terracotta/40 pl-4 py-3">
      <div className="flex items-start gap-2 mb-1.5">
        <span className="text-[11px] font-mono text-terracotta/70 shrink-0 mt-0.5">
          #{index + 1}
        </span>
        <p className="text-sm font-medium text-ink leading-snug">
          {failure.what}
        </p>
      </div>
      <div className="ml-5 space-y-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted/60">
            Symptom
          </span>
          <p className="text-xs text-ink/60 leading-relaxed mt-0.5">
            {failure.symptom}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-sage">
            Fix
          </span>
          <p className="text-xs text-ink/70 leading-relaxed mt-0.5">
            {failure.fix}
          </p>
        </div>
        <div className="bg-code-bg px-3 py-2 border-l border-ink/10">
          <p className="text-xs font-mono text-ink/60 leading-relaxed italic">
            {failure.lesson}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FieldEntry({ project, index }) {
  const isPremium = project.tier === 'premium';

  return (
    <article
      className={`field-entry ${index > 0 ? 'border-t border-ink/10 pt-10 mt-10' : ''}`}
    >
      {/* Header */}
      <div className="mb-6">
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
              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-ink">
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
        <div className="relative w-full h-48 sm:h-56 mb-6 rounded-none overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
      )}

      {/* Objective */}
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-wider text-muted/50 mb-1">
          Objective
        </p>
        <p className="text-ink/80 leading-relaxed max-w-prose">
          {project.objective}
        </p>
      </div>

      {/* Trace Replay (premium tier only) — before failures */}
      {isPremium && (
        <div className="mb-6">
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted/50 mb-2">
            Live trace (pre-recorded production run)
          </p>
          <TraceReplay />
        </div>
      )}

      {/* Failures — THE PRIMARY CONTENT */}
      {project.failures && project.failures.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] font-mono uppercase tracking-wider text-terracotta/70 mb-3">
            What broke
          </p>
          <div className="space-y-4">
            {project.failures.map((failure, i) => (
              <FailureEntry key={i} failure={failure} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Proof — shipped outcomes */}
      {project.proof && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-sage mb-2">
            Shipped
          </p>
          <ul className="space-y-1.5">
            {project.proof.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                <span className="text-sage mt-0.5 shrink-0">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
