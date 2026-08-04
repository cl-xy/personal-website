"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, ExternalLink, X, MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";
import { profile, metrics, projects, failures, personal, regions, trails } from "@/lib/atlas-data";

/* ─── Generative Contour Helpers ─── */
function seededRandom(i, seed) {
  const s = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function generateContourPath(cx, cy, baseRadius, seed, points = 32) {
  const coords = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const noise = seededRandom(i, seed) * 0.3 + 0.85;
    const r = baseRadius * noise;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    coords.push({ x, y });
  }
  // Build smooth bezier path through points
  let d = `M ${coords[0].x},${coords[0].y}`;
  for (let i = 0; i < coords.length; i++) {
    const curr = coords[i];
    const next = coords[(i + 1) % coords.length];
    const cpx = (curr.x + next.x) / 2;
    const cpy = (curr.y + next.y) / 2;
    d += ` Q ${curr.x},${curr.y} ${cpx},${cpy}`;
  }
  d += " Z";
  return d;
}

// Generate contour data once (deterministic from seeds)
const contourData = regions.map((region, ri) => {
  const radii = [8, 13, 19];
  return radii.map((r, li) => ({
    path: generateContourPath(region.x, region.y, r, ri * 10 + li * 3),
    key: `${region.id}-${li}`,
  }));
}).flat();

/* ─── Trail length calculator ─── */
function getTrailLength(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/* ─── SVG Map ─── */
function AtlasMap({ onSelectProject, selectedId, enableAnimations = false }) {
  const regionMap = Object.fromEntries(regions.map((r) => [r.id, r]));
  const [hasAnimated, setHasAnimated] = useState(false);
  const [flyTarget, setFlyTarget] = useState(null);

  useEffect(() => {
    if (enableAnimations) {
      setHasAnimated(true);
    }
  }, [enableAnimations]);

  // Fly-to: compute transform when a project is selected
  useEffect(() => {
    if (selectedId) {
      const proj = projects.find((p) => p.id === selectedId);
      if (proj) {
        const region = regionMap[proj.region];
        if (region) {
          // Center the view on the region with 1.3x zoom
          const scale = 1.3;
          const dx = 50 - region.x * scale;
          const dy = 50 - region.y * scale;
          setFlyTarget({ dx, dy, scale });
        }
      }
    } else {
      setFlyTarget(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const transformStyle = flyTarget
    ? `translate(${flyTarget.dx}px, ${flyTarget.dy}px) scale(${flyTarget.scale})`
    : "translate(0px, 0px) scale(1)";

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" aria-label="Evidence atlas map">
      {/* Paper grain texture via SVG filter */}
      <defs>
        <filter id="paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray-noise" />
          <feBlend in="SourceGraphic" in2="gray-noise" mode="multiply" />
        </filter>
      </defs>
      {/* Grain overlay rect */}
      <rect x="0" y="0" width="100" height="100" fill="white" opacity="0.03" filter="url(#paper-grain)" />

      <g
        style={{
          transform: transformStyle,
          transformOrigin: "50px 50px",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Generative contour lines */}
        <g stroke="#7B9E87" fill="none" strokeWidth="0.25">
          {contourData.map((c, i) => (
            <path
              key={c.key}
              d={c.path}
              opacity="0.10"
              strokeDasharray={enableAnimations && !hasAnimated ? "200" : "none"}
              strokeDashoffset={enableAnimations && !hasAnimated ? "200" : "0"}
              style={
                enableAnimations
                  ? {
                      animation: `contour-draw 0.8s ease-out ${i * 0.05}s forwards`,
                      strokeDasharray: "200",
                      strokeDashoffset: hasAnimated ? "0" : "200",
                    }
                  : {}
              }
            />
          ))}
        </g>

        {/* Trail paths with draw animation */}
        {trails.map((t, i) => {
          const from = regionMap[t.from];
          const to = regionMap[t.to];
          if (!from || !to) return null;
          const length = getTrailLength(from.x, from.y, to.x, to.y);
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#C96F4A"
              strokeWidth="0.2"
              strokeDasharray={enableAnimations ? `${length}` : "1 0.8"}
              strokeDashoffset={enableAnimations && !hasAnimated ? length : 0}
              opacity="0.35"
              style={
                enableAnimations
                  ? {
                      animation: `trail-draw 1.5s ease-out ${0.3 + i * 0.2}s forwards`,
                      strokeDashoffset: hasAnimated ? "0" : length,
                    }
                  : {}
              }
            />
          );
        })}

        {/* Failure dots */}
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

        {/* Region peaks with elevation labels */}
        {regions.map((r) => {
          const isHub = r.type === "hub";
          const proj = projects.find((p) => p.region === r.id);
          const isSelected = proj && proj.id === selectedId;
          return (
            <g key={r.id} className="cursor-pointer" onClick={() => proj && onSelectProject(proj.id)}>
              {isHub ? (
                <circle cx={r.x} cy={r.y} r="2" fill="#C96F4A" opacity="0.9" />
              ) : (
                <>
                  <polygon
                    points={`${r.x},${r.y - 2} ${r.x - 1.5},${r.y + 1} ${r.x + 1.5},${r.y + 1}`}
                    fill={isSelected ? "#C96F4A" : "#7B9E87"}
                    opacity="0.85"
                  />
                  {/* Elevation label */}
                  {proj && (
                    <text
                      x={r.x + 2.5}
                      y={r.y - 0.5}
                      fontSize="1.8"
                      fontFamily="Inter, sans-serif"
                      fontWeight="400"
                      fill="#8B7E74"
                      opacity="0.7"
                      transform={`rotate(-8, ${r.x + 2.5}, ${r.y - 0.5})`}
                    >
                      {proj.elevation}
                    </text>
                  )}
                </>
              )}
              <text x={r.x} y={r.y + (isHub ? 4.5 : 4)} textAnchor="middle" fontSize="2.2" fontFamily="Inter, sans-serif" fontWeight="500" fill="#2D3748" opacity="0.8">
                {r.label}
              </text>
            </g>
          );
        })}

        {/* Compass rose (bottom-right) */}
        <g opacity="0.35" stroke="#8B7E74" strokeWidth="0.2" fill="none">
          <circle cx="90" cy="90" r="3" />
          <line x1="90" y1="86.5" x2="90" y2="93.5" />
          <line x1="86.5" y1="90" x2="93.5" y2="90" />
          <text x="90" y="85.5" textAnchor="middle" fontSize="1.6" fontFamily="Inter, sans-serif" fill="#8B7E74" stroke="none">N</text>
          <text x="90" y="95.5" textAnchor="middle" fontSize="1.4" fontFamily="Inter, sans-serif" fill="#8B7E74" stroke="none">S</text>
          <text x="85" y="90.5" textAnchor="middle" fontSize="1.4" fontFamily="Inter, sans-serif" fill="#8B7E74" stroke="none">W</text>
          <text x="95" y="90.5" textAnchor="middle" fontSize="1.4" fontFamily="Inter, sans-serif" fill="#8B7E74" stroke="none">E</text>
        </g>

        {/* Scale bar (bottom-left) */}
        <g opacity="0.3">
          <line x1="5" y1="94" x2="15" y2="94" stroke="#8B7E74" strokeWidth="0.3" />
          <line x1="5" y1="93" x2="5" y2="95" stroke="#8B7E74" strokeWidth="0.2" />
          <line x1="15" y1="93" x2="15" y2="95" stroke="#8B7E74" strokeWidth="0.2" />
          <text x="10" y="96.5" textAnchor="middle" fontSize="1.4" fontFamily="Inter, sans-serif" fill="#8B7E74">10 km</text>
        </g>
      </g>
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
      {/* Global CSS for SVG animations */}
      <style jsx global>{`
        @keyframes contour-draw {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes trail-draw {
          from { stroke-dashoffset: inherit; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

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
          <div className="lg:col-span-3 relative bg-atlas-surface border border-atlas-border rounded-xl p-4 h-[400px] sm:h-[450px] overflow-hidden paper-grain">
            <AtlasMap onSelectProject={setSelectedProject} selectedId={selectedProject} enableAnimations={true} />
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
