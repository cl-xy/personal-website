import { siteConfig } from '@/lib/site-config';

export const jobs = [
  {
    title: 'Software Engineer',
    company: 'Citi',
    country: 'Singapore',
    period: 'Sep 2024 - Present',
    logo: '/logos/citi-logo.jpg',
    achievements: [
      'Built RESTful APIs using Java and Spring Boot to modernise Private Bank trade order system, improving response time.',
      'Conducted code reviews and wrote unit and integration tests to ensure at least 90% code coverage.',
      'Advocated for GenAI adoption through knowledge sharing sessions as a member of Citi AI Accelerators.'
    ],
    technologies: ['Java', 'Spring Boot', 'SQL', 'Postman', 'Kafka', 'Jenkins', 'Harness', 'OpenShift', 'Splunk']
  },
  {
    title: 'Data Scientist',
    company: 'Citi',
    country: 'Singapore',
    period: 'Jul 2023 - Aug 2024',
    logo: '/logos/citi-logo.jpg',
    achievements: [
      'Leveraged Large Language Models (LLM) and LLM agents to assist users with policy retrieval, resulting in an estimated annual saving of 7000 hours of manual effort.',
      'Engineered Retrieval Augmented Generation (RAG) pipelines to boost accuracy of model responses and conducted evaluation using TruLens\' metrics.',
      'Produced a web application built using ReactJS, Python and FastAPI to automate conversion of SAS codes to PySpark codes, enhancing process efficiency by approximately 20%.'
    ],
    technologies: ['Python', 'langchain', 'Generative AI', 'PySpark', 'PostgreSQL', 'FastAPI']
  }, 
  {
    title: 'Data Scientist Intern', 
    company: 'GovTech Singapore', 
    country: 'Singapore', 
    period: 'Jan 2023 - Jun 2023',
    logo: '/logos/govtech-logo.jpg',
    achievements: [
      'Built a Power BI dashboard to gain insights into the government\'s marketing expenditure and reduced turnaround time by 50% for queries from management.', 
      'Applied few-shot learning and Hugging Face\'s Sentence Transformer model to categorize news articles by topic, and achieved 85% accuracy on prediction of top three news topics from article headlines.'
    ], 
    technologies: ['Python', 'Power BI', 'NLP', 'Hugging Face', 'Git', 'Docker']
  }, 
  {
    title: 'Data Science Intern', 
    company: 'GIC', 
    country: 'Singapore', 
    period: 'Jan 2022 - Jul 2022',
    logo: '/logos/gic-logo.png',
    achievements: [
      'Utilized Python\'s geospatial packages (GeoPandas and Folium) and SQLite to manage real estate assets, resulting in time savings of 2 hours daily in reviewing investment deals.', 
      'Refined ETL pipeline frameworks in Python to improve efficiency in data extraction and analysis.'
    ], 
    technologies: ['Python', 'ETL', 'SQLite']
  }, 
  {
    title: 'Research Assistant',
    company: 'National University of Singapore', 
    country: 'Singapore', 
    period: 'May 2021 - Jul 2022',
    logo: '/logos/nus-logo.jpg',
    achievements: [
      'Used R (dplyr, tidyr) to preprocess and integrate 1M+ records of data from Crunchbase and LinkedIn to investigate the effect of accelerator programs on growth of start-ups.', 
      'Applied inferential statistics and statistical methods including t-test, ANOVA, Principal Component Analysis to analyze and enhance the quality of research data, facilitating meaningful insights.'
    ], 
    technologies: ['R']
  }, 
  {
    title: 'Research Intern', 
    company: 'A*STAR Institute for Infocomm Research', 
    country: 'Singapore', 
    period: 'May 2021 - Aug 2021',
    logo: '/logos/astar-logo.png',
    achievements: [
      'Conducted data cleaning and descriptive statistical analysis in R and Tableau on multimodal and time-series diabetes dataset to gain preliminary insights.', 
      'Designed and implemented a graph database in Neo4j to model patient trajectories in disease management, improving the analysis of care pathways and outcomes.',
    ], 
    technologies: ['R', 'Neo4j', 'Tableau']
  }
];

export const educations = [
  {
    school: 'National University of Singapore (NUS)', 
    degree: 'Bachelor of Science with Honors (Distinction)',
    major: 'Double major in Business Analytics & Statistics',
    period: '2019 - 2023',
    logo: '/logos/nus-logo.jpg',
    additional_info: [
      "Dean's List for AY21/22 ST1",
      'Certificate of Distinction in Analytics Techniques and Data Science Knowledge Areas',
    ]
  },
  {
    school: 'University of Colorado, Boulder', 
    degree: 'Exchange Semester',
    major: 'Computer Science', 
    period: '2022',
    logo: '/logos/colorado-logo.avif',
    additional_info: [
      'Awarded the NUS Awards for Study Abroad (NASA) Exchange Scholarship to participate in the overseas Student Exchange Programme (SEP)',
      "Dean's List",
    ]
  }
];

export const personalInfo = siteConfig;

export const projects = [
  {
    id: 1,
    title: "Banking Web Application",
    description: "A comprehensive full-stack application demonstrating CRUD operations for bank clients with modern UI/UX design.",
    technologies: ['ReactJS', 'Java', 'Spring Boot', 'MySQL', 'HTML', 'CSS'],
    image: '/bank_app.jpg',
    github: 'https://github.com/aerinng/neueda-fe-project',
  },
  {
    id: 2,
    title: "AI Portfolio Decarbonization Analysis",
    description: "Advanced NLP research project analyzing decarbonization strategies across Asian financial institutions using cutting-edge AI techniques.",
    technologies: ['Python', 'NLP', 'Machine Learning', 'Pandas', 'scikit-learn', 'NLTK'],
    image: '/portfolio_decarbonization.png',
    github: 'https://github.com/cl-xy/bt4103_esg',
  },
];

export const summary = {
  full_summary: `Data and software engineer with a passion for 
  creating elegant solutions to complex problems. Specialized in Generative AI, data science 
  and committed to writing clean, maintainable, production-ready code.`,
  call_to_action: "Open for opportunities in AI/ML engineering, data science, data engineering"
};

export const skills = {
  programming_lang: [
    { name: 'Python', level: 'Expert' },
    { name: 'Java', level: 'Intermediate' },
    { name: 'R', level: 'Intermediate' }, 
    { name: 'Matlab', level: 'Beginner'}
  ],
  database: [
    { name: 'MySQL', level: 'Intermediate' },
    { name: 'SQLite', level: 'Intermediate' },
    { name: 'Oracle DB', level: 'Intermediate' }, 
    { name: 'SAS', level: 'Beginner'}, 
    { name: 'Neo4j', level: 'Intermediate' },
    { name: 'MongoDB', level: 'Beginner' },
    { name: 'Milvus', level: 'Intermediate' }, 
    { name: 'PostgreSQL', level: 'Intermediate'}
  ],
  frontend_dev: [
    { name: 'HTML', level: 'Expert' },
    { name: 'CSS', level: 'Expert' },
    { name: 'JavaScript', level: 'Intermediate' }, 
    { name: 'React.js', level: 'Intermediate' },
    { name: 'Vue.js', level: 'Beginner' },
    { name: 'Next.js', level: 'Beginner' }
  ],
  backend_dev: [
    { name: 'Spring Boot', level: 'Beginner' },
    { name: 'FastAPI', level: 'Intermediate' },
    { name: 'Kafka', level: 'Beginner' },
    { name: 'Jenkins', level: 'Beginner' },
    { name: 'Harness', level: 'Beginner' },
    { name: 'OpenShift', level: 'Beginner' },
    { name: 'Splunk', level: 'Beginner' }
  ],
  data_viz: [
    { name: 'Tableau', level: 'Intermediate' },
    { name: 'Power BI', level: 'Intermediate' },
  ],
  tools: [
    { name: 'Bitbucket', level: 'Expert'},
    { name: 'Confluence', level: 'Expert'},
    { name: 'Git', level: 'Expert' },
    { name: 'Docker', level: 'Beginner' }, 
    { name: 'Heroku', level: 'Beginner'}, 
    { name: 'ArcGIS', level: 'Beginner'}
  ]
};

export const certifications = [
  {
    name: 'Quantization for GenAI models',
    issuer: 'Udemy',
    date: '2025',
    status: 'Completed',
    description: 'Specialized training in model optimization techniques for Generative AI applications'
  },
  {
    name: 'Neo4j Certified Professional',
    issuer: 'Neo4j',
    date: '2024',
    status: 'Completed',
    description: 'Professional certification demonstrating expertise in Neo4j graph database technology'
  },
  {
    name: 'The Ultimate React Course 2024: React Next.js Redux',
    issuer: 'Udemy',
    date: '2024',
    status: 'Completed',
    description: 'Comprehensive course covering React, Next.js, and Redux for modern web development'
  },
  {
    name: 'Bloomberg Market Concepts Certificate',
    issuer: 'Bloomberg',
    date: '2022',
    status: 'Completed',
    description: 'Financial markets fundamentals and Bloomberg Terminal proficiency certification'
  }
];
