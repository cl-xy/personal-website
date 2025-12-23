'use client';
import Gallery from "@/components/gallery";
import { motion } from 'framer-motion';
import PageLayout from '@/components/page-layout';
import GradientText from '@/components/gradient-text';
import { fadeInLeft, fadeInRight, getDelayedFadeInUp, ANIMATION_DELAYS } from '@/lib/animations';

export default function About() {
  return (
    <PageLayout variant="about">
      <div className="container flex flex-col lg:flex-row mx-auto px-6 py-16 gap-8">
        {/* Text Content */}
        <motion.div
          {...fadeInLeft}
          className="w-full lg:w-1/2 space-y-8"
        >
          {/* Header */}
          <motion.h1
            {...getDelayedFadeInUp(ANIMATION_DELAYS.SHORT)}
            className="text-4xl font-bold"
          >
            <GradientText from="gray-800" to="blue-600">
              About Me
            </GradientText>
          </motion.h1>

          {/* Personality */}
          <motion.p
            {...getDelayedFadeInUp(ANIMATION_DELAYS.MEDIUM)}
            className="text-lg text-gray-700 leading-relaxed"
          >
            I am driven by{' '}
            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-base font-semibold">
              🔍 curiosity
            </span>
            {' '}and a passion for solving complex problems. With a strong ability to{' '}
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-base font-semibold">
              ⚡ learn quickly
            </span>
            , I excel at transforming ideas into effective, real-world solutions. My interest lies in leveraging{' '}
            <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-base font-semibold">
              🤖 Generative AI
            </span>
            {' '}to solve business pain points.
          </motion.p>

          {/* Interests */}
          <motion.p
            {...getDelayedFadeInUp(ANIMATION_DELAYS.LONG)}
            className="text-lg text-gray-700 leading-relaxed"
          >
            In my free time, I enjoy{' '}
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-base font-semibold">
              🥾 hiking
            </span>
            ,{' '}
            <span className="inline-flex items-center gap-1 bg-violet-100 text-violet-700 px-2 py-1 rounded-full text-base font-semibold">
              🧘 yoga
            </span>
            {' '}and{' '}
            <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-base font-semibold">
              ❤️ volunteering
            </span>
            {' '}to support youth and elderly causes.
          </motion.p>

          {/* Connect */}
          <motion.p
            {...getDelayedFadeInUp(ANIMATION_DELAYS.EXTRA_LONG)}
            className="text-lg text-gray-700 leading-relaxed"
          >
            Feel free to connect with me on{' '}
            <a
              href="https://www.linkedin.com/in/xinyi-lu-35b72917a/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </motion.p>
        </motion.div>

        {/* Gallery */}
        <motion.div
          {...fadeInRight}
          transition={{ duration: 0.8, delay: ANIMATION_DELAYS.MEDIUM }}
          className="w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0"
        >
          <Gallery />
        </motion.div>
      </div>
    </PageLayout>
  );
}