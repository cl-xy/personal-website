'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, X, ExternalLink } from 'lucide-react';
import { organisms, rootConnections, pollenKeywords, specimenLabel } from '@/lib/greenhouse-data';

// Generate a random cubic bezier filament path from a center point
function generateFilament(cx, cy, angle, length, jitter = 15) {
  const rad = (angle * Math.PI) / 180;
  const endX = cx + Math.cos(rad) * length;
  const endY = cy + Math.sin(rad) * length;
  const cp1X = cx + Math.cos(rad) * length * 0.25 + (Math.random() - 0.5) * jitter * 0.5;
  const cp1Y = cy + Math.sin(rad) * length * 0.25 + (Math.random() - 0.5) * jitter * 0.5;
  const cp2X = cx + Math.cos(rad) * length * 0.75 + (Math.random() - 0.5) * jitter * 0.5;
  const cp2Y = cy + Math.sin(rad) * length * 0.75 + (Math.random() - 0.5) * jitter * 0.5;
  return {
    path: `M ${cx} ${cy} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`,
    end: { x: endX, y: endY },
  };
}

// Generate sub-branches off a main filament endpoint
function generateSubBranches(endX, endY, baseAngle, count = 3, length = 30) {
  const branches = [];
  for (let i = 0; i < count; i++) {
    const subAngle = baseAngle + (Math.random() - 0.5) * 60;
    const subLength = length * (0.5 + Math.random() * 0.5);
    const rad = (subAngle * Math.PI) / 180;
    const subEndX = endX + Math.cos(rad) * subLength;
    const subEndY = endY + Math.sin(rad) * subLength;
    const cpX = endX + Math.cos(rad) * subLength * 0.5 + (Math.random() - 0.5) * 8;
    const cpY = endY + Math.sin(rad) * subLength * 0.5 + (Math.random() - 0.5) * 8;
    branches.push({
      path: `M ${endX} ${endY} Q ${cpX} ${cpY}, ${subEndX} ${subEndY}`,
      end: { x: subEndX, y: subEndY },
    });
  }
  return branches;
}

// Organism SVG component
function OrganismSVG({ organism, isHovered, onClick, loaded }) {
  const sizeMap = { large: 120, medium: 90, small: 70, seedling: 55 };
  const baseLength = sizeMap[organism.size] || 80;
  const cx = 150;
  const cy = 150;

  const filaments = useMemo(() => {
    const seed = organism.id.charCodeAt(0) + organism.id.charCodeAt(1);
    return organism.branches.map((branch, i) => {
      const angle = branch.angle + (((seed + i * 7) % 10) - 5);
      const length = baseLength + (((seed + i * 13) % 20) - 10);
      const main = generateFilament(cx, cy, angle, length);
      const subs = generateSubBranches(main.end.x, main.end.y, angle, 2 + (i % 2), 25);
      return { main, subs, branch };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organism.id]);

  const scarPositions = useMemo(() => {
    return organism.scars.map((scar) => {
      if (scar.position.bridge) {
        return { x: cx + 30, y: cy - 10 };
      }
      const branchIdx = scar.position.branch || 0;
      const filament = filaments[branchIdx];
      if (!filament) return { x: cx, y: cy };
      const offset = scar.position.offset || 0.5;
      return {
        x: cx + (filament.main.end.x - cx) * offset,
        y: cy + (filament.main.end.y - cy) * offset,
      };
    });
  }, [organism.scars, filaments]);

  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full h-full cursor-pointer"
      onClick={onClick}
      role="button"
      aria-label={`View ${organism.name} project details`}
    >
      {/* Center node */}
      <circle
        cx={cx}
        cy={cy}
        r={organism.size === 'large' ? 6 : organism.size === 'medium' ? 5 : 4}
        fill={organism.color}
        opacity={loaded ? 0.9 : 0}
        className="transition-opacity duration-700"
      >
        {loaded && (
          <animate
            attributeName="r"
            values={`${organism.size === 'large' ? 5 : 4};${organism.size === 'large' ? 7 : 5};${organism.size === 'large' ? 5 : 4}`}
            dur="4s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Bioluminescent pulse ring on hover */}
      {isHovered && loaded && (
        <circle cx={cx} cy={cy} r={10} fill="none" stroke={organism.color} strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="8" to={baseLength * 0.7} dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.6" to="0" dur="1.2s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Filament paths */}
      {filaments.map((f, i) => (
        <g key={i}>
          <path
            d={f.main.path}
            fill="none"
            stroke={organism.color}
            strokeWidth={isHovered ? 1.8 : 1.2}
            opacity={loaded ? (isHovered ? 0.9 : 0.6) : 0}
            strokeDasharray="1000"
            strokeDashoffset={loaded ? 0 : 1000}
            className="filament-path transition-all duration-1000"
            style={{ transitionDelay: `${i * 200}ms` }}
          />
          {/* Sub-branches */}
          {f.subs.map((sub, j) => (
            <path
              key={j}
              d={sub.path}
              fill="none"
              stroke={organism.color}
              strokeWidth={0.6}
              opacity={loaded ? (isHovered ? 0.7 : 0.35) : 0}
              className="transition-opacity duration-700"
              style={{ transitionDelay: `${i * 200 + j * 100 + 400}ms` }}
            />
          ))}
          {/* Terminal nodes */}
          <circle
            cx={f.main.end.x}
            cy={f.main.end.y}
            r={2}
            fill={organism.color}
            opacity={loaded ? (isHovered ? 0.8 : 0.4) : 0}
            className="transition-opacity duration-500"
          />
        </g>
      ))}

      {/* Debate triangle for AI Investment Analyst */}
      {organism.debateTriangle && loaded && (
        <g opacity={isHovered ? 0.6 : 0.3} className="transition-opacity duration-300">
          <polygon
            points={`${cx - 20},${cy + 25} ${cx + 20},${cy + 25} ${cx},${cy - 5}`}
            fill="none"
            stroke={organism.color}
            strokeWidth="0.5"
            strokeDasharray="4 2"
          />
        </g>
      )}

      {/* Bridge for SAS converter */}
      {organism.bridgeConnection && loaded && filaments[organism.bridgeConnection.from] && filaments[organism.bridgeConnection.to] && (
        <path
          d={`M ${filaments[organism.bridgeConnection.from].main.end.x} ${filaments[organism.bridgeConnection.from].main.end.y} L ${filaments[organism.bridgeConnection.to].main.end.x} ${filaments[organism.bridgeConnection.to].main.end.y}`}
          fill="none"
          stroke={organism.color}
          strokeWidth="0.8"
          strokeDasharray="3 3"
          opacity={isHovered ? 0.7 : 0.4}
        />
      )}

      {/* Kintsugi scars */}
      {organism.scars.map((scar, i) => {
        if (scar.isScar === false) return null;
        const pos = scarPositions[i];
        return (
          <g key={scar.id} className="scar-line">
            <line
              x1={pos.x - 8}
              y1={pos.y - 4}
              x2={pos.x + 8}
              y2={pos.y + 4}
              stroke="#d4a04a"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={loaded ? 0.7 : 0}
              className="transition-opacity duration-1000"
              style={{ transitionDelay: '3500ms' }}
            />
            <line
              x1={pos.x - 3}
              y1={pos.y - 6}
              x2={pos.x + 5}
              y2={pos.y + 2}
              stroke="#d4a04a"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity={loaded ? 0.5 : 0}
              className="transition-opacity duration-1000"
              style={{ transitionDelay: '3700ms' }}
            />
            {/* Gold particles on hover */}
            {isHovered && (
              <>
                <circle cx={pos.x} cy={pos.y - 2} r="1" fill="#d4a04a" opacity="0">
                  <animate attributeName="cy" from={pos.y} to={pos.y - 20} dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={pos.x + 3} cy={pos.y} r="0.7" fill="#e8c060" opacity="0">
                  <animate attributeName="cy" from={pos.y} to={pos.y - 15} dur="1.6s" begin="0.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.6;0" dur="1.6s" begin="0.5s" repeatCount="indefinite" />
                </circle>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// Root system SVG connecting organisms
function RootSystem({ loaded, mousePos }) {
  const posMap = {
    'ai-investment-analyst': { x: 45, y: 75 },
    'policy-retrieval': { x: 65, y: 55 },
    'sas-converter': { x: 28, y: 58 },
    'decarbonization': { x: 72, y: 38 },
  };

  return (
    <>
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ zIndex: 1 }}
    >
      {rootConnections.map((conn, i) => {
        const from = posMap[conn.from];
        const to = posMap[conn.to];
        if (!from || !to) return null;
        const midX = (from.x + to.x) / 2 + (i % 2 === 0 ? 3 : -3);
        const midY = Math.max(from.y, to.y) + 5 + i * 2;
        const path = `M ${from.x} ${from.y} Q ${midX} ${midY}, ${to.x} ${to.y}`;
        const dist = Math.hypot(mousePos.x - midX, mousePos.y - midY);
        const proximity = Math.max(0, 1 - dist / 25);
        const pathOpacity = loaded ? 0.15 + proximity * 0.5 : 0;
        return (
          <g key={i}>
            <path
              d={path}
              fill="none"
              stroke="rgba(212, 160, 74, 0.2)"
              strokeWidth="0.15"
              opacity={pathOpacity}
              className="transition-opacity duration-1000"
              style={{ transitionDelay: '2500ms' }}
            />
            {loaded && [0, 1, 2].map((p) => (
              <circle key={p} r="0.3" fill="#d4a04a" opacity="0.6">
                <animateMotion
                  dur={`${4 + p}s`}
                  repeatCount="indefinite"
                  begin={`${p * 1.5}s`}
                  path={path}
                />
              </circle>
            ))}
          </g>
        );
      })}
    </svg>
    {/* Root labels as HTML to avoid SVG stretching */}
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {rootConnections.map((conn, i) => {
        const from = posMap[conn.from];
        const to = posMap[conn.to];
        if (!from || !to) return null;
        const midX = (from.x + to.x) / 2 + (i % 2 === 0 ? 3 : -3);
        const midY = Math.max(from.y, to.y) + 5 + i * 2;
        return (
          <span
            key={i}
            className="absolute text-[9px] font-mono text-[#d4a04a]/35 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap transition-opacity duration-500"
            style={{
              left: `${midX}%`,
              top: `${midY}%`,
              opacity: loaded ? 1 : 0,
              transitionDelay: '3000ms',
            }}
          >
            {conn.label}
          </span>
        );
      })}
    </div>
    </>
  );
}

// Code pollen particles floating upward
function CodePollen({ loaded, mousePos }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!loaded) return;
    const initial = pollenKeywords.map((word, i) => ({
      id: i,
      word,
      x: 5 + Math.random() * 90,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 8,
    }));
    setParticles(initial);
  }, [loaded]);

  if (!loaded) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
      {particles.map((p) => {
        const pushX = (p.x - mousePos.x) * 0.15;
        return (
          <span
            key={p.id}
            className="code-pollen absolute text-white/40"
            style={{
              left: `${p.x}%`,
              bottom: '-20px',
              '--drift-x': `${pushX}px`,
              animation: `driftUp ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              opacity: 0,
            }}
          >
            {p.word}
          </span>
        );
      })}
    </div>
  );
}

// Brass specimen label at bottom
function SpecimenLabelComponent({ loaded }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={loaded ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 3.5, duration: 0.6 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
    >
      <div className="brass-plate rounded-sm px-6 py-3 text-center shadow-lg">
        <div className="text-[#f5f0e8] font-bold text-sm tracking-wider drop-shadow-sm">
          {specimenLabel.name}
        </div>
        <div className="text-[#e8dcc8] text-xs mt-0.5 tracking-wide">
          {specimenLabel.title} · {specimenLabel.location}
        </div>
        <div className="text-[#d4c4a0] text-[11px] mt-2 tracking-wide">
          {specimenLabel.stats}
        </div>
        <div className="text-[#c0b090] text-[10px] mt-1 font-mono tracking-tight">
          {specimenLabel.stack}
        </div>
        <div className="flex items-center justify-center gap-4 mt-2.5 pt-2 border-t border-[#8b6914]/30">
          <a
            href={`mailto:${specimenLabel.links.email}`}
            className="text-[#e8dcc8] hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={14} />
          </a>
          <a
            href={specimenLabel.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e8dcc8] hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={14} />
          </a>
          <a
            href={specimenLabel.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e8dcc8] hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// Detail panel when an organism is selected
function DetailPanel({ organism, onClose }) {
  if (!organism) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.3 }}
      className="detail-panel fixed right-0 top-0 bottom-0 w-full max-w-md z-50 overflow-y-auto p-6"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        aria-label="Close panel"
      >
        <X size={20} />
      </button>

      <div className="mt-8">
        {/* Title + description */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-xl font-semibold mb-1" style={{ color: organism.color }}>
            {organism.name}
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            {organism.description}
          </p>
        </motion.div>

        {/* Stack */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-4"
        >
          <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Stack</h3>
          <div className="flex flex-wrap gap-1.5">
            {organism.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs font-mono border"
                style={{
                  borderColor: `${organism.color}33`,
                  color: organism.color,
                  backgroundColor: `${organism.color}0a`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        {(organism.links.live || organism.links.github) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3 mb-6"
          >
            {organism.links.live && (
              <a
                href={organism.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
              >
                <ExternalLink size={12} /> Live
              </a>
            )}
            {organism.links.github && (
              <a
                href={organism.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
              >
                <Github size={12} /> Source
              </a>
            )}
          </motion.div>
        )}

        {/* Scars */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xs uppercase tracking-wider text-white/40 mb-3">
            {organism.scars.some(s => s.isScar === false) ? 'Scars & Decisions' : 'Kintsugi Scars'}
          </h3>
          <div className="space-y-4">
            {organism.scars.map((scar) => (
              <div
                key={scar.id}
                className="border-l-2 pl-3"
                style={{ borderColor: scar.isScar === false ? organism.color : '#d4a04a' }}
              >
                <h4 className="text-sm font-medium text-white/80 mb-1">{scar.label}</h4>
                {scar.detail.broke && (
                  <div className="mb-1">
                    <span className="text-xs text-red-400/70 uppercase tracking-wider">Broke: </span>
                    <span className="text-xs text-white/50">{scar.detail.broke}</span>
                  </div>
                )}
                {scar.detail.cause && (
                  <div className="mb-1">
                    <span className="text-xs text-orange-400/70 uppercase tracking-wider">Cause: </span>
                    <span className="text-xs text-white/50">{scar.detail.cause}</span>
                  </div>
                )}
                {scar.detail.fix && (
                  <div className="mb-1">
                    <span className="text-xs text-emerald-400/70 uppercase tracking-wider">Fix: </span>
                    <span className="text-xs text-white/50">{scar.detail.fix}</span>
                  </div>
                )}
                {scar.detail.context && (
                  <div className="mb-1">
                    <span className="text-xs text-blue-400/70 uppercase tracking-wider">Context: </span>
                    <span className="text-xs text-white/50">{scar.detail.context}</span>
                  </div>
                )}
                {scar.detail.decision && (
                  <div className="mb-1">
                    <span className="text-xs text-violet-400/70 uppercase tracking-wider">Decision: </span>
                    <span className="text-xs text-white/50">{scar.detail.decision}</span>
                  </div>
                )}
                {scar.detail.outcome && (
                  <div className="mb-1">
                    <span className="text-xs text-emerald-400/70 uppercase tracking-wider">Outcome: </span>
                    <span className="text-xs text-white/50">{scar.detail.outcome}</span>
                  </div>
                )}
                {scar.detail.lesson && (
                  <div className="mt-1.5 pt-1.5 border-t border-white/5">
                    <span className="text-xs text-[#d4a04a]/80 italic">{scar.detail.lesson}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Main greenhouse page
export default function GreenhousePage() {
  const [loaded, setLoaded] = useState(false);
  const [hoveredOrganism, setHoveredOrganism] = useState(null);
  const [selectedOrganism, setSelectedOrganism] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  // Loading sequence: trigger after 300ms
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking for parallax
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  // Day/night glow intensity based on local hour
  const glowIntensity = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour <= 18) {
      return 0.6 + (Math.abs(hour - 12) / 12) * 0.4;
    }
    return 0.9;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Parallax transform
  const getParallax = useCallback((depth) => {
    const dx = (mousePos.x - 50) * depth * 0.1;
    const dy = (mousePos.y - 50) * depth * 0.05;
    return `translate(${dx}px, ${dy}px)`;
  }, [mousePos]);

  const sizeClasses = {
    large: 'w-64 h-64 md:w-80 md:h-80',
    medium: 'w-48 h-48 md:w-60 md:h-60',
    small: 'w-40 h-40 md:w-52 md:h-52',
    seedling: 'w-32 h-32 md:w-44 md:h-44',
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-screen h-screen overflow-hidden bg-greenhouse-bg terrarium-glass condensation"
    >
      {/* Fog dissolve on entry */}
      <div className={`fog-layer fixed inset-0 z-[60] ${loaded ? 'opacity-0' : 'opacity-100'}`} />

      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 70%, rgba(15, 245, 232, ${0.02 * glowIntensity}) 0%, transparent 50%), radial-gradient(ellipse at 30% 40%, rgba(167, 139, 250, ${0.01 * glowIntensity}) 0%, transparent 40%), radial-gradient(ellipse at 70% 30%, rgba(52, 211, 153, ${0.01 * glowIntensity}) 0%, transparent 35%)`,
        }}
      />

      {/* Root system */}
      <RootSystem loaded={loaded} mousePos={mousePos} />

      {/* Soil band at bottom */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[18%] soil-band pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Organisms */}
      {organisms.map((org) => {
        const depthMap = { large: 1, medium: 0.6, small: 0.4, seedling: 0.2 };
        const depth = depthMap[org.size] || 0.5;
        const isSelected = selectedOrganism?.id === org.id;
        const isDimmed = selectedOrganism && !isSelected;

        return (
          <div
            key={org.id}
            className={`organism-group absolute ${sizeClasses[org.size]}`}
            style={{
              left: `${org.position.x}%`,
              top: `${org.position.y}%`,
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: isSelected
                ? `translate(-50%, -50%) scale(1.15) ${getParallax(depth)}`
                : isDimmed
                  ? `translate(-50%, -50%) scale(0.92) ${getParallax(depth)}`
                  : `translate(-50%, -50%) ${getParallax(depth)}`,
              filter: isDimmed
                ? `brightness(${glowIntensity * 0.4}) blur(1.5px)`
                : `brightness(${glowIntensity})`,
              zIndex: org.size === 'large' ? 10 : org.size === 'medium' ? 8 : 6,
            }}
            onMouseEnter={() => setHoveredOrganism(org.id)}
            onMouseLeave={() => setHoveredOrganism(null)}
          >
            {/* Name tooltip on hover */}
            <AnimatePresence>
              {hoveredOrganism === org.id && !selectedOrganism && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium z-30"
                  style={{ color: org.color }}
                >
                  {org.name}
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`w-full h-full ${loaded ? 'heartbeat' : ''}`}>
              <OrganismSVG
                organism={org}
                isHovered={hoveredOrganism === org.id}
                onClick={() => setSelectedOrganism(org)}
                loaded={loaded}
              />
            </div>
          </div>
        );
      })}

      {/* Code pollen */}
      <CodePollen loaded={loaded} mousePos={mousePos} />

      {/* Specimen label */}
      <SpecimenLabelComponent loaded={loaded} />

      {/* Detail panel overlay */}
      <AnimatePresence>
        {selectedOrganism && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelectedOrganism(null)}
            />
            <DetailPanel
              organism={selectedOrganism}
              onClose={() => setSelectedOrganism(null)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Mobile hint */}
      <div className="md:hidden absolute bottom-20 left-1/2 -translate-x-1/2 text-white/30 text-xs z-20">
        Tap an organism to explore
      </div>
    </div>
  );
}
