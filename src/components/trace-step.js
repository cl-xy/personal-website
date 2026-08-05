'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const typeStyles = {
  system: {
    label: 'system',
    labelColor: 'text-trace-muted',
    borderColor: 'border-trace-border',
    contentColor: 'text-trace-muted',
    icon: '◆',
    glowColor: null,
  },
  reasoning: {
    label: 'thinking',
    labelColor: 'text-trace-orange',
    borderColor: 'border-trace-orange/40',
    contentColor: 'text-trace-text/80',
    icon: '⟳',
    glowColor: 'hover:shadow-glow-orange',
    collapsible: true,
  },
  tool_call: {
    label: 'tool_call',
    labelColor: 'text-trace-blue',
    borderColor: 'border-trace-blue/40',
    contentColor: 'text-trace-text',
    icon: '→',
    glowColor: null,
  },
  evidence: {
    label: 'evidence',
    labelColor: 'text-trace-blue',
    borderColor: 'border-trace-blue/40',
    contentColor: 'text-trace-text',
    icon: '📎',
    glowColor: null,
  },
  result: {
    label: 'result',
    labelColor: 'text-trace-purple',
    borderColor: 'border-trace-purple/40',
    contentColor: 'text-trace-text',
    icon: '◉',
    glowColor: 'hover:shadow-glow-purple',
  },
  recommendation: {
    label: 'RECOMMENDATION',
    labelColor: 'text-trace-green',
    borderColor: 'border-trace-green',
    contentColor: 'text-trace-green',
    icon: '★',
    glowColor: null,
  },
};

export default function TraceStep({ step, index }) {
  const style = typeStyles[step.type] || typeStyles.system;
  const isRecommendation = step.type === 'recommendation';
  const isReasoning = step.type === 'reasoning';
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -6, filter: 'blur(2px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.02,
      }}
      className={`
        border-l-2 ${style.borderColor} pl-4 py-2 group relative
        ${isRecommendation ? 'my-4 recommendation-glow rounded-r-lg py-4 border-l-[3px]' : ''}
        ${style.glowColor || ''}
        hover:bg-trace-surface/30 transition-colors duration-150
      `}
    >
      {/* Step marker on hover */}
      <span className="absolute -left-[3px] top-3 w-[6px] h-[6px] rounded-full bg-trace-border opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2" aria-hidden="true" />

      {/* Header line */}
      <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
        <span className="text-trace-muted text-[10px] font-mono opacity-40 tabular-nums shrink-0">
          {step.timestamp}
        </span>
        <span className={`text-xs font-mono font-semibold ${style.labelColor} shrink-0`}>
          {style.icon} {style.label}
        </span>
        {step.tool && (
          <span className="text-trace-blue text-xs font-mono opacity-80 truncate">
            {step.tool}{step.args || '()'}
          </span>
        )}
        {isReasoning && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[10px] font-mono text-trace-muted/50 hover:text-trace-muted ml-auto transition-colors"
            aria-label={collapsed ? 'Expand reasoning' : 'Collapse reasoning'}
          >
            {collapsed ? '[+]' : '[-]'}
          </button>
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={false}
        animate={{
          height: collapsed ? 0 : 'auto',
          opacity: collapsed ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="overflow-hidden"
      >
        <pre
          className={`text-sm font-mono whitespace-pre-wrap leading-relaxed ${style.contentColor} ${
            step.highlight ? 'text-[13px] sm:text-base text-glow-green' : ''
          }`}
        >
          {step.content}
        </pre>

        {/* Evidence images */}
        {step.images && (
          <div className="flex gap-2 sm:gap-3 mt-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
            {step.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.2 }}
                className="shrink-0 border border-trace-border rounded overflow-hidden hover:border-trace-blue/40 transition-colors snap-start"
              >
                <div className="relative w-24 h-24 sm:w-36 sm:h-36">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-2 py-1.5 bg-trace-surface">
                  <p className="text-[10px] font-mono text-trace-muted truncate">{img.caption}</p>
                  <p className="text-[9px] font-mono text-trace-blue/60">tag: {img.meta}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Collapsed indicator */}
      {isReasoning && collapsed && (
        <span className="text-[10px] font-mono text-trace-orange/50 italic">
          (reasoning collapsed)
        </span>
      )}
    </motion.div>
  );
}
