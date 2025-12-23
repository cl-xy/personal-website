'use client';
import Image from "next/image";
import { motion } from 'framer-motion';
import PageLayout from '@/components/page-layout';
import SectionContainer from '@/components/section-container';
import AnimatedCard from '@/components/animated-card';
import { fadeInUp, scaleIn, getDelayedFadeIn, ANIMATION_DELAYS } from '@/lib/animations';

export default function Home() {
  return (
    <PageLayout variant="home">
      {/* Hero Section */}
      <div className="relative">
        <div style={{ width: "100%", position: "relative", height: "500px" }}>
          <Image src="/cover.jpg" alt="error" fill={true} style={{objectFit: "cover"}}/>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          
          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              {...fadeInUp}
              className="text-center text-white z-10"
            >
              <motion.h1
                {...getDelayedFadeIn(ANIMATION_DELAYS.SHORT)}
                className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
              >
                Hi, I&apos;m Xinyi
              </motion.h1>
              <motion.div
                {...scaleIn}
                transition={{ duration: 0.6, delay: ANIMATION_DELAYS.EXTRA_LONG }}
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <SectionContainer>
        <AnimatedCard delay={0.3} variant="glass" className="p-12 text-center bg-white/80">
          <motion.p
            {...getDelayedFadeIn(0.5)}
            className="text-3xl md:text-4xl font-light mb-10 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent leading-relaxed"
          >
            A data and software engineer passionate about building AI-driven
            solutions.
          </motion.p>

          <motion.div
            {...getDelayedFadeIn(0.7)}
            className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-8 mb-12 border-2 border-dashed border-gray-300 relative overflow-hidden"
          >
            {/* Tech Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-600">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>
            </div>
            
            {/* Content with Icons and Highlighted Terms */}
            <div className="relative z-10">
              <p className="text-xl text-gray-700 leading-relaxed">
                With experience in{' '}
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full font-semibold border border-purple-200">
                  <span className="text-lg">🤖</span>
                  GenAI
                </span>
                ,{' '}
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full font-semibold border border-green-200">
                  <span className="text-lg">💬</span>
                  NLP
                </span>
                , and{' '}
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-3 py-1 rounded-full font-semibold border border-blue-200">
                  <span className="text-lg">⚡</span>
                  backend development
                </span>
                {' '}in the finance industry
                , I am driven to solve complex problems at the intersection of{' '}
                <span className="font-semibold text-gray-800">AI</span>
                ,{' '}
                <span className="font-semibold text-gray-800">data science</span>
                , and{' '}
                <span className="font-semibold text-gray-800">engineering</span>
                .
              </p>
              
              {/* Code-style bottom border */}
              <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 font-mono">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span className="ml-2">~/expertise/overview.md</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...getDelayedFadeIn(0.9)}
            className="flex justify-center"
          >
            <a
              href="/about"
              className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3">
                Learn more about me
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </a>
          </motion.div>
        </AnimatedCard>
      </SectionContainer>
    </PageLayout>
  );
}
