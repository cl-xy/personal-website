'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const rooms = [
  {
    id: 'about',
    label: 'About',
    numeral: 'I',
    color: 'var(--room-about)',
    description: 'From Singapore, moving to NYC for Cornell Tech',
    story: [
      'I got into ML through analytics at NUS and then spent two years learning that most of "AI engineering" is plumbing. I like the plumbing.',
      'For the last two years I\'ve been on Citi Singapore\'s AI/ML platform team. Internal LLM tools, mostly: compliance search, code migration, trade processing workflows. The kind of stuff that\'s boring to explain but satisfying to get right.',
      'This fall I\'m moving to New York for Cornell Tech\'s MEng in Data Science and Decision Analytics. Looking for AI/backend engineering roles in the US after that, ideally close to applied systems rather than pure research.',
    ],
  },
  {
    id: 'work',
    label: 'Work',
    numeral: 'II',
    color: 'var(--room-work)',
    description: 'Two years at Citi on the AI/ML platform team',
    story: [
      'Software Engineer (AI/ML Platform) at Citi, Singapore. 2023 to 2026.',
      'One project was a retrieval tool for policy/compliance questions. The metric I ended up caring about wasn\'t faithfulness scores on some eval set. It was whether compliance officers stopped opening ten PDFs to answer one question. They mostly did. Internal estimate was ~7k hours/year saved, which sounds big but honestly the direction was obvious from usage data.',
      'Also built a SAS-to-PySpark code converter using LLMs. The annoying failure mode: generated code compiles fine and quietly returns different numbers. So we ran both versions on the same data and diffed the output instead of trusting the model. Less elegant, more reliable.',
      'Before Citi: interned at GIC (2022) on data pipelines, and at A*STAR (2021) on research infra. Different environments, both useful.',
    ],
    stack: 'Python, LangChain, FastAPI, Java, Spring Boot, retrieval systems',
  },
  {
    id: 'projects',
    label: 'Projects',
    numeral: 'III',
    color: 'var(--room-projects)',
    description: 'A live stock-analysis demo, plus my NUS capstone',
    story: [
      'AI Investment Analyst: three agents (bull, bear, moderator) debate a stock position and stream their reasoning in real time. Mostly built it because I wanted to see where multi-agent debate actually breaks down.',
      'Deploying it was the annoying part. SSE connections would just die somewhere in Vercel\'s proxy layer with no error, and OpenAI rate limits would kill an agent halfway through its argument. Took longer to fix than the agents took to build.',
      'For my NUS capstone, I did NLP analysis of climate disclosures from Asian banks. Turns out ~80% of what banks publish is copy-paste boilerplate across reports. Built a classifier to separate the template language from actual decarbonization commitments. Got Distinction, but honestly the dataset was the hard part.',
    ],
    stack: 'LangGraph, FastMCP, React, Python, too many API retries',
    link: 'https://ai-investment-analyst-iota.vercel.app',
    linkLabel: 'See the demo',
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
            src="/personal-website/gallery/img3.jpg"
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
                    <p className="room-detail-desc">{room.description}</p>

                    <div className="room-story">
                      {room.story.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
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
