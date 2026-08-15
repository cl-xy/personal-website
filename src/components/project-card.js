'use client';

/**
 * ProjectCard — Editorial project card with status and number.
 */
export default function ProjectCard({ project, index = 0 }) {
  return (
    <article className="project-card-editorial">
      <div className="project-card-accent" aria-hidden="true" />

      <span className="project-card-number">
        {project.status || `Project ${index + 1}`}
      </span>

      <h3 className="project-card-title">{project.title}</h3>

      <p className="project-card-description">{project.description}</p>

      <div className="project-card-stack">
        {project.stack.map((tech) => (
          <span key={tech} className="project-card-tag">
            {tech}
          </span>
        ))}
      </div>

      <div className="project-card-links">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-link project-card-link--demo"
            aria-label={`${project.title} live demo (opens in new tab)`}
          >
            Live Demo &rarr;
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-link"
            aria-label={`${project.title} GitHub repository (opens in new tab)`}
          >
            GitHub &rarr;
          </a>
        )}
      </div>
    </article>
  );
}
