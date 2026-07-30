'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Chip } from '@mui/material';
import { Briefcase } from 'lucide-react';
import GradientHoverCard from './gradient-hover-card';

/**
 * JobCard - Renders one company's experience block.
 * Companies with a single role render title/period inline in the header;
 * companies with multiple roles (e.g. internal promotions) render one
 * sub-section per role under a shared company header.
 */
export default function JobCard({ company, jobs, delay = 0 }) {
  const primary = jobs[0];
  const isGroup = jobs.length > 1;
  const SkillsHeading = isGroup ? 'h6' : 'h5';

  return (
    <GradientHoverCard accent="green" delay={delay}>
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16">
            <Image
              src={primary.logo}
              alt={`${company} logo`}
              width={64}
              height={64}
              className={`rounded-lg bg-white shadow-lg border-2 border-gray-100 transition-transform duration-300 hover:scale-105 ${
                company === 'GIC' ? 'object-contain p-2' : 'object-cover p-1'
              }`}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Briefcase size={10} className="text-white" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          {isGroup ? (
            <>
              <div className="mb-2">
                <h4 className="text-xl font-bold text-gray-800">{company}</h4>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-sm">{primary.country}</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-2 sm:gap-0 mb-3">
              <div className="flex-1">
                <div className="mb-2">
                  <h4 className="text-xl font-bold text-gray-800">{company}</h4>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <p className="text-lg font-semibold text-gray-700">{primary.title}</p>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-sm">{primary.country}</span>
                </div>
              </div>
              <div className="text-left sm:text-right sm:ml-4 mt-2 sm:mt-0">
                <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-semibold text-sm">{primary.period}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {jobs.map((job, jobIndex) => (
        <div key={jobIndex}>
          {isGroup && (
            <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-2 sm:gap-0 mb-4">
              <div className="flex-1">
                <h5 className="text-lg font-semibold text-gray-700 mb-1">{job.title}</h5>
              </div>
              <div className="text-left sm:text-right sm:ml-4">
                <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-semibold text-sm">{job.period}</span>
                </div>
              </div>
            </div>
          )}

          <div className={`bg-white rounded-lg p-6 shadow-inner ${isGroup ? 'mb-4' : 'mb-6'}`}>
            <ul className="space-y-3">
              {job.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={isGroup ? 'mb-6' : ''}>
            <SkillsHeading className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Skills
            </SkillsHeading>
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: delay + jobIndex * 0.1 + i * 0.05 }}
                >
                  <Chip
                    label={tech}
                    size="small"
                    className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 font-medium border border-blue-200 hover:shadow-sm transition-all duration-200"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {isGroup && jobIndex < jobs.length - 1 && (
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div className="px-4">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          )}
        </div>
      ))}
    </GradientHoverCard>
  );
}
