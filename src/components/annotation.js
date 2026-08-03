'use client';

export default function Annotation({ note }) {
  return (
    <div className="flex items-start gap-2 pl-3 border-l-2 border-terracotta/40 py-1">
      <span className="text-terracotta/50 text-xs mt-0.5 shrink-0 select-none">→</span>
      <p className="font-mono text-[13px] text-terracotta/80 leading-relaxed">
        {note}
      </p>
    </div>
  );
}
