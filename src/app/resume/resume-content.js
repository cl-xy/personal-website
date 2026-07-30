'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Tabs, Tab, Chip } from '@mui/material';
import { BookOpen, Briefcase, Code, GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  personalInfo,
  summary,
  educations,
  jobs,
  skills,
  certifications,
} from "@/lib/data";
import SkillsMasonry from '@/components/skillsmasonry';
import SectionContainer from '@/components/section-container';
import JobCard from '@/components/job-card';
import GradientHoverCard from '@/components/gradient-hover-card';
import { fadeInUp, getDelayedFadeInUp, fadeIn, ANIMATION_DELAYS } from '@/lib/animations';
import { groupJobsByCompany } from '@/lib/resume-utils';

export default function ResumeContent() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionContainer maxWidth="7xl">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-8">
        <motion.div
          {...fadeIn}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{personalInfo.name}</h1>
          <p className="text-gray-600">
            📍 {personalInfo.location} · 📧 <a href={`mailto:${personalInfo.email}`}>Email</a> · 🔗 <a href={personalInfo.linkedin}>LinkedIn</a>
          </p>
        </motion.div>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          className="mb-8"
        >
          <Tab icon={<BookOpen size={20} />} label="Summary" />
          <Tab icon={<Briefcase size={20} />} label="Experience" />
          <Tab icon={<Code size={20} />} label="Skills" />
          <Tab icon={<GraduationCap size={20} />} label="Education" />
          <Tab icon={<Award size={20} />} label="Certifications" />
        </Tabs>

        <div className="mt-8">
          {activeTab === 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-6">Professional Summary</h3>
              <p className="text-gray-700 leading-relaxed">{summary.full_summary}</p>
              <p className="text-gray-700 leading-relaxed mt-8">{summary.call_to_action}</p>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {groupJobsByCompany(jobs).map((group, index) => (
                <JobCard
                  key={group.company}
                  company={group.company}
                  jobs={group.jobs}
                  delay={index * 0.2}
                />
              ))}
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SkillsMasonry skills={skills} />
            </motion.div>
          )}

          {activeTab === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {educations.map((education, index) => (
                <GradientHoverCard key={index} accent="blue" delay={index * 0.2}>
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="relative w-20 h-20">
                        <Image
                          src={education.logo}
                          alt={`${education.school} logo`}
                          width={80}
                          height={80}
                          className="object-contain rounded-xl bg-white p-2 shadow-lg border-2 border-transparent transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-2 sm:gap-0 mb-3">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-800 mb-1">{education.school}</h4>
                        </div>
                        <div className="text-left sm:text-right sm:ml-4 mt-2 sm:mt-0">
                          <div className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-blue-700 font-semibold text-sm">{education.period}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-lg font-semibold text-gray-700">{education.degree}</p>
                        <p className="text-base text-gray-600 bg-gray-100 px-3 py-1 rounded-full inline-block">{education.major}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-inner">
                    <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Achievements & Honors
                    </h5>
                    <ul className="space-y-3">
                      {education.additional_info.map((info, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="leading-relaxed">{info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GradientHoverCard>
              ))}
            </motion.div>
          )}

          {activeTab === 4 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {certifications.map((certification, index) => (
                <motion.div
                  key={index}
                  className="mb-6 p-6 rounded-lg border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-white shadow-sm hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        {certification.name}
                      </h4>
                      <p className="text-blue-600 font-medium mb-2">
                        {certification.issuer}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 text-sm mb-1">{certification.date}</p>
                      <Chip
                        label={certification.status}
                        size="small"
                        className="bg-green-100 text-green-800"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {certification.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      </SectionContainer>
    </div>
  );
}
