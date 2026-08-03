'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { traceSteps, traceMetrics, architectureNodes } from '../lib/trace-data';

function formatElapsed(ms) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function ActionBadge({ action }) {
  const styles = {
    tool_call: 'bg-saffron/20 text-saffron border-saffron/30',
    reasoning: 'bg-sage/20 text-sage border-sage/30',
    synthesis: 'bg-terracotta/20 text-terracotta border-terracotta/30',
  };

  return (
    <span
      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${styles[action] || styles.reasoning}`}
    >
      {action}
    </span>
  );
}

function AgentLabel({ agent }) {
  return (
    <span className="text-xs font-mono font-semibold text-ink/90 uppercase tracking-wide">
      {agent}
    </span>
  );
}

function MetricsBar({ currentStep }) {
  const step = traceSteps[currentStep - 1] || traceSteps[0];
  const progress = currentStep / traceSteps.length;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-saffron/15 text-ink/70">
        {formatElapsed(step?.elapsed || 0)}
      </span>
      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-saffron/15 text-ink/70">
        {step?.tokens?.toLocaleString() || 0} tokens
      </span>
      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-saffron/15 text-ink/70">
        $0.00 (free tier)
      </span>
      <div className="ml-auto h-1 w-20 bg-ink/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-terracotta/60 rounded-full"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

function ArchitectureMini({ activeAgent }) {
  return (
    <div className="relative w-full h-[80px] mb-3">
      <svg
        viewBox="0 0 100 140"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connections */}
        <line x1="50" y1="32" x2="25" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-ink/10" />
        <line x1="50" y1="32" x2="75" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-ink/10" />
        <line x1="25" y1="80" x2="50" y2="108" stroke="currentColor" strokeWidth="0.5" className="text-ink/10" />
        <line x1="75" y1="80" x2="50" y2="108" stroke="currentColor" strokeWidth="0.5" className="text-ink/10" />

        {/* Nodes */}
        {architectureNodes.map((node) => {
          const isActive = activeAgent === node.id;
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="10"
                className={`transition-colors duration-300 ${
                  isActive
                    ? 'fill-terracotta/20 stroke-terracotta'
                    : 'fill-code-bg stroke-ink/20'
                }`}
                strokeWidth={isActive ? '1.5' : '0.5'}
              />
              {isActive && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="10"
                  className="fill-none stroke-terracotta/40"
                  strokeWidth="0.5"
                >
                  <animate
                    attributeName="r"
                    from="10"
                    to="16"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <text
                x={node.x}
                y={node.y + 3}
                textAnchor="middle"
                className={`text-[5px] font-mono ${isActive ? 'fill-terracotta' : 'fill-ink/50'}`}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function TraceReplay() {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const stepsEndRef = useRef(null);

  const play = useCallback(() => {
    setVisibleSteps([]);
    setIsPlaying(true);
    setHasPlayed(true);

    let stepIndex = 0;

    function showNext() {
      if (stepIndex >= traceSteps.length) {
        setIsPlaying(false);
        return;
      }

      setVisibleSteps((prev) => [...prev, traceSteps[stepIndex]]);
      stepIndex++;

      // Vary timing to feel like real streaming
      const delay = stepIndex <= 2 ? 400 : stepIndex <= 5 ? 600 : 800;
      timeoutRef.current = setTimeout(showNext, delay);
    }

    timeoutRef.current = setTimeout(showNext, 300);
  }, []);

  // Auto-play on scroll into view
  useEffect(() => {
    if (hasPlayed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          play();
        }
      },
      { threshold: 0.3 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hasPlayed, play]);

  // Auto-scroll trace container as new steps appear
  useEffect(() => {
    if (stepsEndRef.current) {
      stepsEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [visibleSteps]);

  const activeAgent = visibleSteps.length > 0
    ? visibleSteps[visibleSteps.length - 1].agent
    : null;

  return (
    <div ref={containerRef} className="my-6 rounded-lg overflow-hidden border border-ink/5">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-code-bg border-b border-ink/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-terracotta/60" />
            <span className="w-2 h-2 rounded-full bg-saffron/60" />
            <span className="w-2 h-2 rounded-full bg-sage/60" />
          </div>
          <span className="text-[11px] font-mono text-muted">
            trace: AAPL analysis
          </span>
        </div>
        <button
          onClick={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            play();
          }}
          className="text-[11px] font-mono text-terracotta hover:text-terracotta/80 transition-colors px-2 py-0.5 rounded border border-terracotta/20 hover:border-terracotta/40"
        >
          {isPlaying ? 'Replaying...' : 'Replay'}
        </button>
      </div>

      {/* Architecture mini-diagram */}
      <div className="px-4 pt-3 bg-code-bg/50">
        <ArchitectureMini activeAgent={activeAgent} />
      </div>

      {/* Metrics bar */}
      <div className="px-4 py-2 bg-code-bg/30 border-b border-ink/5">
        <MetricsBar currentStep={visibleSteps.length} />
      </div>

      {/* Trace steps */}
      <div className="bg-code-bg/50 px-4 py-3 max-h-[280px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {visibleSteps.map((step) => {
            const isLatest = step.id === visibleSteps[visibleSteps.length - 1]?.id;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex items-start gap-2 py-1.5 border-l-2 pl-3 mb-1 ${
                  isLatest ? 'border-terracotta' : 'border-sage/40'
                }`}
              >
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <AgentLabel agent={step.agent} />
                    <ActionBadge action={step.action} />
                    <span className="text-[10px] font-mono text-muted ml-auto shrink-0">
                      {formatElapsed(step.elapsed)}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-ink/70 leading-relaxed truncate">
                    {step.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {visibleSteps.length === 0 && !isPlaying && (
          <p className="text-xs font-mono text-muted/60 text-center py-4">
            Scroll to replay trace
          </p>
        )}

        {isPlaying && visibleSteps.length > 0 && (
          <motion.div
            className="flex items-center gap-1 py-1 pl-3"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <span className="w-1 h-1 rounded-full bg-terracotta" />
            <span className="w-1 h-1 rounded-full bg-terracotta" />
            <span className="w-1 h-1 rounded-full bg-terracotta" />
          </motion.div>
        )}

        <div ref={stepsEndRef} />
      </div>
    </div>
  );
}
