'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { siteConfig, proofChips, projects, about, gallery } from '@/lib/data';
import FieldEntry from '@/components/field-entry';
import Nav from '@/components/nav';
import { ArrowUpRight, Mail, Github, Linkedin } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Hero */}
        <section id="top" className="mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs text-muted mb-4 tracking-wide">
              {siteConfig.role} · {siteConfig.location}
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-ink mb-8 leading-[1.0] tracking-tight">
              {siteConfig.name}
            </h1>
            <p className="text-lg md:text-xl text-ink/70 max-w-prose leading-relaxed mb-10">
              {siteConfig.tagline}
            </p>
          </motion.div>

          {/* Proof chips */}
          <motion.div
            className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {proofChips.map((chip) => (
              <span key={chip} className="proof-chip">
                {chip}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <a
              href="#field-notes"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-terracotta text-canvas rounded-md font-medium text-sm hover:bg-terracotta/90 transition-colors"
            >
              View field notes
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink/15 rounded-md font-medium text-sm text-ink hover:border-ink/30 transition-colors"
            >
              Get in touch
            </a>
          </motion.div>
        </section>

        {/* Field Notes (Projects) */}
        <section id="field-notes" className="mb-14 sm:mb-20">
          <div className="section-divider" />
          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-10">
            Field Notes
          </h2>

          <div className="space-y-12 sm:space-y-16">
            {projects.map((project, i) => (
              <FieldEntry key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mb-14 sm:mb-20">
          <div className="section-divider" />
          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-8">
            About
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="max-w-prose space-y-5 text-ink/80 leading-relaxed lg:w-3/5">
              <p>{about.intro}</p>
              <p>{about.current}</p>
              <p>{about.personal}</p>
            </div>
            {/* Gallery */}
            <div className="grid grid-cols-3 gap-2 lg:w-2/5">
              {gallery.map((img) => (
                <div key={img.src} className="relative aspect-square rounded-md overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 33vw, 150px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="section-divider" />
          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
            Get in touch
          </h2>
          <p className="text-muted text-sm mb-8 max-w-prose">
            I respond faster to architecture questions than compliments.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-terracotta transition-colors"
            >
              <Mail size={16} />
              {siteConfig.email}
              <ArrowUpRight size={14} className="text-muted" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-terracotta transition-colors"
            >
              <Linkedin size={16} />
              LinkedIn
              <ArrowUpRight size={14} className="text-muted" />
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-terracotta transition-colors"
            >
              <Github size={16} />
              GitHub
              <ArrowUpRight size={14} className="text-muted" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 py-8 border-t border-ink/5">
        <p className="text-xs text-muted font-mono">
          Built with curiosity and a healthy distrust of clean narratives.
        </p>
      </footer>
    </>
  );
}
