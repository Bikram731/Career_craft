const dummyCareers = [
  {
    title: "Frontend Developer",
    description: "Build beautiful and interactive user interfaces using HTML, CSS, and JavaScript frameworks like React.",
    skills: ["HTML", "CSS", "JavaScript", "React", "UI Design"],
    resources: [
      { title: "HTML & CSS Basics", url: "https://www.freecodecamp.org", type: "article" },
      { title: "JavaScript for Beginners", url: "https://javascript.info", type: "video" },
      { title: "React Crash Course", url: "https://youtube.com/react-course", type: "video" },
    ],
    progressSteps: [
      { stepTitle: "Learn HTML/CSS" },
      { stepTitle: "Understand JavaScript" },
      { stepTitle: "Build a React App" }
    ],
     milestones: [
      {
        milestoneTitle: "Learn HTML/CSS",
        description: "Complete: Learn HTML/CSS",
        order: 1
      },
      {
        milestoneTitle: "Understand JavaScript",
        description: "Complete: Understand JavaScript",
        order: 2
      },
      {
        milestoneTitle: "Build a React App",
        description: "Complete: Build a React App",
        order: 3
      }
    ],
    difficulty: "Beginner",
    category: "Software Development",
    tags: ["html", "css", "javascript", "react", "frontend"],
    isPopular: true,
    level: "Beginner"
  },
  {
    title: "Data Scientist",
    description: "Extract insights from data using statistics, programming, and machine learning techniques.",
    skills: ["Python", "Pandas", "Machine Learning", "Data Visualization"],
    resources: [
      { title: "Python for Data Science", url: "https://coursera.org/data-science", type: "course" },
      { title: "Pandas Tutorial", url: "https://pandas.pydata.org", type: "article" },
    ],
    progressSteps: [
      { stepTitle: "Learn Python Basics" },
      { stepTitle: "Work with Pandas" },
      { stepTitle: "Build ML Models" }
    ],
    milestones: [
      {
        milestoneTitle: "Learn Python Basics",
        description: "Complete: Learn Python Basics",
        order: 1
      },
      {
        milestoneTitle: "Work with Pandas",
        description: "Complete: Work with Pandas",
        order: 2
      },
      {
        milestoneTitle: "Build ML Models",
        description: "Complete: Build ML Models",
        order: 3
      }
    ],
    difficulty: "Intermediate",
    category: "Data Science",
    tags: ["python", "ml", "data", "pandas"],
    isPopular: true,
    level: "Intermediate"
  },
  {
    title: "UI/UX Designer",
    description: "Design intuitive and attractive user interfaces and experiences for digital products.",
    skills: ["Figma", "Wireframing", "Prototyping", "User Research"],
    resources: [
      { title: "Figma Basics", url: "https://figma.com/learn", type: "video" },
      { title: "UI/UX Design Principles", url: "https://uxdesign.cc", type: "article" },
    ],
    progressSteps: [
      { stepTitle: "Learn Figma" },
      { stepTitle: "Practice Wireframing" },
      { stepTitle: "Create a UI Portfolio" }
    ],
     milestones: [
      {
        milestoneTitle: "Learn Figma",
        description: "Complete: Learn Figma",
        order: 1
      },
      {
        milestoneTitle: "Practice Wireframing",
        description: "Complete: Practice Wireframing",
        order: 2
      },
      {
        milestoneTitle: "Create a UI Portfolio",
        description: "Complete: Create a UI Portfolio",
        order: 3
      }
    ],
    difficulty: "Beginner",
    category: "Design",
    tags: ["figma", "design", "ux", "ui"],
    isPopular: false,
    level: "Beginner"
  },
  {
    title: "DevOps Engineer",
    description: "Bridge development and operations by automating software delivery and infrastructure changes.",
    skills: ["Linux", "Docker", "CI/CD", "AWS"],
    resources: [
      { title: "Docker Tutorial", url: "https://docker.com", type: "course" },
      { title: "CI/CD Pipelines", url: "https://jenkins.io", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Understand Linux Commands" },
      { stepTitle: "Containerize App with Docker" },
      { stepTitle: "Implement CI/CD" }
    ],
    milestones: [
      {
        milestoneTitle: "Understand Linux Commands",
        description: "Complete: Understand Linux Commands",
        order: 1
      },
      {
        milestoneTitle: "Containerize App with Docker",
        description: "Complete: Containerize App with Docker",
        order: 2
      },
      {
        milestoneTitle: "Implement CI/CD",
        description: "Complete: Implement CI/CD",
        order: 3
      }
    ],
    difficulty: "Advanced",
    category: "Infrastructure",
    tags: ["docker", "linux", "aws", "jenkins", "ci/cd"],
    isPopular: false,
    level: "Advanced"
  },
  {
    title: "Backend Developer",
    description: "Develop server-side logic, APIs, and databases to support frontend functionality.",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
    resources: [
      { title: "Node.js Crash Course", url: "https://youtube.com/node-crash", type: "video" },
      { title: "Build REST APIs", url: "https://expressjs.com", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Learn Node.js Basics" },
      { stepTitle: "Build Express API" },
      { stepTitle: "Connect with MongoDB" }
    ],
     milestones: [
      {
        milestoneTitle: "Learn Node.js Basics",
        description: "Complete: Learn Node.js Basics",
        order: 1
      },
      {
        milestoneTitle: "Build Express API",
        description: "Complete: Build Express API",
        order: 2
      },
      {
        milestoneTitle: "Connect with MongoDB",
        description: "Complete: Connect with MongoDB",
        order: 3
      }
    ],
    difficulty: "Intermediate",
    category: "Software Development",
    tags: ["nodejs", "express", "api", "mongodb", "backend"],
    isPopular: true,
    level: "Intermediate"
  },
  {
    title: "AI Engineer",
    description: "Develop intelligent systems that can learn and make decisions like humans.",
    skills: ["Python", "TensorFlow", "Deep Learning", "NLP"],
    resources: [
      { title: "Deep Learning Specialization", url: "https://deeplearning.ai", type: "course" },
      { title: "NLP with Transformers", url: "https://huggingface.co", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Master Python" },
      { stepTitle: "Understand Neural Networks" },
      { stepTitle: "Build NLP Models" }
    ],
     milestones: [
    {
      milestoneTitle: "Master Python",
      description: "Become proficient in Python for data analysis and scripting.",
      order: 1
    },
    {
      milestoneTitle: "Understand Neural Networks",
      description: "Learn the fundamentals of deep learning and neural network architectures.",
      order: 2
    },
    {
      milestoneTitle: "Build NLP Models",
      description: "Use transformers and NLP tools to build intelligent text-processing models.",
      order: 3
    }
  ],
    difficulty: "Advanced",
    category: "Artificial Intelligence",
    tags: ["python", "tensorflow", "ai", "nlp", "deep learning"],
    isPopular: true,
    level: "Advanced"
  },
  {
    title: "Mobile App Developer",
    description: "Create engaging mobile apps for Android and iOS using native or cross-platform tools.",
    skills: ["Flutter", "Dart", "Firebase", "UI Design"],
    resources: [
      { title: "Flutter for Beginners", url: "https://flutter.dev/docs", type: "course" },
      { title: "Firebase Authentication", url: "https://firebase.google.com", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Learn Dart Language" },
      { stepTitle: "Build UI with Flutter" },
      { stepTitle: "Add Firebase Auth" }
    ],
    milestones: [
    {
      milestoneTitle: "Learn Dart Language",
      description: "Understand the Dart programming language syntax, types, and functions.",
      order: 1
    },
    {
      milestoneTitle: "Build UI with Flutter",
      description: "Learn how to use Flutter widgets and layouts to design responsive UIs.",
      order: 2
    },
    {
      milestoneTitle: "Add Firebase Auth",
      description: "Integrate Firebase Authentication into your Flutter app for login/signup features.",
      order: 3
    }
  ],
    difficulty: "Intermediate",
    category: "Mobile Development",
    tags: ["flutter", "firebase", "dart", "mobile"],
    isPopular: false,
    level: "Intermediate"
  },
  {
    title: "Cybersecurity Analyst",
    description: "Protect systems and data from cyber threats using tools, monitoring, and best practices.",
    skills: ["Networking", "Ethical Hacking", "SIEM", "Risk Assessment"],
    resources: [
      { title: "Introduction to Cybersecurity", url: "https://cybrary.it", type: "video" },
      { title: "CompTIA Security+ Guide", url: "https://www.comptia.org", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Learn Networking Basics" },
      { stepTitle: "Understand Threats" },
      { stepTitle: "Perform Risk Analysis" }
    ],
     milestones: [
    {
      milestoneTitle: "Learn Networking Basics",
      description: "Gain foundational knowledge of networks, IPs, firewalls, and protocols.",
      order: 1
    },
    {
      milestoneTitle: "Understand Threats",
      description: "Identify common cyber threats like phishing, malware, and vulnerabilities.",
      order: 2
    },
    {
      milestoneTitle: "Perform Risk Analysis",
      description: "Assess and document risks, threats, and impacts on information systems.",
      order: 3
    }
  ],
    difficulty: "Intermediate",
    category: "Security",
    tags: ["cybersecurity", "network", "ethical hacking", "risk"],
    isPopular: false,
    level: "Intermediate"
  },
  {
    title: "Full Stack Developer",
    description: "Master both frontend and backend technologies to build complete web applications.",
    skills: ["HTML", "CSS", "React", "Node.js", "MongoDB"],
    resources: [
      { title: "MERN Stack Crash Course", url: "https://youtube.com/mern", type: "video" },
      { title: "Build Full Stack App", url: "https://freecodecamp.org", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Frontend with React" },
      { stepTitle: "Backend with Express" },
      { stepTitle: "Deploy Full Stack App" }
    ],
    milestones: [
    {
      milestoneTitle: "Frontend with React",
      description: "Build responsive and dynamic UIs using React components, hooks, and state.",
      order: 1
    },
    {
      milestoneTitle: "Backend with Express",
      description: "Set up RESTful APIs with Express and connect them to a database.",
      order: 2
    },
    {
      milestoneTitle: "Deploy Full Stack App",
      description: "Deploy the full stack app using services like Vercel, Render, or Heroku.",
      order: 3
    }
  ],
    difficulty: "Advanced",
    category: "Software Development",
    tags: ["mern", "fullstack", "react", "nodejs", "mongodb"],
    isPopular: true,
    level: "Advanced"
  },
  {
    title: "Product Manager",
    description: "Lead the product lifecycle from ideation to launch, coordinating between design, engineering, and business teams.",
    skills: ["Agile", "Scrum", "Market Research", "Communication", "Product Strategy"],
    resources: [
      { title: "Agile Product Management", url: "https://coursera.org/agile", type: "course" },
      { title: "Product Manager Toolkit", url: "https://medium.com/product-management", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Understand Product Lifecycle" },
      { stepTitle: "Learn Agile/Scrum" },
      { stepTitle: "Conduct Market Research" }
    ],
    milestones: [
  {
    milestoneTitle: "Understand Product Lifecycle",
    description: "Learn the stages of product development from ideation to launch and iteration.",
    order: 1
  },
  {
    milestoneTitle: "Learn Agile/Scrum",
    description: "Understand Agile principles, Scrum roles, ceremonies, and workflows.",
    order: 2
  },
  {
    milestoneTitle: "Conduct Market Research",
    description: "Gather customer insights, analyze competitors, and identify market gaps.",
    order: 3
  }
],
    difficulty: "Intermediate",
    category: "Product Management",
    tags: ["product", "management", "agile", "scrum"],
    isPopular: true,
    level: "Intermediate"
  },
  {
    title: "Cloud Architect",
    description: "Design and implement scalable and secure cloud infrastructure solutions using AWS, Azure, or GCP.",
    skills: ["AWS", "Azure", "GCP", "DevOps", "Security"],
    resources: [
      { title: "AWS Cloud Architect Path", url: "https://aws.amazon.com/training", type: "course" },
      { title: "Cloud Design Patterns", url: "https://cloud.google.com/architecture", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Learn AWS/Azure Basics" },
      { stepTitle: "Design Secure Cloud Infrastructure" },
      { stepTitle: "Deploy Scalable Apps" }
    ],
    milestones: [
  {
    milestoneTitle: "Learn AWS/Azure Basics",
    description: "Understand core cloud concepts like compute, storage, and networking across cloud providers.",
    order: 1
  },
  {
    milestoneTitle: "Design Secure Cloud Infrastructure",
    description: "Apply architecture best practices for scalability, availability, and security.",
    order: 2
  },
  {
    milestoneTitle: "Deploy Scalable Apps",
    description: "Use tools like Docker, Kubernetes, and CI/CD pipelines to deploy cloud-native applications.",
    order: 3
  }
],
    difficulty: "Advanced",
    category: "Cloud Computing",
    tags: ["cloud", "aws", "gcp", "azure", "devops"],
    isPopular: false,
    level: "Advanced"
  },
  {
    title: "Game Developer",
    description: "Build immersive games using game engines like Unity or Unreal, combining programming, graphics, and storytelling.",
    skills: ["Unity", "C#", "Game Design", "Animation", "Physics"],
    resources: [
      { title: "Unity Game Dev", url: "https://learn.unity.com", type: "course" },
      { title: "Game Dev Tutorials", url: "https://gamedev.net", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Learn Unity/C#" },
      { stepTitle: "Create Game Mechanics" },
      { stepTitle: "Publish a Game" }
    ],
    milestones: [
  {
    milestoneTitle: "Learn Unity/C#",
    description: "Master game development basics using Unity and programming in C#.",
    order: 1
  },
  {
    milestoneTitle: "Create Game Mechanics",
    description: "Build interactive features like physics, animations, scoring, and player controls.",
    order: 2
  },
  {
    milestoneTitle: "Publish a Game",
    description: "Finalize, test, and publish a game on platforms like Steam, Play Store, or App Store.",
    order: 3
  }
],
    difficulty: "Intermediate",
    category: "Game Development",
    tags: ["unity", "game", "c#", "developer"],
    isPopular: true,
    level: "Intermediate"
  },
  {
    title: "Business Analyst",
    description: "Analyze business processes, gather requirements, and recommend data-driven solutions for improvement.",
    skills: ["Excel", "SQL", "Data Analysis", "Communication", "Documentation"],
    resources: [
      { title: "Business Analysis Basics", url: "https://edx.org/business-analysis", type: "course" },
      { title: "SQL for Analysts", url: "https://mode.com/sql-tutorial", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Master Excel & SQL" },
      { stepTitle: "Analyze Business Problems" },
      { stepTitle: "Create Business Reports" }
    ],
    milestones: [
  {
    milestoneTitle: "Master Excel & SQL",
    description: "Develop proficiency in Excel functions and SQL queries for data manipulation.",
    order: 1
  },
  {
    milestoneTitle: "Analyze Business Problems",
    description: "Use data and stakeholder inputs to identify and document business needs.",
    order: 2
  },
  {
    milestoneTitle: "Create Business Reports",
    description: "Present actionable insights using dashboards, charts, and documentation tools.",
    order: 3
  }
],
    difficulty: "Beginner",
    category: "Business",
    tags: ["analysis", "sql", "excel", "reports"],
    isPopular: false,
    level: "Beginner"
  },
  {
    title: "AR/VR Developer",
    description: "Design and develop immersive AR/VR experiences using Unity, 3D modeling, and spatial computing.",
    skills: ["Unity", "C#", "3D Modeling", "ARKit", "VR"],
    resources: [
      { title: "AR/VR Development", url: "https://developer.oculus.com", type: "course" },
      { title: "Building for AR", url: "https://developer.apple.com/augmented-reality", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Learn Unity and C#" },
      { stepTitle: "Work with ARKit/ARCore" },
      { stepTitle: "Build an AR/VR App" }
    ],
    milestones: [
  {
    milestoneTitle: "Learn Unity and C#",
    description: "Understand the Unity engine and use C# to create interactive 3D experiences.",
    order: 1
  },
  {
    milestoneTitle: "Work with ARKit/ARCore",
    description: "Build augmented reality features using device-specific SDKs for iOS and Android.",
    order: 2
  },
  {
    milestoneTitle: "Build an AR/VR App",
    description: "Combine 3D assets, interaction logic, and platform tools to create a complete AR/VR app.",
    order: 3
  }
],
    difficulty: "Advanced",
    category: "Immersive Tech",
    tags: ["ar", "vr", "unity", "spatial", "3d"],
    isPopular: false,
    level: "Advanced"
  },
  {
    title: "SEO Specialist",
    description: "Optimize websites to rank higher in search engines and improve visibility and traffic through SEO strategies.",
    skills: ["SEO", "Google Analytics", "Keyword Research", "Content Strategy"],
    resources: [
      { title: "SEO Crash Course", url: "https://moz.com/learn/seo", type: "course" },
      { title: "Google Search Essentials", url: "https://search.google.com/search-console", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Learn Keyword Research" },
      { stepTitle: "Optimize On-Page SEO" },
      { stepTitle: "Track SEO Performance" }
    ],
    milestones: [
  {
    milestoneTitle: "Learn Keyword Research",
    description: "Understand how to find relevant, high-volume, and low-competition keywords for your niche.",
    order: 1
  },
  {
    milestoneTitle: "Optimize On-Page SEO",
    description: "Apply techniques like title optimization, meta tags, internal linking, and content formatting.",
    order: 2
  },
  {
    milestoneTitle: "Track SEO Performance",
    description: "Use tools like Google Analytics and Search Console to measure rankings and traffic growth.",
    order: 3
  }
],
    difficulty: "Beginner",
    category: "Digital Marketing",
    tags: ["seo", "marketing", "google", "analytics"],
    isPopular: false,
    level: "Beginner"
  },
  {
    title: "Robotics Engineer",
    description: "Design, build, and test robots and robotic systems for automation, healthcare, and industrial use.",
    skills: ["C++", "Python", "ROS", "Embedded Systems", "Electronics"],
    resources: [
      { title: "Introduction to Robotics", url: "https://coursera.org/robotics", type: "course" },
      { title: "ROS Tutorials", url: "https://wiki.ros.org", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Learn Electronics & Sensors" },
      { stepTitle: "Build Basic Robots" },
      { stepTitle: "Program with ROS" }
    ],
    milestones: [
  {
    milestoneTitle: "Learn Electronics & Sensors",
    description: "Understand electronic components, microcontrollers, and sensor integration.",
    order: 1
  },
  {
    milestoneTitle: "Build Basic Robots",
    description: "Create simple robots with motors, sensors, and basic control logic.",
    order: 2
  },
  {
    milestoneTitle: "Program with ROS",
    description: "Use the Robot Operating System to control and coordinate robotic systems.",
    order: 3
  }
],
    difficulty: "Advanced",
    category: "Robotics",
    tags: ["robotics", "ros", "c++", "python"],
    isPopular: false,
    level: "Advanced"
  },
  {
    title: "Technical Writer",
    description: "Create clear and concise documentation, manuals, and tutorials for technical products and software.",
    skills: ["Documentation", "Markdown", "API Writing", "Research", "Clarity"],
    resources: [
      { title: "Technical Writing Course", url: "https://udemy.com/technical-writing", type: "course" },
      { title: "Write the Docs", url: "https://www.writethedocs.org", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Understand the Product" },
      { stepTitle: "Learn API Documentation" },
      { stepTitle: "Write User Guides" }
    ],
    milestones: [
  {
    milestoneTitle: "Understand the Product",
    description: "Deeply explore the product or technology to understand its features and user workflows.",
    order: 1
  },
  {
    milestoneTitle: "Learn API Documentation",
    description: "Document REST APIs, SDKs, and integrations using tools like Swagger or Postman.",
    order: 2
  },
  {
    milestoneTitle: "Write User Guides",
    description: "Create beginner-friendly manuals, how-to guides, and tutorials with clear instructions.",
    order: 3
  }
],
    difficulty: "Beginner",
    category: "Writing",
    tags: ["documentation", "writing", "api", "manuals"],
    isPopular: false,
    level: "Beginner"
  },
  {
    title: "AI Prompt Engineer",
    description: "Design and optimize prompts to guide large language models (LLMs) like GPT to perform useful tasks.",
    skills: ["Prompt Design", "LLMs", "Testing", "Contextual Framing", "AI Tools"],
    resources: [
      { title: "Prompt Engineering Guide", url: "https://github.com/dair-ai/Prompt-Engineering-Guide", type: "article" },
      { title: "OpenAI Prompting Tips", url: "https://platform.openai.com/docs/guides/gpt", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Understand Prompt Basics" },
      { stepTitle: "Design Multi-Turn Prompts" },
      { stepTitle: "Test with LLMs" }
    ],
    milestones: [
  {
    milestoneTitle: "Understand Prompt Basics",
    description: "Learn how prompts guide LLMs and the importance of clarity, constraints, and context.",
    order: 1
  },
  {
    milestoneTitle: "Design Multi-Turn Prompts",
    description: "Structure prompts for follow-up responses and interactive sessions with LLMs.",
    order: 2
  },
  {
    milestoneTitle: "Test with LLMs",
    description: "Experiment with different phrasing and prompt engineering patterns to optimize output.",
    order: 3
  }
],
    difficulty: "Intermediate",
    category: "Artificial Intelligence",
    tags: ["prompt", "gpt", "llm", "ai"],
    isPopular: true,
    level: "Intermediate"
  },
  {
    title: "Blockchain Developer",
    description: "Develop decentralized apps and smart contracts using blockchain platforms like Ethereum and Solidity.",
    skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js", "Security"],
    resources: [
      { title: "Solidity Tutorial", url: "https://cryptozombies.io", type: "course" },
      { title: "Ethereum Docs", url: "https://ethereum.org/en/developers/", type: "article" }
    ],
    progressSteps: [
      { stepTitle: "Learn Solidity Basics" },
      { stepTitle: "Build Smart Contracts" },
      { stepTitle: "Deploy DApps" }
    ],
    milestones: [
  {
    milestoneTitle: "Learn Solidity Basics",
    description: "Understand Solidity syntax, types, functions, and contract structure on Ethereum.",
    order: 1
  },
  {
    milestoneTitle: "Build Smart Contracts",
    description: "Develop and test smart contracts for real-world use cases like tokens or voting.",
    order: 2
  },
  {
    milestoneTitle: "Deploy DApps",
    description: "Integrate smart contracts with Web3.js or Ethers.js and deploy decentralized applications.",
    order: 3
  }
],
    difficulty: "Advanced",
    category: "Blockchain",
    tags: ["blockchain", "solidity", "web3", "ethereum"],
    isPopular: true,
    level: "Advanced"
  }
];

module.exports = dummyCareers;