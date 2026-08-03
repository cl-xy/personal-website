'use client';

export default function Annotation({ note }) {
  return (
    <div className="flex items-start gap-2 pl-3 border-l border-terracotta/40">
      <span className="text-ink/40 text-xs mt-0.5 shrink-0 select-none">→</span>
      <p className="font-mono text-[13px] text-ink/50 leading-relaxed">
        {note}
      </p>
    </div>
  );
}
