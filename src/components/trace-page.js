'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { traceSteps } from '@/lib/trace-script';
import TraceStep from '@/components/trace-step';
import CommandInput from '@/components/command-input';
import RecruiterView from '@/components/recruiter-view';

export default function TracePage() {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [traceComplete, setTraceComplete] = useState(false);
  const [showRecruiter, setShowRecruiter] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const scrollRef = useRef(null);
  const timeoutRef = useRef(null);
  const stepIndexRef = useRef(0);

  const runTrace = useCallback(() => {
    setVisibleSteps([]);
    setTraceComplete(false);
    setIsRunning(true);
    stepIndexRef.current = 0;

    const showNext = () => {
      const idx = stepIndexRef.current;
      if (idx >= traceSteps.length) {
        setTraceComplete(true);
        setIsRunning(false);
        return;
      }

      const step = traceSteps[idx];
      setVisibleSteps((prev) => [...prev, step]);
      stepIndexRef.current = idx + 1;

      const nextStep = traceSteps[idx + 1];
      const delay = nextStep ? nextStep.delay : 0;
      if (delay > 0) {
        timeoutRef.current = setTimeout(showNext, delay);
      } else {
        showNext();
      }
    };

    // Small initial delay before trace begins
    timeoutRef.current = setTimeout(showNext, 600);
  }, []);

  useEffect(() => {
    runTrace();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [runTrace]);

  // Auto-scroll as new steps appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleSteps]);

  const skipToEnd = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisibleSteps(traceSteps);
    setTraceComplete(true);
    setIsRunning(false);
  };

  const handleClear = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    runTrace();
  };

  const handleShowRecruiter = () => {
    setShowRecruiter(true);
  };

  return (
    <div className="h-screen flex flex-col bg-trace-bg text-trace-text overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-trace-border bg-trace-surface/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                isRunning ? 'bg-trace-green animate-pulse' : 'bg-trace-green'
              }`}
              aria-hidden="true"
            />
            <span className="text-trace-muted">agent:</span>
            <span className="text-trace-text">career_analyst_v1</span>
          </div>
          <span className="text-trace-border hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-trace-muted">target:</span>
            <span className="text-trace-text">xinyi_lu</span>
          </div>
          <span className="text-trace-border hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-trace-muted">status:</span>
            <span className={isRunning ? 'text-trace-green' : 'text-trace-text'}>
              {isRunning ? 'running...' : 'complete'}
            </span>
          </div>
        </div>

        <button
          onClick={handleShowRecruiter}
          className="text-xs font-mono px-3 py-1.5 border border-trace-border text-trace-muted hover:text-trace-text hover:border-trace-text/50 transition-colors rounded"
        >
          skip to summary
        </button>
      </header>

      {/* Trace output */}
      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-1"
      >
        {visibleSteps.map((step) => (
          <TraceStep key={step.id} step={step} />
        ))}

        {/* End marker when complete */}
        {traceComplete && (
          <div className="text-trace-muted font-mono text-xs pt-4 border-t border-trace-border/50 mt-4">
            ─ trace complete. type a command below or{' '}
            <button
              onClick={handleShowRecruiter}
              className="text-trace-blue hover:underline"
            >
              view recruiter summary
            </button>
            .
          </div>
        )}
      </main>

      {/* Command input (appears after trace completes) */}
      {traceComplete && (
        <div className="shrink-0">
          <CommandInput onClear={handleClear} />
        </div>
      )}

      {/* Recruiter overlay */}
      <AnimatePresence>
        {showRecruiter && (
          <RecruiterView onClose={() => setShowRecruiter(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
