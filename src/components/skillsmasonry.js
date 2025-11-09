'use client';
import { motion } from 'framer-motion';
import SkillDots from './skilldots';

const SkillsMasonry = ({ skills }) => {
  const skillCategories = [
    { 
      title: 'Programming Languages', 
      skills: skills.programming_lang,
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      titleColor: 'text-purple-800'
    },
    { 
      title: 'Database', 
      skills: skills.database,
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      titleColor: 'text-blue-800'
    },
    { 
      title: 'Frontend Development', 
      skills: skills.frontend_dev,
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      titleColor: 'text-green-800'
    },
    { 
      title: 'Backend Development', 
      skills: skills.backend_dev,
      bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-50',
      borderColor: 'border-teal-200',
      titleColor: 'text-teal-800'
    },
    { 
      title: 'Data Visualization', 
      skills: skills.data_viz,
      bgColor: 'bg-gradient-to-br from-orange-50 to-yellow-50',
      borderColor: 'border-orange-200',
      titleColor: 'text-orange-800'
    },
    { 
      title: 'Tools', 
      skills: skills.tools,
      bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50',
      borderColor: 'border-gray-200',
      titleColor: 'text-gray-800'
    }
  ];

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {skillCategories.map((category, categoryIndex) => (
        <motion.div
          key={categoryIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
          className={`break-inside-avoid mb-6 p-6 rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-300 ${category.bgColor} ${category.borderColor}`}
          style={{
            minHeight: `${120 + category.skills.length * 45}px` // Dynamic height based on content
          }}
        >
          <h4 className={`font-bold text-lg mb-4 ${category.titleColor}`}>
            {category.title}
          </h4>
          <div className="space-y-2">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skillIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: categoryIndex * 0.1 + skillIndex * 0.05, 
                  duration: 0.3 
                }}
              >
                <SkillDots skill={skill.name} level={skill.level} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsMasonry;