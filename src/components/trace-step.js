'use client';

import { motion } from 'framer-motion';



const typeStyles = {
  system: {
    label: 'system',
    labelColor: 'text-trace-muted',
    borderColor: 'border-trace-border',
    contentColor: 'text-trace-muted',
    icon: '◆',
  },
  reasoning: {
    label: 'thinking',
    labelColor: 'text-trace-orange',
    borderColor: 'border-trace-orange/40',
    contentColor: 'text-trace-text/80',
    icon: '⟳',
  },
  tool_call: {
    label: 'tool_call',
    labelColor: 'text-trace-blue',
    borderColor: 'border-trace-blue/40',
    contentColor: 'text-trace-text',
    icon: '→',
  },
  evidence: {
    label: 'evidence',
    labelColor: 'text-trace-blue',
    borderColor: 'border-trace-blue/40',
    contentColor: 'text-trace-text',
    icon: '📎',
  },
  result: {
    label: 'result',
    labelColor: 'text-trace-purple',
    borderColor: 'border-trace-purple/40',
    contentColor: 'text-trace-text',
    icon: '◉',
  },
  recommendation: {
    label: 'RECOMMENDATION',
    labelColor: 'text-trace-green',
    borderColor: 'border-trace-green',
    contentColor: 'text-trace-green',
    icon: '★',
  },
};

export default function TraceStep({ step }) {
  const style = typeStyles[step.type] || typeStyles.system;
  const isRecommendation = step.type === 'recommendation';

  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`border-l-2 ${style.borderColor} pl-4 py-2 ${
        isRecommendation ? 'my-4 bg-trace-green/5 rounded-r-lg py-4' : ''
      }`}
    >
      {/* Header line */}
      <div className="flex items-center gap-3 mb-1 flex-wrap">
        <span className="text-trace-muted text-[10px] font-mono opacity-50">
          {step.timestamp}
        </span>
        <span className={`text-xs font-mono font-semibold ${style.labelColor}`}>
          {style.icon} {style.label}
        </span>
        {step.tool && (
          <span className="text-trace-blue text-xs font-mono">
            {step.tool}{step.args || '()'}
          </span>
        )}
      </div>

      {/* Content */}
      <pre
        className={`text-sm font-mono whitespace-pre-wrap leading-relaxed ${style.contentColor} ${
          step.highlight ? 'text-base' : ''
        }`}
      >
        {step.content}
      </pre>

      {/* Evidence images */}
      {step.images && (
        <div className="flex gap-3 mt-3 overflow-x-auto pb-2">
          {step.images.map((img, i) => (
            <div key={i} className="shrink-0 border border-trace-border rounded overflow-hidden">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
              </div>
              <div className="px-2 py-1.5 bg-trace-surface">
                <p className="text-[10px] font-mono text-trace-muted truncate">{img.caption}</p>
                <p className="text-[9px] font-mono text-trace-blue/60">tag: {img.meta}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
