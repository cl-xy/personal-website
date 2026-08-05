'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion, MotionConfig } from 'framer-motion';
import { traceSteps } from '@/lib/trace-script';
import TraceStep from '@/components/trace-step';
import CommandInput from '@/components/command-input';
import RecruiterView from '@/components/recruiter-view';

function useElapsedTime(isRunning) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      startRef.current = Date.now();
      const tick = () => {
        setElapsed(Date.now() - startRef.current);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isRunning]);

  return elapsed;
}

function formatElapsed(ms) {
  const totalSecs = Math.floor(ms / 1000);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatTokens(count) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}

export default function TracePage() {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [traceComplete, setTraceComplete] = useState(false);
  const [showRecruiter, setShowRecruiter] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [completionPhase, setCompletionPhase] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const scrollRef = useRef(null);
  const timeoutRef = useRef(null);
  const stepIndexRef = useRef(0);
  const tokenIntervalRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();
  const elapsed = useElapsedTime(isRunning);

  useEffect(() => {
    if (isRunning) {
      tokenIntervalRef.current = setInterval(() => {
        setTokenCount((prev) => prev + Math.floor(Math.random() * 40 + 20));
      }, 150);
    } else {
      if (tokenIntervalRef.current) clearInterval(tokenIntervalRef.current);
    }
    return () => {
      if (tokenIntervalRef.current) clearInterval(tokenIntervalRef.current);
    };
  }, [isRunning]);

  const runTrace = useCallback(() => {
    setVisibleSteps([]);
    setTraceComplete(false);
    setCompletionPhase(false);
    setIsRunning(true);
    setTokenCount(0);
    stepIndexRef.current = 0;

    const showNext = () => {
      const idx = stepIndexRef.current;
      if (idx >= traceSteps.length) {
        setIsRunning(false);
        setCompletionPhase(true);
        setTimeout(() => {
          setCompletionPhase(false);
          setTraceComplete(true);
        }, 800);
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

    timeoutRef.current = setTimeout(showNext, 100);
  }, []);

  useEffect(() => {
    runTrace();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [runTrace]);

  // Instant render for reduced motion preference
  useEffect(() => {
    if (shouldReduceMotion) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setVisibleSteps(traceSteps);
      setTokenCount(2847);
      setIsRunning(false);
      setCompletionPhase(false);
      setTraceComplete(true);
    }
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const target = el.scrollHeight - el.clientHeight;
      const current = el.scrollTop;
      const distance = target - current;

      if (distance <= 0) return;

      if (distance < 80) {
        el.scrollTop = target;
      } else {
        let start = null;
        const duration = 200;
        const animate = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.scrollTop = current + distance * ease;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }
  }, [visibleSteps]);

  const skipToEnd = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisibleSteps(traceSteps);
    setTokenCount(2847);
    setIsRunning(false);
    setCompletionPhase(false);
    setTraceComplete(true);
  }, []);

  const handleClear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    runTrace();
  }, [runTrace]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space' && isRunning) {
        e.preventDefault();
        skipToEnd();
      }
      if (e.key === 'r' && !isRunning && traceComplete && !e.metaKey && !e.ctrlKey) {
        handleClear();
      }
      if (e.key === 'Escape' && showRecruiter) {
        setShowRecruiter(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, showRecruiter, traceComplete, skipToEnd, handleClear]);

  const stepCount = visibleSteps.length;
  const totalSteps = traceSteps.length;
  const progress = (stepCount / totalSteps) * 100;

  return (
    <MotionConfig reducedMotion="user">
    <div className="h-screen flex flex-col bg-trace-bg text-trace-text overflow-hidden">
      {/* Progress rail */}
      <div className="h-[2px] w-full bg-trace-border/30 shrink-0 relative overflow-hidden">
        <motion.div
          className="h-full bg-trace-green"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        {isRunning && (
          <motion.div
            className="absolute top-0 right-0 h-full w-16 bg-gradient-to-r from-transparent to-trace-green/50"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Header with live telemetry */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2.5 surface-frosted shrink-0">
        <div className="flex items-center gap-3 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full transition-colors ${
                isRunning ? 'bg-trace-green animate-pulse status-dot-glow' : completionPhase ? 'bg-trace-orange' : 'bg-trace-green'
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
            <span className="text-trace-border">|</span>
            <span className="text-trace-muted">role:</span>
            <span className="text-trace-text">ai_engineer</span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-trace-muted">
            <div className="flex items-center gap-1.5">
              <span className="opacity-60">steps</span>
              <span className="text-trace-text tabular-nums">{stepCount}/{totalSteps}</span>
            </div>
            <span className="text-trace-border">|</span>
            <div className="flex items-center gap-1.5">
              <span className="opacity-60">tokens</span>
              <span className="text-trace-blue tabular-nums">{formatTokens(tokenCount)}</span>
            </div>
            <span className="text-trace-border">|</span>
            <div className="flex items-center gap-1.5">
              <span className="opacity-60">elapsed</span>
              <span className="text-trace-orange tabular-nums">{formatElapsed(elapsed)}</span>
            </div>
          </div>

          <div className="flex sm:hidden items-center gap-2 font-mono text-[10px] text-trace-muted">
            <span className="tabular-nums">{stepCount}/{totalSteps}</span>
            <span className="text-trace-orange tabular-nums">{formatElapsed(elapsed)}</span>
          </div>

          <div className="flex items-center gap-2">
            {isRunning && (
              <button
                onClick={skipToEnd}
                className="text-xs sm:text-sm font-mono px-3 sm:px-4 py-1.5 sm:py-2 bg-trace-orange/15 border border-trace-orange/60 text-trace-orange hover:text-trace-text hover:border-trace-orange hover:bg-trace-orange/20 transition-all rounded-sm skip-pulse"
                title="Skip to end (Space)"
              >
                skip <span className="hidden sm:inline">→</span>
              </button>
            )}
            {!isRunning && traceComplete && (
              <button
                onClick={handleClear}
                className="text-[10px] sm:text-xs font-mono px-2 sm:px-3 py-1 sm:py-1.5 border border-trace-border text-trace-muted hover:text-trace-text hover:border-trace-text/50 hover:bg-trace-surface transition-all"
                title="Replay trace (R)"
              >
                replay
              </button>
            )}
            <button
              onClick={() => setShowRecruiter(true)}
              className="text-[10px] sm:text-xs font-mono px-2 sm:px-3 py-1 sm:py-1.5 border border-trace-blue/40 text-trace-blue hover:text-trace-text hover:border-trace-blue hover:bg-trace-blue/10 transition-all rounded-sm"
              title="View recruiter summary (Esc to close)"
            >
              <span className="hidden sm:inline">recruiter view</span>
              <span className="sm:hidden">summary</span>
            </button>
          </div>
        </div>
      </header>

      {/* Trace output */}
      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-0.5"
        role="log"
        aria-live={shouldReduceMotion ? "off" : "polite"}
        aria-label="Agent evaluation trace"
      >
        <AnimatePresence mode="popLayout">
          {visibleSteps.map((step, index) => (
            <TraceStep key={step.id} step={step} index={index} />
          ))}
        </AnimatePresence>

        {isRunning && visibleSteps.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 py-2 pl-4 border-l-2 border-trace-border"
          >
            <motion.span
              className="inline-block w-1.5 h-4 bg-trace-green"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: 'steps(2)' }}
            />
            <span className="text-xs font-mono text-trace-muted">
              {visibleSteps.length < 5 ? 'initializing tools...' :
               visibleSteps.length < 10 ? 'analyzing signals...' :
               visibleSteps.length < 13 ? 'cross-referencing data...' :
               'compiling assessment...'}
            </span>
          </motion.div>
        )}

        {completionPhase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 py-4 pl-4 border-l-2 border-trace-green/60"
          >
            <motion.span
              className="inline-block w-2 h-4 bg-trace-green"
              animate={{ opacity: [1, 0.3] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <span className="text-xs font-mono text-trace-green">
              finalizing...
            </span>
          </motion.div>
        )}

        {traceComplete && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-trace-muted font-mono text-xs pt-4 border-t border-trace-border/50 mt-6"
          >
            <span className="text-trace-green">&#10003;</span>{' '}
            trace complete. {totalSteps} steps, {formatTokens(tokenCount)} tokens.{' '}
            <button
              onClick={() => setShowRecruiter(true)}
              className="text-trace-blue hover:underline underline-offset-2"
            >
              view recruiter summary
            </button>{' '}
            or type a command below.
          </motion.div>
        )}

        <div className="h-4" aria-hidden="true" />
      </main>

      <AnimatePresence>
        {traceComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0"
          >
            <CommandInput onClear={handleClear} />
          </motion.div>
        )}
      </AnimatePresence>

      {isRunning && visibleSteps.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-4 right-4 text-[10px] font-mono text-trace-muted/50 hidden sm:block"
        >
          press space to skip
        </motion.div>
      )}

      <AnimatePresence>
        {showRecruiter && (
          <RecruiterView onClose={() => setShowRecruiter(false)} />
        )}
      </AnimatePresence>

      {/* Version nav */}
      <a
        href="../"
        className="fixed bottom-3 left-3 z-30 text-[10px] font-mono text-trace-muted/30 hover:text-trace-muted/70 transition-colors"
        aria-label="Back to all versions"
      >
        ← versions
      </a>
      {/* Screen reader completion announcement */}
      {traceComplete && (
        <div role="status" aria-live="polite" className="sr-only">
          Evaluation complete. {totalSteps} steps analyzed. Recommendation: Strong hire. View recruiter summary for details.
        </div>
      )}
    </div>
    </MotionConfig>
  );
}
