"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  TrendingUp,
  Code,
  AlertTriangle,
  Heart,
  CheckCircle,
  ExternalLink,
  Mail,
  Linkedin,
  Github,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { candidate, signals, evidence, verdict } from "@/lib/case-data";

const iconMap = {
  TrendingUp,
  Code,
  AlertTriangle,
  Heart,
};

const signalColors = {
  impact: "bg-case-accent/10 text-case-accent",
  technical: "bg-blue-50 text-blue-700",
  resilience: "bg-red-50 text-case-red",
  culture: "bg-emerald-50 text-case-green",
};

const signalDots = {
  impact: "bg-case-accent",
  technical: "bg-blue-600",
  resilience: "bg-case-red",
  culture: "bg-case-green",
};

const severityColors = {
  critical: "bg-case-red text-white",
  high: "bg-orange-500 text-white",
  medium: "bg-case-amber text-white",
  low: "bg-yellow-400 text-yellow-900",
};

export default function CaseFilePage() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const verdictRef = useRef(null);

  const filteredEvidence = activeFilter
    ? evidence.filter((e) => e.signal === activeFilter)
    : evidence;

  function scrollToVerdict() {
    verdictRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function toggleFilter(id) {
    setActiveFilter((prev) => (prev === id ? null : id));
  }

  return (
    <div className="min-h-screen">
      {/* Skip to verdict - always visible */}
      <button
        onClick={scrollToVerdict}
        className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-case-muted hover:text-case-accent bg-case-surface border border-case-border rounded-full shadow-sm transition-colors duration-150"
      >
        Skip to verdict <ArrowRight size={14} />
      </button>

      {/* Header */}
      <header className="pt-16 pb-12 px-6 text-center">
        <p className="text-xs font-semibold tracking-widest text-case-muted uppercase mb-4">
          Candidate Evaluation
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-case-slate mb-3">
          {candidate.name}
        </h1>
        <p className="text-lg text-case-muted">
          {candidate.role} · {candidate.location} · {candidate.education}
        </p>
        <p className="text-sm text-case-muted mt-1">
          {candidate.current}
        </p>
      </header>

      {/* Signal Filters */}
      <nav className="sticky top-0 z-40 bg-case-bg/95 backdrop-blur-sm border-b border-case-border">
        <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap gap-2 justify-center">
          {signals.map((signal) => {
            const Icon = iconMap[signal.icon];
            const isActive = activeFilter === signal.id;
            return (
              <button
                key={signal.id}
                onClick={() => toggleFilter(signal.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                  isActive
                    ? "bg-case-accent text-white border-case-accent shadow-sm"
                    : "bg-case-surface text-case-slate border-case-border hover:border-case-accent/40"
                }`}
              >
                <Icon size={16} />
                {signal.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-case-bg text-case-muted"
                  }`}
                >
                  {signal.count}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Evidence Grid */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvidence.map((item, index) => (
                <EvidenceCard
                  key={item.id}
                  item={item}
                  index={index}
                  expanded={expandedCard === item.id}
                  onToggle={() =>
                    setExpandedCard((prev) =>
                      prev === item.id ? null : item.id
                    )
                  }
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </main>

      {/* Verdict Section */}
      <section ref={verdictRef} className="max-w-5xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-case-surface border border-case-border rounded-xl shadow-sm overflow-hidden"
        >
          <div className="flex">
            <div className="w-1.5 bg-case-green flex-shrink-0" />
            <div className="p-8 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold tracking-widest text-case-muted uppercase">
                  Recommendation
                </span>
              </div>
              <h2 className="text-3xl font-bold text-case-green mb-1">
                {verdict.recommendation}
              </h2>
              <p className="text-sm text-case-muted mb-4">
                Confidence: {verdict.confidence}
              </p>
              <p className="text-case-slate leading-relaxed mb-6">
                {verdict.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {verdict.fitFor.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 text-sm font-medium bg-case-green/10 text-case-green rounded-full"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${candidate.email}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-case-accent text-white rounded-lg hover:bg-case-accent/90 transition-colors duration-150"
                >
                  <Mail size={16} /> Email
                </a>
                <a
                  href={candidate.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-case-surface text-case-slate border border-case-border rounded-lg hover:border-case-accent/40 transition-colors duration-150"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  href={candidate.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-case-surface text-case-slate border border-case-border rounded-lg hover:border-case-accent/40 transition-colors duration-150"
                >
                  <Github size={16} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-case-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-case-muted">
          <span>{candidate.name} · {candidate.role} · {candidate.location}</span>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${candidate.email}`}
              className="hover:text-case-accent transition-colors"
            >
              {candidate.email}
            </a>
            <a
              href={candidate.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-case-accent transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={candidate.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-case-accent transition-colors"
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function EvidenceCard({ item, index, expanded, onToggle }) {
  const isFailure = item.signal === "resilience";
  const hasExpandableContent = isFailure && (item.rootCause || item.fix || item.lesson);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      onClick={hasExpandableContent ? onToggle : undefined}
      className={`bg-case-surface border border-case-border rounded-xl p-5 shadow-sm ${
        hasExpandableContent ? "cursor-pointer hover:shadow-md" : ""
      } transition-shadow duration-150`}
    >
      {/* Top row: signal badge + verified/severity */}
      <div className="flex items-start justify-between mb-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${signalColors[item.signal]}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${signalDots[item.signal]}`} />
          {signals.find((s) => s.id === item.signal)?.label}
        </span>
        <div className="flex items-center gap-2">
          {item.severity && (
            <span
              className={`px-2 py-0.5 text-xs font-semibold rounded uppercase ${severityColors[item.severity]}`}
            >
              {item.severity}
            </span>
          )}
          {item.verified && (
            <span className="flex items-center gap-1 text-xs text-case-green font-medium">
              <CheckCircle size={12} /> Verified
            </span>
          )}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-case-muted hover:text-case-accent transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-case-slate mb-2">
        {item.title}
      </h3>

      {/* Body */}
      <p className="text-sm text-case-muted leading-relaxed">{item.body}</p>

      {/* Project tag */}
      {item.project && (
        <p className="mt-3 text-xs text-case-muted">
          Project: <span className="font-medium text-case-slate">{item.project}</span>
        </p>
      )}

      {/* Photo */}
      {item.photo && (
        <div className="mt-3 relative w-full h-40 rounded-lg overflow-hidden">
          <Image
            src={item.photo}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Expandable failure details */}
      <AnimatePresence>
        {expanded && hasExpandableContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-case-border space-y-2">
              {item.rootCause && (
                <p className="text-sm">
                  <span className="font-medium text-case-red">Root cause:</span>{" "}
                  <span className="text-case-muted">{item.rootCause}</span>
                </p>
              )}
              {item.fix && (
                <p className="text-sm">
                  <span className="font-medium text-case-green">Fix:</span>{" "}
                  <span className="text-case-muted">{item.fix}</span>
                </p>
              )}
              {item.lesson && (
                <p className="text-sm">
                  <span className="font-medium text-case-amber">Lesson:</span>{" "}
                  <span className="text-case-muted">{item.lesson}</span>
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
