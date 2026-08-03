'use client';

import Image from 'next/image';
import { siteConfig, proofChips, projects, about, gallery } from '@/lib/data';
import FieldEntry from '@/components/field-entry';
import Nav from '@/components/nav';
import { ArrowUpRight, Mail, Github, Linkedin } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Hero */}
        <section id="top" className="mb-16 sm:mb-24">
          <p className="font-mono text-[11px] text-muted mb-5 tracking-widest uppercase">
            {siteConfig.role} · {siteConfig.location}
          </p>
          <h1 className="font-heading text-hero-sm sm:text-hero text-ink mb-6 tracking-tight">
            {siteConfig.name}
          </h1>
          <p className="text-lg md:text-xl text-ink/60 max-w-prose leading-relaxed mb-10">
            {siteConfig.tagline}
          </p>

          {/* Proof chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            {proofChips.map((chip) => (
              <span key={chip} className="proof-chip">
                {chip}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#incidents"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper font-medium text-sm hover:bg-ink/90 transition-colors"
            >
              See what broke
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-strong font-medium text-sm text-ink hover:border-ink transition-colors"
            >
              Get in touch
            </a>
          </div>
        </section>

        {/* Incidents (Projects) */}
        <section id="incidents" className="mb-16 sm:mb-24">
          <div className="section-break" />
          <div className="mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-2">
              What Broke
            </h2>
            <p className="text-sm text-muted max-w-prose">
              Every shipped system has a failure log. These are mine: the objective, what went wrong, the fix, and what shipped.
            </p>
          </div>

          <div className="space-y-0">
            {projects.map((project, i) => (
              <FieldEntry key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mb-16 sm:mb-24">
          <div className="section-break" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-8">
            About
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="max-w-prose space-y-5 text-ink/70 leading-relaxed lg:w-3/5">
              <p>{about.intro}</p>
              <p>{about.current}</p>
              <p>{about.personal}</p>
            </div>
            {/* Gallery */}
            <div className="grid grid-cols-3 gap-2 lg:w-2/5">
              {gallery.map((img) => (
                <div key={img.src} className="relative aspect-square overflow-hidden border border-border">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 150px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="section-break" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-3">
            Get in touch
          </h2>
          <p className="text-muted text-sm mb-8 max-w-prose">
            I respond faster to architecture questions than compliments.
          </p>
          <div className="flex flex-wrap gap-5">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-incident transition-colors"
            >
              <Mail size={16} />
              {siteConfig.email}
              <ArrowUpRight size={14} className="text-muted" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-incident transition-colors"
            >
              <Linkedin size={16} />
              LinkedIn
              <ArrowUpRight size={14} className="text-muted" />
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-incident transition-colors"
            >
              <Github size={16} />
              GitHub
              <ArrowUpRight size={14} className="text-muted" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 py-8 border-t border-border">
        <p className="text-xs text-muted font-mono">
          Shipped with curiosity and a healthy distrust of clean narratives.
        </p>
      </footer>
    </>
  );
}
