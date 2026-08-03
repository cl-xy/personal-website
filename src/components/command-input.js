'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCommandResponse } from '@/lib/commands';

export default function CommandInput({ onClear }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const response = getCommandResponse(trimmed);

    if (response && response.action === 'clear') {
      setHistory([]);
      setInput('');
      if (onClear) onClear();
      return;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: trimmed },
      { type: 'output', text: response ? response.output : `Command not found: "${trimmed}". Type 'help' for available queries.` },
    ]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="border-t border-trace-border bg-trace-surface/50 backdrop-blur-sm"
    >
      {/* History area */}
      {history.length > 0 && (
        <div
          ref={containerRef}
          className="max-h-64 overflow-y-auto px-4 sm:px-6 pt-4 space-y-2"
        >
          {history.map((entry, i) => (
            <div key={i} className="font-mono text-sm">
              {entry.type === 'input' ? (
                <div className="text-trace-green">
                  <span className="text-trace-muted">{'>'} </span>
                  {entry.text}
                </div>
              ) : (
                <pre className="text-trace-text whitespace-pre-wrap pl-4 opacity-90">
                  {entry.text}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-trace-green select-none">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-trace-text outline-none placeholder:text-trace-muted/50 caret-trace-green"
            placeholder="type 'help' for available commands"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Command input"
          />
        </div>
      </form>
    </motion.div>
  );
}
