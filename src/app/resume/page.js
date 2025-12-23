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
} from "./data";
import SkillsMasonry from '@/components/skillsmasonry';
import SectionContainer from '@/components/section-container';
import { fadeInUp, getDelayedFadeInUp, fadeIn, ANIMATION_DELAYS } from '@/lib/animations';

export default function Resume() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredJob, setHoveredJob] = useState(null);
  const [hoveredEducation, setHoveredEducation] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };


  return (
    <SectionContainer maxWidth="7xl" className="bg-gray-50 min-h-screen">
      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.8, delay: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold">Resume</h1>
      </motion.div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <motion.div
          {...fadeIn}
          className="mb-8 text-center"
        >
          <h2 className="text-4xl font-bold mb-2">Xinyi Lu</h2>
          <p className="text-gray-600">
            📍 {personalInfo.location} · 📧 <a href='mailto:xinyilu2000@gmail.com'>Email</a> · 🔗 <a href='https://www.linkedin.com/in/xinyi-lu-35b72917a/'>LinkedIn</a>
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
              {(() => {
                // Group Citi jobs together
                const citiJobs = jobs.filter(job => job.company === 'Citi');
                const otherJobs = jobs.filter(job => job.company !== 'Citi');
                const groupedJobs = [{ type: 'citi-group', jobs: citiJobs }, ...otherJobs.map(job => ({ type: 'single', job }))];

                return groupedJobs.map((item, index) => {
                  if (item.type === 'citi-group') {
                    return (
                      <motion.div
                        key="citi-group"
                        className={`mb-8 p-8 rounded-xl bg-gradient-to-r from-white to-gray-50 border-l-4 border-green-500 transition-all duration-300 ${
                          hoveredJob === 'citi' ? 'shadow-xl bg-gradient-to-r from-green-50 to-emerald-50 transform scale-[1.02]' : 'shadow-lg hover:shadow-xl'
                        }`}
                        onMouseEnter={() => setHoveredJob('citi')}
                        onMouseLeave={() => setHoveredJob(null)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        {/* Company Header */}
                        <div className="flex items-start gap-6 mb-6">
                          <div className="flex-shrink-0">
                            <div className="relative w-16 h-16">
                              <Image
                                src={item.jobs[0].logo}
                                alt={`${item.jobs[0].company} logo`}
                                width={64}
                                height={64}
                                className="object-cover p-1 rounded-lg bg-white shadow-lg border-2 border-gray-100 transition-transform duration-300 hover:scale-105"
                              />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <Briefcase size={10} className="text-white" />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="mb-2">
                              <h4 className="text-xl font-bold text-gray-800">{item.jobs[0].company}</h4>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-sm">{item.jobs[0].country}</span>
                            </div>
                          </div>
                        </div>

                        {/* Positions */}
                        {item.jobs.map((job, jobIndex) => (
                          <div key={jobIndex}>
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <h5 className="text-lg font-semibold text-gray-700 mb-1">{job.title}</h5>
                              </div>
                              <div className="text-right ml-4">
                                <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-green-700 font-semibold text-sm">{job.period}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-6 shadow-inner mb-4">
                              <ul className="space-y-3">
                                {job.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="leading-relaxed">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mb-6">
                              <h6 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                Skills
                              </h6>
                              <div className="flex flex-wrap gap-2">
                                {job.technologies.map((tech, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 + jobIndex * 0.1 + i * 0.05 }}
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

                            {/* Separator between positions (except last one) */}
                            {jobIndex < item.jobs.length - 1 && (
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
                      </motion.div>
                    );
                  } else {
                    const job = item.job;
                    return (
                      <motion.div
                        key={index}
                        className={`mb-8 p-8 rounded-xl bg-gradient-to-r from-white to-gray-50 border-l-4 border-green-500 transition-all duration-300 ${
                          hoveredJob === index ? 'shadow-xl bg-gradient-to-r from-green-50 to-emerald-50 transform scale-[1.02]' : 'shadow-lg hover:shadow-xl'
                        }`}
                        onMouseEnter={() => setHoveredJob(index)}
                        onMouseLeave={() => setHoveredJob(null)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <div className="flex items-start gap-6 mb-6">
                          <div className="flex-shrink-0">
                            <div className="relative w-16 h-16">
                              <Image
                                src={job.logo}
                                alt={`${job.company} logo`}
                                width={64}
                                height={64}
                                className={`rounded-lg bg-white shadow-lg border-2 border-gray-100 transition-transform duration-300 hover:scale-105 ${
                                  job.company === 'GIC' ? 'object-contain p-2' : 'object-cover p-1'
                                }`}
                              />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <Briefcase size={10} className="text-white" />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <div className="mb-2">
                                  <h4 className="text-xl font-bold text-gray-800">{job.company}</h4>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                  <p className="text-lg font-semibold text-gray-700">{job.title}</p>
                                  <span className="text-gray-500">•</span>
                                  <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-sm">{job.country}</span>
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-green-700 font-semibold text-sm">{job.period}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-6 shadow-inner mb-6">
                          <ul className="space-y-3">
                            {job.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="leading-relaxed">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Skills
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {job.technologies.map((tech, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + i * 0.05 }}
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
                      </motion.div>
                    );
                  }
                });
              })()}
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
                <motion.div
                  key={index}
                  className={`mb-8 p-8 rounded-xl bg-gradient-to-r from-white to-gray-50 border-l-4 border-blue-500 transition-all duration-300 ${
                    hoveredEducation === index ? 'shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50 transform scale-[1.02]' : 'shadow-lg hover:shadow-xl'
                  }`}
                  onMouseEnter={() => setHoveredEducation(index)}
                  onMouseLeave={() => setHoveredEducation(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24">
                        <Image
                          src={education.logo}
                          alt={`${education.school} logo`}
                          width={96}
                          height={96}
                          className="object-cover rounded-xl bg-white p-2 shadow-lg border-2 border-gray-100 transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <GraduationCap size={14} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 mb-1">{education.school}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-blue-600 font-semibold text-sm">{education.period}</span>
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
                </motion.div>
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
  );
}