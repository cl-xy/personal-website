'use client';
import React, { useState } from 'react';
import { Button, Tabs, Tab, LinearProgress, Chip } from '@mui/material';
import { DownloadIcon, BookOpen, Briefcase, Code, GraduationCap, StickyNote } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  personalInfo, 
  summary, 
  educations, 
  jobs,
  skills,
} from "./data";
import SkillLevelBar from '@/components/skillslevelbar';

export default function Resume() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredJob, setHoveredJob] = useState(null);
  const [hoveredEducation, setHoveredEducation] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // const handleDownload = () => {
  //   window.open('/files/your-resume.pdf', '_blank');
  // };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold">Resume</h1>
        {/* <Button 
          variant="contained" 
          startIcon={<DownloadIcon size={20} />}
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Download PDF
        </Button> */}
      </motion.div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
          {/* <Tab icon={<StickyNote size={20} />} label="Others" /> */}
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
              {jobs.map((job, index) => (
                <motion.div
                  key={index}
                  className={`mb-8 p-6 rounded-lg transition-shadow duration-300 ${
                    hoveredJob === index ? 'shadow-lg bg-blue-50' : 'shadow'
                  }`}
                  onMouseEnter={() => setHoveredJob(index)}
                  onMouseLeave={() => setHoveredJob(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-medium">{job.title}</h4>
                      <p className="text-gray-600">{job.company}, {job.country}</p>
                    </div>
                    <p className="text-gray-600">{job.period}</p>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 mb-4">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech, i) => (
                      <Chip 
                        key={i} 
                        label={tech} 
                        size="small"
                        className="bg-blue-100"
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-medium mb-4 font-bold"><b>Programming Languages</b></h4>
                  {skills.programming_lang.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SkillLevelBar skill={skill.name} level={skill.level} />
                    </motion.div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium mb-4"><b>Database</b></h4>
                  {skills.database.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SkillLevelBar skill={skill.name} level={skill.level} />
                    </motion.div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium mb-4"><b>Web Development</b></h4>
                  {skills.web_dev.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SkillLevelBar skill={skill.name} level={skill.level} />
                    </motion.div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium mb-4"><b>Data Visualization</b></h4>
                  {skills.data_viz.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SkillLevelBar skill={skill.name} level={skill.level} />
                    </motion.div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium mb-4"><b>Tools</b></h4>
                  {skills.tools.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SkillLevelBar skill={skill.name} level={skill.level} />
                    </motion.div>
                  ))}
                </div>
              </div>
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
                  className={`mb-8 p-6 rounded-lg transition-shadow duration-300 ${
                    hoveredEducation === index ? 'shadow-lg bg-blue-50' : 'shadow'
                  }`}
                  onMouseEnter={() => setHoveredEducation(index)}
                  onMouseLeave={() => setHoveredEducation(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium">{education.school}</h4>
                    <p className="text-gray-600">{education.period}</p>
                  </div>
                  <div className="text-gray-600 mb-2">
                    <p className='text-base'>{education.degree}</p>
                    <p className='text-sm'>{education.major}</p>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 mb-1">
                    {education.additional_info.map((info, i) => (
                      <li key={i}>{info}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}