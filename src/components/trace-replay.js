'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { traceSteps, traceMetrics, architectureNodes } from '../lib/trace-data';

function formatElapsed(ms) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function ActionBadge({ action }) {
  const styles = {
    tool_call: 'bg-incident/10 text-incident border-incident/20',
    reasoning: 'bg-fix/10 text-fix border-fix/20',
    synthesis: 'bg-ink/5 text-ink/70 border-ink/10',
  };

  return (
    <span
      className={`text-[10px] font-mono px-1.5 py-0.5 border ${styles[action] || styles.reasoning}`}
    >
      {action}
    </span>
  );
}

function AgentLabel({ agent }) {
  return (
    <span className="text-[11px] font-mono font-bold text-ink uppercase tracking-wide">
      {agent}
    </span>
  );
}

function MetricsBar({ currentStep }) {
  const step = traceSteps[currentStep - 1] || traceSteps[0];
  const progress = currentStep / traceSteps.length;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-[10px] font-mono px-2 py-0.5 bg-paper text-muted border border-border">
        {formatElapsed(step?.elapsed || 0)}
      </span>
      <span className="text-[10px] font-mono px-2 py-0.5 bg-paper text-muted border border-border">
        {step?.tokens?.toLocaleString() || 0} tokens
      </span>
      <span className="text-[10px] font-mono px-2 py-0.5 bg-paper text-muted border border-border">
        $0.00 (free tier)
      </span>
      <div className="ml-auto h-1.5 w-24 bg-border overflow-hidden">
        <div
          className="h-full bg-incident transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
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
        <line x1="50" y1="32" x2="25" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-border-strong" />
        <line x1="50" y1="32" x2="75" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-border-strong" />
        <line x1="25" y1="80" x2="50" y2="108" stroke="currentColor" strokeWidth="0.5" className="text-border-strong" />
        <line x1="75" y1="80" x2="50" y2="108" stroke="currentColor" strokeWidth="0.5" className="text-border-strong" />

        {/* Nodes */}
        {architectureNodes.map((node) => {
          const isActive = activeAgent === node.id;
          return (
            <g key={node.id}>
              <rect
                x={node.x - 12}
                y={node.y - 8}
                width="24"
                height="16"
                className={`${
                  isActive
                    ? 'fill-incident/15 stroke-incident'
                    : 'fill-paper stroke-border-strong'
                }`}
                strokeWidth={isActive ? '1.5' : '0.5'}
              />
              <text
                x={node.x}
                y={node.y + 3}
                textAnchor="middle"
                className={`text-[4.5px] font-mono ${isActive ? 'fill-incident' : 'fill-muted'}`}
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

  // Auto-scroll trace container
  useEffect(() => {
    if (stepsEndRef.current) {
      stepsEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [visibleSteps]);

  const activeAgent = visibleSteps.length > 0
    ? visibleSteps[visibleSteps.length - 1].agent
    : null;

  return (
    <div ref={containerRef} className="overflow-hidden border border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-paper border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-incident" />
          <span className="text-[11px] font-mono text-muted">
            trace: AAPL analysis run
          </span>
        </div>
        <button
          onClick={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            play();
          }}
          className="text-[11px] font-mono text-muted hover:text-ink transition-colors px-2 py-0.5 border border-border hover:border-border-strong"
        >
          {isPlaying ? 'Running...' : 'Replay'}
        </button>
      </div>

      {/* Architecture mini-diagram */}
      <div className="px-4 pt-3 bg-paper">
        <ArchitectureMini activeAgent={activeAgent} />
      </div>

      {/* Metrics bar */}
      <div className="px-4 py-2 border-b border-border">
        <MetricsBar currentStep={visibleSteps.length} />
      </div>

      {/* Trace steps */}
      <div className="px-4 py-3 max-h-[300px] overflow-y-auto bg-paper">
        {visibleSteps.map((step) => {
          const isLatest = step.id === visibleSteps[visibleSteps.length - 1]?.id;
          return (
            <div
              key={step.id}
              className={`flex items-start gap-2 py-2 border-l-[3px] pl-3 mb-1 ${
                isLatest ? 'border-incident bg-incident-bg/50' : 'border-border'
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
                <p className="text-xs font-mono text-ink/60 leading-relaxed truncate">
                  {step.content}
                </p>
              </div>
            </div>
          );
        })}

        {visibleSteps.length === 0 && !isPlaying && (
          <p className="text-xs font-mono text-muted text-center py-6">
            Scroll to start trace replay
          </p>
        )}

        {isPlaying && visibleSteps.length > 0 && (
          <div className="flex items-center gap-1.5 py-2 pl-3">
            <span className="w-1.5 h-1.5 bg-incident animate-pulse" />
            <span className="text-[10px] font-mono text-muted">streaming...</span>
          </div>
        )}

        <div ref={stepsEndRef} />
      </div>
    </div>
  );
}
