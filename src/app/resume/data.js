export const jobs = [
  {
    title: 'Software Engineer',
    company: 'Citi',
    country: 'Singapore',
    period: 'Sep 2024 - Present',
    achievements: [
      'Implemented RESTful microservices using Java and Spring Boot to support trade order system modernization for equity products.'
    ],
    technologies: ['Java', 'Spring Boot', 'SQL', 'Postman']
  },
  {
    title: 'Data Scientist',
    company: 'Citi',
    country: 'Singapore',
    period: 'Jul 2023 - Aug 2024',
    achievements: [
      'Leveraged Large Language Models (LLM) and LLM agents to assist users with policy retrieval, resulting in an estimated annual saving of 7000 hours of manual effort.',
      'Engineered Retrieval Augmented Generation (RAG) pipelines to boost accuracy of model responses and conducted evaluation using TruLens’ metrics.',
      'Produced a web application built using ReactJS, Python and FastAPI to automate conversion of SAS codes to PySpark codes, enhancing process efficiency by approximately 20%.'
    ],
    technologies: ['Python', 'langchain', 'Generative AI', 'PySpark', 'PostgreSQL', 'FastAPI']
  }, 
  {
    title: 'Data Scientist Intern', 
    company: 'GovTech Singapore', 
    country: 'Singapore', 
    period: 'Jan 2023 - Jun 2023', 
    achievements: [
      'Built a Power BI dashboard to gain insights into the government’s marketing expenditure and reduced turnaround time by 50% for queries from management.', 
      'Applied few-shot learning and Hugging Face’s Sentence Transformer model to categorize news articles by topic, and achieved 85% accuracy on prediction of top three news topics from article headlines.'
    ], 
    technologies: ['Python', 'Power BI', 'NLP', 'Hugging Face', 'Git', 'Docker']
  }, 
  {
    title: 'Data Science Intern', 
    company: 'GIC', 
    country: 'Singapore', 
    period: 'Jan 2022 - Jul 2022', 
    achievements: [
      "Utilized Python's geospatial packages (GeoPandas and Folium) and SQLite to manage real estate assets, resulting in time savings of 2 hours daily in reviewing investment deals.", 
      'Refined ETL pipeline frameworks in Python to improve efficiency in data extraction and analysis.'
    ], 
    technologies: ['Python', 'ETL', 'SQLite']
  }, 
  {
    title: 'Research Assistant',
    company: 'National University of Singapore', 
    country: 'Singapore', 
    period: 'May 2021 - Jul 2022', 
    achievements: [
      'Used R (dplyr, tidyr) to preprocess and integrate 1M+ records of data from Crunchbase and LinkedIn to investigate the effect of accelerator programs on growth of start-ups.', 
      'Applied inferential statistics and statistical methods including t-test, ANOVA, Principal Component Analysis to analyze and enhance the quality of research data, facilitating meaningful insights.'
    ], 
    technologies: ['R', ]
  }, 
  {
    title: 'Research Intern', 
    company: 'A*STAR Institute for Infocomm Research', 
    country: 'Singapore', 
    period: 'May 2021 - Aug 2021', 
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
    additional_info: [
      'Awarded the NUS Awards for Study Abroad (NASA) Exchange Scholarship to participate in the overseas Student Exchange Programme (SEP)',
      "Dean's List",
    ]
  }
];

export const personalInfo = {
  name: "Xinyi Lu", 
  location: "Singapore", 
  email: "xinyilu2000@gmail.com", 
  linkedin: "https://www.linkedin.com/in/xinyi-lu-35b72917a/", 
  github: "https://github.com/cl-xy",
};

export const summary = {
  full_summary: `Data and software engineer with a passion for 
  creating elegant solutions to complex problems. Specialized in Generative AI, data science 
  and committed to writing clean, maintainable, production-ready code.`,
  call_to_action: "Open to relocation for opportunities in AI/ML engineering, data science, data engineering"
};

export const skills = {
  frontend: [
    { name: 'React/Next.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 88 }
  ],
  backend: [
    { name: 'Node.js', level: 82 },
    { name: 'Python', level: 75 },
    { name: 'PostgreSQL', level: 80 }
  ],
  tools: [
    { name: 'Git', level: 85 },
    { name: 'Docker', level: 78 },
    { name: 'AWS', level: 72 }
  ]
};