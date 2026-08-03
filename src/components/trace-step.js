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
    label: 'reasoning',
    labelColor: 'text-trace-orange',
    borderColor: 'border-trace-orange/30',
    contentColor: 'text-trace-text',
    icon: '●',
  },
  tool_call: {
    label: 'tool_call',
    labelColor: 'text-trace-blue',
    borderColor: 'border-trace-blue/30',
    contentColor: 'text-trace-text',
    icon: '→',
  },
  result: {
    label: 'result',
    labelColor: 'text-trace-purple',
    borderColor: 'border-trace-purple/30',
    contentColor: 'text-trace-text',
    icon: '★',
  },
};

export default function TraceStep({ step }) {
  const style = typeStyles[step.type] || typeStyles.system;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`border-l-2 ${style.borderColor} pl-4 py-2`}
    >
      {/* Header line */}
      <div className="flex items-center gap-3 mb-1 flex-wrap">
        <span className="text-trace-muted text-xs font-mono opacity-60">
          {step.timestamp}
        </span>
        <span className={`text-xs font-mono font-medium ${style.labelColor}`}>
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
          step.highlight ? 'bg-trace-purple/5 border border-trace-purple/20 p-3 rounded mt-2' : ''
        }`}
      >
        {step.content}
      </pre>
    </motion.div>
  );
}
