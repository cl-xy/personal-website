'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import ProjectCard from '@/components/project-card';

const rooms = [
  {
    id: 'about',
    label: 'About',
    numeral: 'I',
    color: 'var(--room-about)',
    description: 'Curious by nature, in ML by choice',
    story: [
      [
        { text: 'I got into ML through analytics at NUS, and what kept me there was ' },
        { text: 'curiosity', highlight: true },
        { text: ' more than anything else — I like taking on problems that don\'t have a clean answer key and figuring out how to get to one.' },
      ],
      [
        { text: 'For the last three years I\'ve been dabbling in the AI/ML space, turning ideas into things people actually use: compliance search, code migration, trade processing workflows. A lot of it comes down to ' },
        { text: 'leveraging generative AI to solve real business pain points', highlight: true },
        { text: ', not just building for the sake of the technology.' },
      ],
      [
        { text: 'I ' },
        { text: 'pick things up quickly', highlight: true },
        { text: ' and enjoy the process of learning enough to be useful fast, then getting better from there. That\'s probably the throughline across everything I\'ve worked on.' },
      ],
      [
        { text: 'Outside of work, I\'m usually hiking, on a yoga mat, or volunteering with youth and elderly causes — trying to ' },
        { text: 'stay curious about people, not just problems', highlight: true },
        { text: '.' },
      ],
    ],
  },
  {
    id: 'work',
    label: 'Work',
    numeral: 'II',
    color: 'var(--room-work)',
    description: 'Three years at Citi, from data science into software engineering',
    roles: [
      {
        title: 'Software Engineer',
        org: 'Citi, Singapore',
        dates: 'Sep 2024 – Jul 2026',
        highlights: [
          {
            title: 'Investment analyst AI agent',
            description:
              'Conceptualized and architected an AI agent that generates next-best-action recommendations from client portfolio data.',
            stack: ['LLM agents', 'Python'],
          },
          {
            title: 'Document Generation platform',
            description:
              'Led end-to-end development of a platform for bankers to manage banking documents. Deployed and validated in UAT environments.',
            stat: { value: '15%+', label: 'improvement in operational efficiency' },
            stack: ['React', 'TypeScript'],
          },
          {
            title: 'Trade order systems',
            description:
              'Enhanced trade order systems, laying groundwork for low-latency data access for downstream analytics.',
            stat: { value: '10%', label: 'faster API response time' },
            stack: ['Java', 'Spring Boot'],
          },
          {
            title: 'GenAI Accelerators',
            description:
              'Championed GenAI adoption org-wide as a member of Citi\'s AI Accelerators, running knowledge-sharing sessions on LLM applications, MCP, prompt engineering, and AI coding tools.',
            stack: ['LLM applications', 'MCP', 'Prompt engineering'],
          },
        ],
      },
      {
        title: 'Data Scientist, AI/ML Platform',
        org: 'Citi, Singapore',
        dates: 'Jul 2023 – Aug 2024',
        highlights: [
          {
            title: 'RAG chatbot for policy retrieval',
            description:
              'Leveraged LLMs to develop RAG-based chatbots for policy retrieval. Prioritized real-world adoption over offline eval scores: success was measured by whether compliance officers could resolve a query without manually searching through multiple policy documents — and adoption data confirmed they largely did.',
            stat: { value: '~7,000 hrs/yr', label: 'reduced in manual lookup time' },
            stack: ['LangChain', 'FastAPI', 'Python'],
          },
          {
            title: 'Prompt engineering & evaluation',
            description:
              'Applied prompt engineering techniques — ReAct, Chain of Thought — to boost model responses, and conducted systematic evaluation using TruLens.',
            stack: ['ReAct', 'Chain of Thought', 'TruLens'],
          },
          {
            title: 'SAS → PySpark conversion tool',
            description:
              'Developed a full-stack web application to assist developers in converting SAS code to PySpark. Identified a critical failure mode where converted code compiled successfully but produced silently incorrect results. Mitigated this by validating outputs through parallel execution and diffing against the original implementation, ensuring functional correctness beyond compile-time checks.',
            stat: { value: '~20%', label: 'improvement in conversion efficiency' },
            stack: ['React', 'Python', 'FastAPI'],
          },
        ],
      },
    ],
    priorRoles: [
      { org: 'GovTech', title: 'Data Scientist Intern', year: '2023' },
      { org: 'GIC', title: 'Data Science Intern', year: '2022' },
      { org: 'A*STAR', title: 'Research Intern', year: '2021' },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    numeral: 'III',
    color: 'var(--room-projects)',
    description: 'A live stock-analysis demo, plus my NUS capstone',
    projects: [
      {
        id: 'ai-investment-analyst',
        title: 'AI Investment Analyst',
        description: 'Three agents (bull, bear, moderator) debate a stock position and stream their reasoning in real time. Built to explore where multi-agent debate actually breaks down.',
        stack: ['LangGraph', 'FastMCP', 'React', 'Python'],
        github: 'https://github.com/cl-xy/ai-investment-analyst',
        demo: 'https://ai-investment-analyst-iota.vercel.app',
      },
      {
        id: 'climate-disclosure-nlp',
        title: 'Climate Disclosure NLP',
        description: 'NUS capstone: NLP analysis of climate disclosures from Asian banks. Built a classifier to separate boilerplate from actual decarbonization commitments. Distinction.',
        stack: ['Python', 'NLP', 'scikit-learn'],
        github: 'https://github.com/cl-xy/climate-disclosure-nlp',
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    numeral: 'IV',
    color: 'var(--room-education)',
    description: 'Cornell Tech next, NUS before that',
    story: [
      'Starting the MEng in Data Science and Decision Analytics at Cornell Tech in 2026. New York.',
      'National University of Singapore, Bachelor of Science in Business Analytics. Graduated with Honours.',
      'NUS mixed stats, optimization, and software engineering. The capstone was the best part: an actual client, messy data, no clean answer key. That\'s where I learned the most.',
    ],
  },
];

export default function FourRoomsPage() {
  const [activeRoom, setActiveRoom] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const triggerRef = useRef(null);
  const detailRef = useRef(null);

  const springQuiet = shouldReduceMotion
    ? { duration: 0.01 }
    : { type: 'spring', stiffness: 180, damping: 26, mass: 0.9 };

  const enterEase = shouldReduceMotion
    ? { duration: 0.01 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] };

  const openRoom = useCallback((roomId, e) => {
    triggerRef.current = e?.currentTarget || null;
    setActiveRoom(roomId);
  }, []);

  const closeRoom = useCallback(() => {
    setActiveRoom(null);
  }, []);

  // Focus detail heading on open, scroll to top
  useEffect(() => {
    if (activeRoom && detailRef.current) {
      window.scrollTo(0, 0);
      detailRef.current.focus({ preventScroll: true });
    }
  }, [activeRoom]);

  // Restore focus to triggering card on close
  useEffect(() => {
    if (!activeRoom && triggerRef.current) {
      triggerRef.current.scrollIntoView({ block: 'center', behavior: 'instant' });
      triggerRef.current.focus({ preventScroll: true });
      triggerRef.current = null;
    }
  }, [activeRoom]);

  // Escape key to close
  useEffect(() => {
    if (!activeRoom) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeRoom();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [activeRoom, closeRoom]);

  return (
    <main className="page-main" id="main-content">
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="page-container">
        {/* Header */}
        <header className="site-header">
          <Image
            src="/gallery/img3.jpg"
            alt="Xinyi Lu"
            width={96}
            height={96}
            priority
            className="site-photo"
          />
          <h1 className="site-name">Xinyi Lu</h1>
          <p className="site-subtitle">Software engineer, mostly AI/ML systems.</p>
        </header>

        {/* Room overview / detail */}
        <AnimatePresence mode="wait">
          {activeRoom === null ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >

              <div className="rooms-shell">
                <div className="rooms-grid">
                  {rooms.map((room, i) => (
                    <motion.button
                      key={room.id}
                      type="button"
                      onClick={(e) => openRoom(room.id, e)}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...springQuiet, delay: shouldReduceMotion ? 0 : i * 0.055 }}
                      whileHover={shouldReduceMotion ? {} : { y: -3 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
                      className="room-card"
                      style={{ '--room-color': room.color }}
                      aria-label={`Enter ${room.label} room`}
                    >
                      <span className="room-numeral" aria-hidden="true">
                        {room.numeral}
                      </span>

                      <h2 className="room-label">{room.label}</h2>

                      <span className="room-enter-cue" aria-hidden="true">
                        Enter &rarr;
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeRoom}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={enterEase}
            >
              {(() => {
                const room = rooms.find((r) => r.id === activeRoom);
                if (!room) return null;
                return (
                  <div className="room-detail" style={{ '--room-color': room.color }}>
                    <button
                      type="button"
                      onClick={closeRoom}
                      className="room-back"
                      aria-label="Back to all rooms"
                    >
                      &larr; Back
                    </button>

                    <span className="room-numeral-detail" aria-hidden="true">
                      {room.numeral}
                    </span>

                    <h2
                      className="room-detail-title"
                      ref={detailRef}
                      tabIndex={-1}
                    >
                      {room.label}
                    </h2>

                    {room.projects ? (
                      <div className="project-cards-grid">
                        {room.projects.map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    ) : room.id === 'work' ? (
                      <div className="work-content">
                        {room.roles.map((role, roleIdx) => (
                          <div key={role.title} className="work-role-block">
                            <div className="work-role">
                              <span className="work-role-title">{role.title}</span>
                              <span className="work-role-org">{role.org}</span>
                              <span className="work-role-dates">{role.dates}</span>
                            </div>

                            <div className="work-highlights">
                              {role.highlights.map((highlight) => (
                                <div key={highlight.title} className="work-highlight">
                                  <h3 className="work-highlight-title">{highlight.title}</h3>
                                  <p className="work-highlight-description">
                                    {highlight.description}
                                  </p>

                                  <div className="work-highlight-footer">
                                    {highlight.stat && (
                                      <div className="work-stat">
                                        <span className="work-stat-value">
                                          {highlight.stat.value}
                                        </span>
                                        <span className="work-stat-label">
                                          {highlight.stat.label}
                                        </span>
                                      </div>
                                    )}

                                    {highlight.stack && (
                                      <div className="work-stack">
                                        {highlight.stack.map((tech) => (
                                          <span key={tech} className="work-stack-chip">
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}

                        {room.priorRoles && (
                          <div className="work-prior">
                            <span className="work-prior-label">Earlier</span>
                            <ul className="work-prior-list">
                              {room.priorRoles.map((prior) => (
                                <li key={prior.org} className="work-prior-item">
                                  <span className="work-prior-org">{prior.org}</span>
                                  <span className="work-prior-title">{prior.title}</span>
                                  <span className="work-prior-year">{prior.year}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="room-story">
                          {room.story.map((paragraph, idx) =>
                            typeof paragraph === 'string' ? (
                              <p key={idx}>{paragraph}</p>
                            ) : (
                              <p key={idx}>
                                {paragraph.map((segment, sIdx) =>
                                  segment.highlight ? (
                                    <span key={sIdx} className="highlight">
                                      {segment.text}
                                    </span>
                                  ) : (
                                    <span key={sIdx}>{segment.text}</span>
                                  )
                                )}
                              </p>
                            )
                          )}
                        </div>

                        {(room.stack || room.link) && (
                          <div className="room-meta">
                            {room.stack && (
                              <span className="room-stack">{room.stack}</span>
                            )}
                            {room.link && (
                              <a
                                href={room.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="room-link"
                                aria-label={`${room.linkLabel || 'See it live'} (opens in new tab)`}
                              >
                                {room.linkLabel || 'See it live'} &rarr;
                              </a>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="four-rooms-footer">
          <nav aria-label="Contact links" className="footer-links">
            <a href="mailto:xinyilu2000@gmail.com">Email</a>
            <a
              href="https://www.linkedin.com/in/xinyi-lu-35b72917a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in new tab)"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/cl-xy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in new tab)"
            >
              GitHub
            </a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
