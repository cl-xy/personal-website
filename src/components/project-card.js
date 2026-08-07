'use client';

import { useState } from 'react';

/**
 * ProjectCard — A flip card for the Projects room.
 * Front: project title.
 * Back: short description, tech stack tags, and links (GitHub / demo).
 *
 * Flips on hover (desktop) via CSS :hover.
 * On touch devices (no hover), flips on tap via React state.
 */
export default function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    // Toggle on click — primarily for touch devices.
    // On desktop with hover, this also works as a fallback.
    setFlipped((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlipped((prev) => !prev);
    }
  };

  return (
    <div
      className={`project-card ${flipped ? 'project-card--flipped' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="group"
      aria-roledescription="flip card"
      aria-label={`${project.title} — ${flipped ? 'showing details' : 'hover or press to see details'}`}
      tabIndex={0}
    >
      <div className="project-card-inner">
        {/* Front Face */}
        <div className="project-card-front" aria-hidden={flipped}>
          <span className="project-card-title">{project.title}</span>
          <span className="project-card-hint" aria-hidden="true">
            Hover to flip
          </span>
        </div>

        {/* Back Face */}
        <div className="project-card-back" aria-hidden={!flipped}>
          <p className="project-card-description">{project.description}</p>

          <div className="project-card-stack">
            {project.stack.map((tech) => (
              <span key={tech} className="project-card-tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="project-card-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} GitHub repository (opens in new tab)`}
              >
                GitHub &rarr;
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} live demo (opens in new tab)`}
              >
                Live Demo &rarr;
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
