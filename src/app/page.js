"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, MotionConfig } from "framer-motion";
import { Mail, Linkedin, Github, ExternalLink, X } from "lucide-react";
import { profile, benchObjects, drawer, tickerTexts } from "@/lib/bench-data";

/* ─── Ticker Machine SVG ─── */
function TickerMachine() {
  return (
    <div className="relative w-full h-full">
      <a
        href="https://ai-investment-analyst-iota.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-1 left-1 z-10 text-[8px] font-mono text-bench-brass/80 hover:text-bench-cream transition-colors flex items-center gap-0.5"
        onClick={(e) => e.stopPropagation()}
      >
        ▶ Live
      </a>
      <div className="absolute inset-0 border border-bench-brass/40 rounded-sm bg-bench-dark/50 overflow-hidden">
        <svg viewBox="0 0 80 50" className="absolute inset-0 w-full h-full opacity-40">
          <circle cx="20" cy="25" r="8" fill="none" stroke="#b8860b" strokeWidth="0.5" strokeDasharray="2 2" className="animate-[spin_8s_linear_infinite]" />
          <circle cx="38" cy="20" r="6" fill="none" stroke="#b87333" strokeWidth="0.5" strokeDasharray="2 2" className="animate-[spin_6s_linear_infinite_reverse]" />
          <circle cx="55" cy="28" r="7" fill="none" stroke="#8b6914" strokeWidth="0.5" strokeDasharray="2 2" className="animate-[spin_10s_linear_infinite]" />
        </svg>
        <div className="absolute bottom-2 left-0 right-0 h-4 overflow-hidden">
          <div className="ticker-tape whitespace-nowrap font-mono text-[10px] text-bench-brass/70">
            {tickerTexts.join("  ·  ")}
          </div>
        </div>
        <div className="absolute top-2 right-3 w-[2px] h-8 scar-crack rotate-12 rounded-full" />
        <div className="absolute top-2 right-[11px] w-3 h-1 bg-bench-copper/60 rounded-sm rotate-12" title="Repaired: heartbeat pings" />
      </div>
    </div>
  );
}

/* ─── Switchboard SVG ─── */
function Switchboard() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 border border-bench-brass/30 rounded-sm bg-bench-dark/40">
        <div className="grid grid-cols-4 gap-2 p-3 pt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-bench-dark border border-bench-brass/40" />
          ))}
        </div>
        <svg viewBox="0 0 80 30" className="absolute bottom-4 left-0 w-full h-8 overflow-visible">
          <path d="M15,5 Q25,20 40,8" fill="none" stroke="#b87333" strokeWidth="1" />
          <path d="M30,5 Q45,22 60,5" fill="none" stroke="#b8860b" strokeWidth="1" />
          <path d="M50,5 Q55,18 65,12" fill="none" stroke="#8b7e6a" strokeWidth="1" />
          <path d="M70,5 Q72,15 68,25" fill="none" stroke="#b87333" strokeWidth="1" className="pendulum" />
        </svg>
        <div className="absolute bottom-1 right-2 font-mono text-[10px] text-bench-brass/60">7,247</div>
        <div className="absolute top-3 left-2 bg-bench-brass/50 px-1 text-[8px] font-mono text-bench-cream/80 rotate-[-3deg]">PRODUCTION</div>
      </div>
    </div>
  );
}

/* ─── Specimen Jar ─── */
function SpecimenJar() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-16 h-20 border border-bench-cream/20 rounded-lg rounded-t-xl bg-gradient-to-b from-bench-cream/5 to-bench-dark/30 relative overflow-hidden">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-bench-surface rounded-sm border border-bench-muted/30 rotate-[2deg]" />
        <div className="absolute bottom-2 left-2 right-2 h-6 bg-bench-surface/40 rounded-sm">
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-bench-brass/40 rounded-sm" />
          <div className="absolute top-1 right-2 w-1 h-1 bg-bench-copper/40 rounded-sm" />
          <div className="absolute bottom-1 left-2 w-2 h-0.5 bg-bench-muted/30" />
        </div>
      </div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-hand text-[9px] text-bench-muted italic whitespace-nowrap">
        v4.2
      </div>
    </div>
  );
}

/* ─── Object Wrapper ─── */
function BenchObjectComp({ obj, onFlip, isFlipped, onSelect }) {
  const [isLifted, setIsLifted] = useState(false);

  const handleClick = () => { onSelect(obj.id); };

  const handleDoubleClick = () => {
    if (obj.back) onFlip(obj.id);
  };

  const sizes = {
    "ticker-machine": "w-44 h-28 sm:w-52 sm:h-32",
    "switchboard": "w-32 h-36 sm:w-38 sm:h-40",
    "specimen-jar": "w-24 h-28 sm:w-28 sm:h-32",
    "notebook": "w-32 h-24 sm:w-36 sm:h-28",
    "topo-map": "w-28 h-20 sm:w-32 sm:h-24",
    "brass-weights": "w-24 h-18 sm:w-28 sm:h-20",
    "seed-packets": "w-20 h-16 sm:w-24 sm:h-20",
    "polaroid-1": "w-24 h-28 sm:w-28 sm:h-32",
    "polaroid-2": "w-24 h-28 sm:w-28 sm:h-32",
    "polaroid-3": "w-24 h-28 sm:w-28 sm:h-32",
  };

  const weightDelay = { heavy: 0.3, medium: 0.6, light: 0.9, feather: 1.2 };

  return (
    <motion.div
      className={`absolute cursor-pointer ${sizes[obj.id] || "w-24 h-20"}`}
      style={{
        left: `${obj.position.x}%`,
        top: `${obj.position.y}%`,
        transform: `rotate(${obj.rotation}deg)`,
        zIndex: isLifted ? 100 : (obj.weight === "heavy" ? 10 : obj.weight === "medium" ? 5 : 2),
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -0.5, 0],
        rotate: [obj.rotation, obj.rotation + 0.3, obj.rotation],
      }}
      transition={{
        delay: weightDelay[obj.weight] || 0.5,
        duration: 0.4,
        scale: { delay: weightDelay[obj.weight] || 0.5, duration: 0.4, type: "spring", stiffness: 300, damping: 20 },
        y: { delay: 2 + Math.random() * 3, duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
        rotate: { delay: 3 + Math.random() * 4, duration: 6 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" },
      }}
      onMouseDown={() => setIsLifted(true)}
      onMouseUp={() => setIsLifted(false)}
      onMouseLeave={() => setIsLifted(false)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 1.06, rotate: 0, transition: { type: "spring", stiffness: 400, damping: 15 } }}
      role="button"
      aria-label={obj.label || obj.id}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") handleClick(); if (e.key === " ") { e.preventDefault(); handleDoubleClick(); } }}
    >
      <div className={`relative w-full h-full object-shadow ${isLifted ? "object-lifted" : ""} ${isFlipped ? "object-flipped" : ""} ${obj.id === "ticker-machine" ? "attention-pulse" : ""}`}>
        <div className="object-inner w-full h-full">
          <div className="object-front w-full h-full">
            {obj.back && (
              <button
                className="absolute top-1 right-1 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-bench-brass/40 hover:bg-bench-brass/60 text-bench-cream/70 hover:text-bench-cream transition-all text-xs"
                onClick={(e) => { e.stopPropagation(); onFlip(obj.id); }}
                aria-label="Flip card"
                tabIndex={0}
              >
                ↻
              </button>
            )}
            {obj.id === "ticker-machine" && <TickerMachine />}
            {obj.id === "switchboard" && <Switchboard />}
            {obj.id === "specimen-jar" && <SpecimenJar />}
            {obj.type === "photo" && obj.image && (
              <div className="w-full h-full bg-white p-1 rounded-sm shadow-md">
                <div className="relative w-full h-[80%] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={obj.image} alt={obj.caption || ""} className="w-full h-full object-cover" />
                </div>
                <p className="text-[9px] text-bench-dark text-center mt-1 font-hand">{obj.caption}</p>
              </div>
            )}
            {!["ticker-machine", "switchboard", "specimen-jar"].includes(obj.id) && obj.type !== "photo" && (
              <div className="w-full h-full bg-bench-surface/80 border border-bench-muted/20 rounded-sm p-2 flex flex-col justify-between">
                <span className="text-[11px] font-mono text-bench-muted">{obj.label}</span>
                {obj.sublabel && <span className="text-[9px] text-bench-brass/70">{obj.sublabel}</span>}
                {obj.scar && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full scar-glow bg-bench-gold/60" title={obj.scar.tooltip} />
                )}
              </div>
            )}
          </div>
          {obj.back && (
            <div className="object-back w-full h-full bg-bench-surface border border-bench-muted/30 rounded-sm p-2 overflow-hidden">
              <p className="text-[10px] font-mono text-bench-brass mb-1">{obj.back.title}</p>
              <p className="text-[9px] font-mono text-bench-cream/70 whitespace-pre-wrap leading-relaxed">{obj.back.content}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Detail Panel ─── */
function DetailPanel({ obj, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (closeRef.current) closeRef.current.focus();
  }, []);

  if (!obj || !obj.project) return null;
  const p = obj.project;
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-bench-dark/95 backdrop-blur-sm border-t border-bench-brass/20 p-6 max-h-[60vh] overflow-y-auto"
    >
      <button ref={closeRef} onClick={onClose} className="absolute top-4 right-4 text-bench-muted hover:text-bench-cream transition-colors" aria-label="Close"><X size={18} /></button>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold text-bench-cream">{p.title}</h2>
        <p className="text-sm text-bench-muted mt-1">{p.subtitle}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {p.stack.map((s) => (<span key={s} className="text-[10px] font-mono px-2 py-0.5 bg-bench-surface border border-bench-muted/20 rounded text-bench-muted">{s}</span>))}
        </div>
        <ul className="mt-4 space-y-1.5">
          {p.proof.map((item, i) => (<li key={i} className="text-sm text-bench-cream/80 flex items-start gap-2"><span className="text-bench-brass mt-0.5">✓</span>{item}</li>))}
        </ul>
        {obj.scar && (
          <div className="mt-4 pt-3 border-t border-bench-brass/20">
            <p className="text-xs text-bench-gold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-bench-gold/60 scar-glow" />{obj.scar.tooltip}</p>
          </div>
        )}
        {(p.links?.live || p.links?.github) && (
          <div className="mt-4 flex gap-3">
            {p.links.live && <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-bench-brass hover:text-bench-cream transition-colors"><ExternalLink size={12} /> Live</a>}
            {p.links.github && <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-bench-brass hover:text-bench-cream transition-colors"><Github size={12} /> Source</a>}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Drawer ─── */
function DrawerPanel({ isOpen, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (isOpen && closeRef.current) closeRef.current.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Contact information"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, mass: 1.5 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-bench-dark border-t border-bench-brass/30 p-6"
        >
          <button ref={closeRef} onClick={onClose} className="absolute top-4 right-4 text-bench-muted hover:text-bench-cream" aria-label="Close drawer"><X size={18} /></button>
          <div className="max-w-md mx-auto">
            <h3 className="font-mono text-sm text-bench-brass mb-3">{drawer.resume.headline}</h3>
            <ul className="space-y-2 mb-4">
              {drawer.resume.bullets.map((b, i) => (<li key={i} className="text-sm text-bench-cream/80">· {b}</li>))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-3 border-t border-bench-muted/20">
              <a href={`mailto:${drawer.resume.links.email}`} className="inline-flex items-center gap-1.5 text-sm text-bench-cream hover:text-bench-brass transition-colors"><Mail size={14} /> Email</a>
              <a href={drawer.resume.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-bench-cream hover:text-bench-brass transition-colors"><Linkedin size={14} /> LinkedIn</a>
              <a href={drawer.resume.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-bench-cream hover:text-bench-brass transition-colors"><Github size={14} /> GitHub</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main ─── */
export default function WorkshopBench() {
  const [flipped, setFlipped] = useState(new Set());
  const [selectedId, setSelectedId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lampOn, setLampOn] = useState(false);
  const triggerRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setLampOn(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (drawerOpen) setDrawerOpen(false);
        else if (selectedId) setSelectedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen, selectedId]);

  const toggleFlip = useCallback((id) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleSelect = useCallback((id) => {
    triggerRef.current = document.activeElement;
    setSelectedId(id);
  }, []);

  const openDrawer = useCallback(() => {
    triggerRef.current = document.activeElement;
    setDrawerOpen(true);
  }, []);

  // Restore focus to the triggering element when overlays close
  useEffect(() => {
    if (!selectedId && !drawerOpen && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [selectedId, drawerOpen]);

  const selectedObj = benchObjects.find((o) => o.id === selectedId);

  return (
    <MotionConfig reducedMotion="user">
    <div className="h-screen w-screen overflow-hidden bg-bench-bg relative">
      <div inert={selectedId || drawerOpen ? true : undefined}>
      {/* Version nav */}
      <nav className="fixed top-3 left-3 z-50">
        <a
          href="../"
          className="text-[10px] font-mono text-bench-muted/50 hover:text-bench-cream/70 transition-colors"
          aria-label="Back to all versions"
        >
          ← versions
        </a>
      </nav>

      <motion.div
        className="absolute inset-0 lamp-cone"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: lampOn ? 1 : 0, scale: lampOn ? 1 : 0.6 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="absolute top-0 left-0 right-0 h-[10%] bg-gradient-to-b from-bench-dark to-bench-bg/80 border-b border-bench-muted/10 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 800 60" preserveAspectRatio="xMidYMid slice">
          {/* Peg holes */}
          <circle cx="100" cy="12" r="2.5" fill="#8b7e6a" />
          <circle cx="250" cy="12" r="2.5" fill="#8b7e6a" />
          <circle cx="400" cy="12" r="2.5" fill="#8b7e6a" />
          <circle cx="550" cy="12" r="2.5" fill="#8b7e6a" />
          <circle cx="700" cy="12" r="2.5" fill="#8b7e6a" />
          {/* Hanging ruler */}
          <rect x="95" y="14" width="10" height="45" rx="1" fill="none" stroke="#b8860b" strokeWidth="0.8" />
          <line x1="97" y1="20" x2="103" y2="20" stroke="#b8860b" strokeWidth="0.4" />
          <line x1="97" y1="30" x2="101" y2="30" stroke="#b8860b" strokeWidth="0.4" />
          <line x1="97" y1="40" x2="103" y2="40" stroke="#b8860b" strokeWidth="0.4" />
          {/* Magnifying glass */}
          <circle cx="250" cy="35" r="10" fill="none" stroke="#b87333" strokeWidth="0.8" />
          <line x1="257" y1="42" x2="264" y2="50" stroke="#b87333" strokeWidth="1.2" strokeLinecap="round" />
          {/* Pliers */}
          <path d="M395,14 L395,30 M405,14 L405,30 M393,30 Q400,38 407,30 M395,30 L392,45 M405,30 L408,45" fill="none" stroke="#8b7e6a" strokeWidth="0.8" />
          {/* Coiled wire */}
          <path d="M540,14 Q545,20 550,18 Q555,16 552,24 Q549,32 555,35 L555,50" fill="none" stroke="#b87333" strokeWidth="0.6" />
          {/* Hook with key */}
          <path d="M700,14 L700,22 Q700,25 697,25 Q694,25 694,22" fill="none" stroke="#8b7e6a" strokeWidth="0.8" />
          <ellipse cx="700" cy="35" rx="5" ry="8" fill="none" stroke="#b8860b" strokeWidth="0.6" />
        </svg>
      </div>

      <div className="absolute inset-0 top-[10%] bottom-[8%] bench-surface">
        <div className="absolute top-[20%] right-[15%] w-12 h-12 rounded-full border border-bench-muted/15 opacity-40" />
        <div className="absolute top-[60%] left-[35%] w-16 h-[1px] bg-bench-muted/10 rotate-[-5deg]" />

        {lampOn && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-[0.15]">
            <line x1="42%" y1="35%" x2="28%" y2="55%" stroke="#b8860b" strokeWidth="0.5" strokeDasharray="4 6" />
            <line x1="18%" y1="25%" x2="28%" y2="55%" stroke="#b87333" strokeWidth="0.5" strokeDasharray="4 6" />
          </svg>
        )}

        <AnimatePresence>
          {lampOn && benchObjects.map((obj) => (
            <BenchObjectComp
              key={obj.id}
              obj={obj}
              isFlipped={flipped.has(obj.id)}
              onFlip={toggleFlip}
              onSelect={handleSelect}
            />
          ))}
        </AnimatePresence>

        {lampOn && (
          <div className="absolute" style={{ left: "10%", top: "48%" }}>
            <div className="w-[3px] bg-bench-green/70 rounded-full sprout-grow" />
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.5] }}
          transition={{ delay: 1.5, duration: 4, times: [0, 0.1, 0.6, 1] }}
          className="absolute top-[15%] left-1/2 -translate-x-1/2 text-sm font-hand text-bench-cream/80 italic z-20 pointer-events-none"
        >
          click to explore. ↻ to flip.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-bench-dark border-t border-bench-muted/20 flex items-center justify-center">
        <button
          onClick={openDrawer}
          className={`w-12 h-3 rounded-full transition-all cursor-pointer ${
            drawerOpen ? "bg-bench-brass/40 translate-y-[1px]" : "bg-bench-brass/60 hover:bg-bench-brass"
          }`}
          aria-label="Open drawer"
        />
      </div>

      <div className="absolute bottom-[9%] left-4 sm:left-6">
        <div className="brass-plate px-4 py-2 rounded-sm shadow-lg">
          <p className="text-sm font-mono text-bench-dark font-bold tracking-wide">{profile.name}</p>
          <p className="text-xs font-mono text-bench-dark/70">{profile.role} · {profile.location}</p>
        </div>
      </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedObj?.project && (
          <DetailPanel obj={selectedObj} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedId && selectedObj && !selectedObj.project && selectedObj.type !== "photo" && selectedObj.back && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedObj.back.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-bench-dark/95 backdrop-blur-sm border-t border-bench-brass/20 p-6"
          >
            <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 text-bench-muted hover:text-bench-cream transition-colors" aria-label="Close"><X size={18} /></button>
            <div className="max-w-md mx-auto">
              <h2 className="text-sm font-mono text-bench-brass mb-2">{selectedObj.back.title}</h2>
              <pre className="text-sm font-mono text-bench-cream/80 whitespace-pre-wrap leading-relaxed">{selectedObj.back.content}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedId && selectedObj?.type === "photo" && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedObj?.caption || "Photo"}
            className="fixed inset-0 z-50 flex items-center justify-center bg-bench-dark/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="bg-white p-3 rounded-sm shadow-2xl max-w-sm"
              initial={{ scale: 0.6, rotate: selectedObj.rotation }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.6, rotate: selectedObj.rotation }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <img src={selectedObj.image} alt={selectedObj.caption} className="w-full rounded-sm" />
              <p className="text-sm text-bench-dark text-center mt-2 font-hand">{selectedObj.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DrawerPanel isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
    </MotionConfig>
  );
}
