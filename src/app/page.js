"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, ExternalLink, X, MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";
import { profile, metrics, projects, failures, personal, regions, trails } from "@/lib/atlas-data";

/* ─── SVG Map ─── */
function AtlasMap({ onSelectProject, selectedId }) {
  const regionMap = Object.fromEntries(regions.map((r) => [r.id, r]));

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="Evidence atlas map">
      <g className="opacity-[0.08]" stroke="#7B9E87" fill="none" strokeWidth="0.3">
        <ellipse cx="40" cy="35" rx="30" ry="18" />
        <ellipse cx="40" cy="35" rx="22" ry="13" />
        <ellipse cx="60" cy="65" rx="28" ry="16" />
        <ellipse cx="60" cy="65" rx="20" ry="11" />
        <ellipse cx="25" cy="70" rx="15" ry="10" />
        <ellipse cx="75" cy="30" rx="16" ry="12" />
      </g>

      {trails.map((t, i) => {
        const from = regionMap[t.from];
        const to = regionMap[t.to];
        if (!from || !to) return null;
        return (
          <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#C96F4A" strokeWidth="0.2" strokeDasharray="1 0.8" opacity="0.35" />
        );
      })}

      {failures.map((f) => {
        const proj = projects.find((p) => p.id === f.project);
        if (!proj) return null;
        const projRegion = regionMap[proj.region];
        const basecamp = regionMap["basecamp"];
        if (!projRegion || !basecamp) return null;
        const idx = failures.filter((x) => x.project === f.project).indexOf(f);
        const t = 0.3 + idx * 0.15;
        const fx = basecamp.x + (projRegion.x - basecamp.x) * t;
        const fy = basecamp.y + (projRegion.y - basecamp.y) * t;
        return (
          <circle key={f.id} cx={fx} cy={fy} r="0.6" fill="#D4A04A" opacity="0.6">
            <title>{f.title}</title>
          </circle>
        );
      })}

      {regions.map((r) => {
        const isHub = r.type === "hub";
        const proj = projects.find((p) => p.region === r.id);
        const isSelected = proj && proj.id === selectedId;
        return (
          <g key={r.id} className="cursor-pointer" onClick={() => proj && onSelectProject(proj.id)}>
            {isHub ? (
              <circle cx={r.x} cy={r.y} r="2" fill="#C96F4A" opacity="0.9" />
            ) : (
              <polygon
                points={`${r.x},${r.y - 2} ${r.x - 1.5},${r.y + 1} ${r.x + 1.5},${r.y + 1}`}
                fill={isSelected ? "#C96F4A" : "#7B9E87"}
                opacity="0.85"
              />
            )}
            <text x={r.x} y={r.y + (isHub ? 4.5 : 4)} textAnchor="middle" fontSize="2.2" fontFamily="Inter, sans-serif" fontWeight="500" fill="#2D3748" opacity="0.8">
              {r.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Detail Panel ─── */
function DetailPanel({ project, onClose }) {
  const projectFailures = failures.filter((f) => f.project === project.id);
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className="bg-atlas-surface border border-atlas-border rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-atlas-slate">{project.title}</h3>
          <p className="text-sm text-atlas-muted mt-0.5">{project.subtitle}</p>
        </div>
        <button onClick={onClose} className="p-1 text-atlas-muted hover:text-atlas-slate transition-colors" aria-label="Close"><X size={18} /></button>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map((s) => (
          <span key={s} className="text-xs px-2 py-0.5 bg-atlas-cream border border-atlas-border rounded text-atlas-muted">{s}</span>
        ))}
      </div>
      <div className="space-y-3 text-sm">
        <div>
          <p className="font-medium text-atlas-slate mb-1">Objective</p>
          <p className="text-atlas-muted leading-relaxed">{project.objective}</p>
        </div>
        <div>
          <p className="font-medium text-atlas-slate mb-1">Outcome</p>
          <p className="text-atlas-muted leading-relaxed">{project.outcome}</p>
        </div>
      </div>
      {projectFailures.length > 0 && (
        <div className="mt-5 pt-4 border-t border-atlas-border">
          <p className="text-sm font-medium text-atlas-amber mb-3">What broke</p>
          <div className="space-y-3">
            {projectFailures.map((f) => (
              <div key={f.id} className="border-l-2 border-atlas-amber/40 pl-3">
                <p className="text-sm font-medium text-atlas-slate">{f.title}</p>
                <p className="text-xs text-atlas-muted mt-1">{f.symptom}</p>
                <p className="text-xs text-atlas-sage mt-1">Fix: {f.fix}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {(project.links.live || project.links.github) && (
        <div className="mt-4 pt-3 border-t border-atlas-border flex gap-3">
          {project.links.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-atlas-terracotta hover:underline"><ExternalLink size={12} /> Live demo</a>}
          {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-atlas-terracotta hover:underline"><Github size={12} /> Source</a>}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Quick Route Overlay ─── */
function QuickRoute({ onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-atlas-bg/95 backdrop-blur-sm overflow-y-auto">
      <div className="max-w-xl mx-auto px-5 py-12 sm:py-20">
        <button onClick={onClose} className="fixed top-4 right-4 sm:top-6 sm:right-6 p-2 text-atlas-muted hover:text-atlas-slate transition-colors" aria-label="Close"><X size={20} /></button>
        <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-atlas-slate mb-1">{profile.name}</h1>
        <p className="text-atlas-muted">{profile.role} in {profile.location}</p>
        <p className="text-sm text-atlas-muted mt-2 max-w-md">{profile.headline}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {metrics.map((m) => (
            <div key={m.label} className="bg-atlas-surface border border-atlas-border rounded-lg p-3">
              <div className="text-lg font-semibold text-atlas-terracotta font-mono">{m.value}</div>
              <div className="text-xs text-atlas-muted mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="bg-atlas-surface border border-atlas-border rounded-lg p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium text-atlas-slate text-sm">{p.title}</h3>
                  <p className="text-xs text-atlas-muted mt-0.5">{p.subtitle}</p>
                </div>
                {p.links.live && <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="text-atlas-terracotta shrink-0"><ExternalLink size={14} /></a>}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-sm text-atlas-slate hover:text-atlas-terracotta transition-colors"><Mail size={16} /> {profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-atlas-slate hover:text-atlas-terracotta transition-colors"><Linkedin size={16} /> LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-atlas-slate hover:text-atlas-terracotta transition-colors"><Github size={16} /> GitHub</a>
        </div>
        <button onClick={onClose} className="mt-8 text-sm text-atlas-muted hover:text-atlas-slate transition-colors">← back to atlas</button>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function EvidenceAtlas() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showQuickRoute, setShowQuickRoute] = useState(false);
  const selected = projects.find((p) => p.id === selectedProject);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-atlas-bg/90 backdrop-blur-sm border-b border-atlas-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={14} className="text-atlas-terracotta" />
            <span className="font-medium text-atlas-slate">{profile.name}</span>
            <span className="text-atlas-muted hidden sm:inline">/ Evidence Atlas</span>
          </div>
          <button onClick={() => setShowQuickRoute(true)} className="text-xs font-medium px-3 py-1.5 bg-atlas-terracotta text-white rounded-md hover:bg-atlas-terracotta/90 transition-colors">Quick route →</button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-atlas-slate tracking-tight">{profile.name}</h1>
            <p className="text-lg text-atlas-muted mt-2">{profile.role} in {profile.location}</p>
            <p className="text-atlas-slate/80 mt-4 leading-relaxed max-w-md">{profile.headline}. NUS Business Analytics (Hons), currently at Citi building LLM agents, RAG pipelines, and full-stack AI services.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              {metrics.map((m) => (
                <div key={m.label} className="bg-atlas-surface border border-atlas-border rounded-lg px-3 py-2">
                  <span className="text-lg font-semibold text-atlas-terracotta font-mono">{m.value}</span>
                  <span className="text-xs text-atlas-muted ml-1.5">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowQuickRoute(true)} className="text-sm px-4 py-2 bg-atlas-terracotta text-white rounded-md hover:bg-atlas-terracotta/90 transition-colors">Quick route →</button>
              <a href="#atlas" className="text-sm px-4 py-2 border border-atlas-border text-atlas-muted rounded-md hover:border-atlas-slate/30 hover:text-atlas-slate transition-colors">Explore the atlas ↓</a>
            </div>
          </div>
          <div className="hidden lg:block h-72 opacity-80">
            <AtlasMap onSelectProject={() => {}} selectedId={null} />
          </div>
        </div>
      </section>

      <section id="atlas" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-xl font-serif font-semibold text-atlas-slate mb-2">The Atlas</h2>
        <p className="text-sm text-atlas-muted mb-6">Click a peak to explore. Amber dots mark where things broke along the way.</p>
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-atlas-surface border border-atlas-border rounded-xl p-4 h-[400px] sm:h-[450px]">
            <AtlasMap onSelectProject={setSelectedProject} selectedId={selectedProject} />
          </div>
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selected ? (
                <DetailPanel key={selected.id} project={selected} onClose={() => setSelectedProject(null)} />
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-atlas-surface border border-atlas-border rounded-xl p-6 text-center">
                  <p className="text-sm text-atlas-muted">Select a peak on the map to view project details.</p>
                  <div className="mt-4 space-y-2">
                    {projects.map((p) => (
                      <button key={p.id} onClick={() => setSelectedProject(p.id)} className="w-full text-left px-3 py-2 rounded-lg hover:bg-atlas-cream transition-colors flex items-center justify-between group">
                        <span className="text-sm text-atlas-slate">{p.title}</span>
                        <ChevronRight size={14} className="text-atlas-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-xl font-serif font-semibold text-atlas-slate mb-2">Field Notes</h2>
        <p className="text-sm text-atlas-muted mb-6">What broke, why it mattered, and what changed.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {failures.map((f) => (
            <div key={f.id} className="border-l-2 border-atlas-amber/50 pl-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-medium text-atlas-slate">{f.title}</h4>
                <span className="text-[10px] px-1.5 py-0.5 rounded border border-atlas-border bg-atlas-cream text-atlas-muted">{f.severity}</span>
              </div>
              <p className="text-xs text-atlas-muted leading-relaxed"><span className="font-medium">Symptom:</span> {f.symptom}</p>
              <p className="text-xs text-atlas-muted leading-relaxed mt-1"><span className="font-medium">Root cause:</span> {f.rootCause}</p>
              <p className="text-xs text-atlas-sage leading-relaxed mt-1"><span className="font-medium">Fix:</span> {f.fix}</p>
              <p className="text-xs text-atlas-slate/70 leading-relaxed mt-1 italic">{f.lesson}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-xl font-serif font-semibold text-atlas-slate mb-2">Off-Trail</h2>
        <p className="text-sm text-atlas-muted mb-6">{personal.tagline}</p>
        <div className="grid grid-cols-3 gap-3">
          {personal.photos.map((photo, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-atlas-border">
              <Image src={photo.src} alt={photo.caption} fill className="object-cover" sizes="(max-width: 768px) 33vw, 200px" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                <p className="text-[10px] text-white/90">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-atlas-border bg-atlas-cream/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-atlas-muted">{profile.name} / {profile.role} / {profile.location}</p>
          <div className="flex gap-4">
            <a href={`mailto:${profile.email}`} className="text-atlas-muted hover:text-atlas-terracotta transition-colors" aria-label="Email"><Mail size={18} /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-atlas-muted hover:text-atlas-terracotta transition-colors" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-atlas-muted hover:text-atlas-terracotta transition-colors" aria-label="GitHub"><Github size={18} /></a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showQuickRoute && <QuickRoute onClose={() => setShowQuickRoute(false)} />}
      </AnimatePresence>
    </div>
  );
}
