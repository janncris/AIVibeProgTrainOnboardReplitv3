import type { TrainingModule, Resource, Role, Tool } from "@shared/schema";

// Training modules for all roles
export const trainingModules: TrainingModule[] = [
  // Company Culture Module (All roles)
  {
    id: "culture-101",
    title: "Welcome to AI Company",
    description: "Learn about our mission, values, and company culture that drives innovation.",
    category: "culture",
    roles: ["developer", "project_manager", "product_owner", "ui_ux_designer", "qa", "frontend_dev", "backend_dev", "devops_engineer", "business_analyst", "non_it_employee"],
    difficulty: "beginner",
    durationMinutes: 30,
    sections: [
      {
        id: "culture-1-1",
        title: "Our Mission & Vision",
        content: "At AI Company, we're on a mission to democratize software development through artificial intelligence. We believe that everyone should be able to bring their ideas to life, regardless of their technical background.\n\nOur vision is to create a world where the barrier between imagination and creation is eliminated. Through our innovative AI-powered tools and platforms, we're making this vision a reality every day.",
        type: "text"
      },
      {
        id: "culture-1-2",
        title: "Core Values",
        content: "**Innovation First**: We embrace new ideas and technologies to stay ahead.\n\n**Customer Obsession**: Every decision starts with our customers' needs.\n\n**Collaboration**: Great things happen when we work together.\n\n**Continuous Learning**: We grow by learning from successes and failures.\n\n**Integrity**: We do the right thing, even when no one is watching.",
        type: "text"
      },
      {
        id: "culture-1-3",
        title: "Team Structure",
        content: "Our company is organized into cross-functional pods that work on specific product areas. Each pod includes developers, designers, QA engineers, and product managers working together.\n\nWe use agile methodologies with two-week sprints and regular retrospectives to continuously improve our processes.",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-culture-101",
      moduleId: "culture-101",
      title: "Company Culture Quiz",
      passingScore: 70,
      questions: [
        {
          id: "q1",
          question: "What is AI Company's primary mission?",
          options: [
            "To replace all human developers with AI",
            "To democratize software development through AI",
            "To build the most complex software systems",
            "To eliminate the need for coding education"
          ],
          correctAnswer: 1,
          explanation: "Our mission is to democratize software development, making it accessible to everyone through AI-powered tools."
        },
        {
          id: "q2",
          question: "Which of the following is NOT one of our core values?",
          options: [
            "Innovation First",
            "Customer Obsession",
            "Individual Competition",
            "Continuous Learning"
          ],
          correctAnswer: 2,
          explanation: "We value Collaboration, not individual competition. Great things happen when we work together."
        },
        {
          id: "q3",
          question: "How are teams structured at AI Company?",
          options: [
            "By function (all developers together, all designers together)",
            "By seniority level",
            "Cross-functional pods working on specific product areas",
            "Individual contributors working independently"
          ],
          correctAnswer: 2,
          explanation: "We use cross-functional pods that include developers, designers, QA, and product managers working together."
        }
      ]
    }
  },

  // Replit Training Module
  {
    id: "tools-replit",
    title: "Getting Started with Replit",
    description: "Master Replit's AI-powered collaborative coding platform for building and deploying applications.",
    category: "tools",
    roles: ["developer", "frontend_dev", "backend_dev", "devops_engineer", "non_it_employee"],
    tools: ["replit"],
    difficulty: "beginner",
    durationMinutes: 45,
    sections: [
      {
        id: "replit-1",
        title: "Introduction to Replit",
        content: "Replit is a powerful online development environment that combines coding, AI assistance, and deployment into one seamless platform.\n\nKey features include:\n- **Browser-based IDE**: Code from anywhere without local setup\n- **AI Agent**: Get intelligent coding assistance and auto-completions\n- **Instant Deployment**: Deploy your applications with one click\n- **Collaboration**: Work with team members in real-time\n- **Database Integration**: Built-in PostgreSQL for data persistence",
        type: "text"
      },
      {
        id: "replit-2",
        title: "Creating Your First Repl",
        content: "Follow these steps to create your first project:\n\n1. Click the '+' button or 'Create Repl'\n2. Choose a template (React, Python, Node.js, etc.)\n3. Name your project\n4. Start coding!\n\nThe AI Agent can help you scaffold projects, debug code, and even build entire features.",
        type: "interactive"
      },
      {
        id: "replit-3",
        title: "Using the AI Agent",
        content: "The Replit AI Agent is your intelligent coding companion. Here's how to use it effectively:\n\n- **Ask questions**: Type natural language queries about your code\n- **Generate code**: Describe what you want to build\n- **Debug issues**: Paste error messages for solutions\n- **Refactor**: Ask to improve existing code\n\nPro tip: Be specific in your requests for better results!",
        type: "text"
      },
      {
        id: "replit-4",
        title: "Deployment Basics",
        content: "Replit makes deployment effortless:\n\n1. Click the 'Deploy' button in your workspace\n2. Choose your deployment type (Reserved VM, Autoscale, or Static)\n3. Configure domain settings\n4. Click 'Deploy'\n\nYour app is now live with a .replit.app domain!",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-replit",
      moduleId: "tools-replit",
      title: "Replit Fundamentals Quiz",
      passingScore: 70,
      questions: [
        {
          id: "rq1",
          question: "What is a key advantage of Replit's browser-based IDE?",
          options: [
            "It only works on Windows",
            "Code from anywhere without local setup",
            "It requires installing multiple plugins",
            "It only supports JavaScript"
          ],
          correctAnswer: 1,
          explanation: "Replit's browser-based IDE allows you to code from any device without setting up a local development environment."
        },
        {
          id: "rq2",
          question: "What can the Replit AI Agent help you with?",
          options: [
            "Only writing tests",
            "Only deploying applications",
            "Code generation, debugging, and refactoring",
            "Only database management"
          ],
          correctAnswer: 2,
          explanation: "The AI Agent is a versatile tool that helps with code generation, debugging, refactoring, and answering questions about your code."
        }
      ]
    }
  },

  // Bolt Training Module
  {
    id: "tools-bolt",
    title: "Building with Bolt",
    description: "Learn to use Bolt's AI code generation for rapid application development.",
    category: "tools",
    roles: ["developer", "frontend_dev", "backend_dev", "non_it_employee"],
    tools: ["bolt"],
    difficulty: "beginner",
    durationMinutes: 40,
    sections: [
      {
        id: "bolt-1",
        title: "What is Bolt?",
        content: "Bolt is an AI-powered code generation tool that helps developers build applications faster than ever before.\n\n**Core Capabilities**:\n- Natural language to code conversion\n- Full-stack application generation\n- Smart component creation\n- Automated testing setup\n\nBolt understands context and can generate entire features from descriptions.",
        type: "text"
      },
      {
        id: "bolt-2",
        title: "Prompt Engineering for Bolt",
        content: "Writing effective prompts is key to getting great results from Bolt:\n\n**Good prompt**: 'Create a React component for a user profile card that displays name, email, avatar, and a follow button with proper TypeScript types'\n\n**Less effective**: 'Make a profile thing'\n\nBe specific about:\n- Technology stack\n- Functionality required\n- Styling preferences\n- Type requirements",
        type: "text"
      },
      {
        id: "bolt-3",
        title: "Iterating on Generated Code",
        content: "Bolt excels at iterative development:\n\n1. Start with a basic prompt\n2. Review the generated code\n3. Ask for modifications: 'Add dark mode support' or 'Make the button animate on hover'\n4. Continue refining until you're satisfied\n\nTreat Bolt as a coding partner, not a one-shot solution.",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-bolt",
      moduleId: "tools-bolt",
      title: "Bolt Basics Quiz",
      passingScore: 70,
      questions: [
        {
          id: "bq1",
          question: "What makes a good prompt for Bolt?",
          options: [
            "Very short and vague descriptions",
            "Specific details about technology, functionality, and styling",
            "Only mentioning the programming language",
            "Copying code from Stack Overflow"
          ],
          correctAnswer: 1,
          explanation: "Effective prompts include specific details about the technology stack, functionality, styling, and type requirements."
        }
      ]
    }
  },

  // Lovable Training Module
  {
    id: "tools-lovable",
    title: "Creating Apps with Lovable",
    description: "Discover Lovable's AI-first approach to building beautiful web applications.",
    category: "tools",
    roles: ["developer", "frontend_dev", "ui_ux_designer", "non_it_employee"],
    tools: ["lovable"],
    difficulty: "beginner",
    durationMinutes: 35,
    sections: [
      {
        id: "lovable-1",
        title: "Introduction to Lovable",
        content: "Lovable is an AI-first platform designed to help you build beautiful, functional web applications through natural conversation.\n\n**Why Lovable?**\n- Conversational interface for building apps\n- Beautiful default designs\n- Real-time preview\n- One-click deployment\n- GitHub integration",
        type: "text"
      },
      {
        id: "lovable-2",
        title: "Building Your First App",
        content: "Getting started with Lovable is simple:\n\n1. Describe your app idea in natural language\n2. Watch as Lovable generates your application\n3. Make adjustments through conversation\n4. Preview changes in real-time\n5. Deploy when ready\n\nLovable handles the technical complexity so you can focus on your vision.",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-lovable",
      moduleId: "tools-lovable",
      title: "Lovable Introduction Quiz",
      passingScore: 70,
      questions: [
        {
          id: "lq1",
          question: "What is Lovable's primary interface for building apps?",
          options: [
            "Command line interface",
            "Drag and drop builder",
            "Natural conversation",
            "Code-only editor"
          ],
          correctAnswer: 2,
          explanation: "Lovable uses a conversational interface where you describe what you want in natural language."
        }
      ]
    }
  },

  // Softr Training Module
  {
    id: "tools-softr",
    title: "No-Code with Softr",
    description: "Build powerful applications from Airtable or Google Sheets without writing code.",
    category: "tools",
    roles: ["business_analyst", "product_owner", "non_it_employee"],
    tools: ["softr"],
    difficulty: "beginner",
    durationMinutes: 50,
    sections: [
      {
        id: "softr-1",
        title: "What is Softr?",
        content: "Softr is a no-code platform that lets you turn your Airtable bases or Google Sheets into fully functional web applications.\n\n**Perfect for**:\n- Internal tools and dashboards\n- Client portals\n- Membership sites\n- Marketplaces\n- Job boards\n\nNo coding required - just connect your data and configure!",
        type: "text"
      },
      {
        id: "softr-2",
        title: "Connecting Data Sources",
        content: "Softr works seamlessly with your existing data:\n\n**Airtable Integration**:\n1. Connect your Airtable account\n2. Select the base and tables to use\n3. Softr automatically syncs your data\n\n**Google Sheets**:\n1. Authorize Softr to access Sheets\n2. Choose your spreadsheet\n3. Define column mappings\n\nChanges in your data source reflect instantly in your app!",
        type: "text"
      },
      {
        id: "softr-3",
        title: "Building Pages",
        content: "Create beautiful pages with pre-built blocks:\n\n- **Lists**: Display data in cards, tables, or grids\n- **Details**: Show individual record information\n- **Forms**: Collect and submit data\n- **Charts**: Visualize your data\n- **User Management**: Login, signup, profiles\n\nDrag, drop, and configure to match your needs.",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-softr",
      moduleId: "tools-softr",
      title: "Softr Fundamentals Quiz",
      passingScore: 70,
      questions: [
        {
          id: "sq1",
          question: "What data sources can Softr connect to?",
          options: [
            "Only custom databases",
            "Airtable and Google Sheets",
            "Only local files",
            "Only SQL databases"
          ],
          correctAnswer: 1,
          explanation: "Softr integrates with Airtable bases and Google Sheets to power your applications."
        }
      ]
    }
  },

  // Bubble Training Module
  {
    id: "tools-bubble",
    title: "Visual Programming with Bubble",
    description: "Master Bubble's visual programming platform to build complex web applications.",
    category: "tools",
    roles: ["business_analyst", "product_owner", "non_it_employee", "ui_ux_designer"],
    tools: ["bubble"],
    difficulty: "intermediate",
    durationMinutes: 60,
    sections: [
      {
        id: "bubble-1",
        title: "Bubble Overview",
        content: "Bubble is the most powerful no-code platform for building full-fledged web applications.\n\n**Capabilities**:\n- Visual drag-and-drop editor\n- Complex workflow logic\n- Database with relationships\n- API integrations\n- Custom plugins\n- Responsive design\n\nIf you can imagine it, you can probably build it in Bubble!",
        type: "text"
      },
      {
        id: "bubble-2",
        title: "The Bubble Editor",
        content: "The Bubble editor has several key tabs:\n\n**Design**: Build your UI with elements\n**Workflow**: Create logic and actions\n**Data**: Define your database structure\n**Styles**: Customize the look and feel\n**Plugins**: Add extra functionality\n**Settings**: Configure app settings\n\nMastering each tab unlocks Bubble's full potential.",
        type: "text"
      },
      {
        id: "bubble-3",
        title: "Building Workflows",
        content: "Workflows are the heart of Bubble applications:\n\n1. **Trigger**: What starts the workflow (button click, page load, etc.)\n2. **Actions**: What happens (create data, send email, navigate, etc.)\n3. **Conditions**: When should actions run\n\nExample workflow:\n- When: Button is clicked\n- Only when: Input's value is not empty\n- Action: Create a new thing in the database\n- Action: Show success message",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-bubble",
      moduleId: "tools-bubble",
      title: "Bubble Essentials Quiz",
      passingScore: 70,
      questions: [
        {
          id: "buq1",
          question: "What are the main components of a Bubble workflow?",
          options: [
            "Only triggers",
            "Triggers, actions, and conditions",
            "Only HTML and CSS",
            "Only database queries"
          ],
          correctAnswer: 1,
          explanation: "Bubble workflows consist of triggers (what starts it), actions (what happens), and conditions (when actions run)."
        }
      ]
    }
  },

  // Framer AI Training Module
  {
    id: "tools-framer",
    title: "Design & Prototype with Framer AI",
    description: "Use Framer AI to create stunning designs and interactive prototypes.",
    category: "tools",
    roles: ["ui_ux_designer", "frontend_dev", "product_owner", "non_it_employee"],
    tools: ["framer"],
    difficulty: "intermediate",
    durationMinutes: 45,
    sections: [
      {
        id: "framer-1",
        title: "Introduction to Framer AI",
        content: "Framer AI combines the power of AI with professional design tools to help you create beautiful, interactive websites.\n\n**Key Features**:\n- AI-generated layouts and content\n- Component-based design\n- Real interactions and animations\n- Built-in CMS\n- One-click publishing\n- Custom code components",
        type: "text"
      },
      {
        id: "framer-2",
        title: "AI-Powered Design",
        content: "Framer AI can help you:\n\n- **Generate entire pages** from descriptions\n- **Rewrite content** in different tones\n- **Create variations** of components\n- **Suggest layouts** based on your content\n\nTip: Start with AI-generated layouts, then customize to match your brand.",
        type: "text"
      },
      {
        id: "framer-3",
        title: "Adding Interactions",
        content: "Make your designs come alive:\n\n**Scroll Effects**: Parallax, fade-in on scroll\n**Hover States**: Scale, color changes, reveals\n**Click Interactions**: Page navigation, overlays\n**Animations**: Spring physics, easing curves\n\nFramer's interaction system is visual but powerful enough for complex effects.",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-framer",
      moduleId: "tools-framer",
      title: "Framer AI Quiz",
      passingScore: 70,
      questions: [
        {
          id: "fq1",
          question: "What can Framer AI help generate?",
          options: [
            "Only text content",
            "Layouts, content, and component variations",
            "Only color schemes",
            "Only icons"
          ],
          correctAnswer: 1,
          explanation: "Framer AI can generate entire pages, rewrite content, create component variations, and suggest layouts."
        }
      ]
    }
  },

  // Developer Best Practices
  {
    id: "best-practices-dev",
    title: "Developer Best Practices",
    description: "Essential coding standards, patterns, and practices for developers at AI Company.",
    category: "best_practices",
    roles: ["developer", "frontend_dev", "backend_dev"],
    difficulty: "intermediate",
    durationMinutes: 55,
    sections: [
      {
        id: "dev-bp-1",
        title: "Code Quality Standards",
        content: "At AI Company, we maintain high code quality through:\n\n**TypeScript First**: All new code should be written in TypeScript\n**Linting**: ESLint with our shared config\n**Formatting**: Prettier with consistent settings\n**Testing**: Unit tests for critical functions\n\nCode reviews are mandatory before merging.",
        type: "text"
      },
      {
        id: "dev-bp-2",
        title: "Git Workflow",
        content: "We follow a trunk-based development approach:\n\n1. Branch from `main` for features\n2. Use descriptive branch names: `feature/add-user-auth`\n3. Make small, focused commits\n4. Write meaningful commit messages\n5. Create PR for review\n6. Squash and merge to main\n\nDeploy often, fail fast, iterate quickly.",
        type: "text"
      },
      {
        id: "dev-bp-3",
        title: "Documentation",
        content: "Good documentation is essential:\n\n**Code Comments**: Explain 'why', not 'what'\n**README files**: Setup instructions for each project\n**API Documentation**: OpenAPI specs for endpoints\n**Architecture Decisions**: Record significant choices\n\nIf you build it, document it.",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-dev-bp",
      moduleId: "best-practices-dev",
      title: "Developer Best Practices Quiz",
      passingScore: 70,
      questions: [
        {
          id: "dbq1",
          question: "What programming language should be used for new code at AI Company?",
          options: [
            "JavaScript only",
            "TypeScript",
            "Python only",
            "Any language you prefer"
          ],
          correctAnswer: 1,
          explanation: "TypeScript is our standard for new development, providing type safety and better developer experience."
        }
      ]
    }
  },

  // Project Manager Module
  {
    id: "role-pm",
    title: "Project Management at AI Company",
    description: "Learn our agile processes, tools, and PM best practices.",
    category: "role_specific",
    roles: ["project_manager"],
    difficulty: "intermediate",
    durationMinutes: 50,
    sections: [
      {
        id: "pm-1",
        title: "Agile at AI Company",
        content: "We practice a hybrid agile methodology:\n\n**Sprint Cycles**: 2-week sprints with planning, daily standups, and retros\n**Kanban Elements**: WIP limits, continuous flow for support work\n**Ceremonies**:\n- Sprint Planning (Monday)\n- Daily Standup (15 min)\n- Sprint Review (Friday)\n- Retrospective (bi-weekly)\n\nFlexibility within structure is key.",
        type: "text"
      },
      {
        id: "pm-2",
        title: "Project Tools",
        content: "Our project management stack:\n\n**Linear**: Issue tracking and sprint management\n**Slack**: Team communication\n**Notion**: Documentation and wikis\n**Figma**: Design handoffs\n**GitHub**: Code and PRs\n\nKeep all project information in these tools, not in emails or personal docs.",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-pm",
      moduleId: "role-pm",
      title: "PM Practices Quiz",
      passingScore: 70,
      questions: [
        {
          id: "pmq1",
          question: "How long are sprint cycles at AI Company?",
          options: [
            "1 week",
            "2 weeks",
            "1 month",
            "Variable"
          ],
          correctAnswer: 1,
          explanation: "We use 2-week sprints to balance velocity with planning overhead."
        }
      ]
    }
  },

  // QA Engineer Module
  {
    id: "role-qa",
    title: "Quality Assurance Excellence",
    description: "Master our testing strategies, tools, and quality standards.",
    category: "role_specific",
    roles: ["qa"],
    difficulty: "intermediate",
    durationMinutes: 55,
    sections: [
      {
        id: "qa-1",
        title: "Testing Philosophy",
        content: "Quality is everyone's responsibility, but QA leads the way:\n\n**Shift Left**: Find bugs early in development\n**Automation First**: Automate what can be automated\n**Risk-Based Testing**: Focus on high-impact areas\n**Continuous Testing**: Tests run on every commit\n\nOur goal is confidence in every release.",
        type: "text"
      },
      {
        id: "qa-2",
        title: "Testing Types",
        content: "We employ multiple testing strategies:\n\n**Unit Tests**: Developers write, QA reviews\n**Integration Tests**: API and component interactions\n**E2E Tests**: Critical user journeys with Playwright\n**Performance Tests**: Load testing before releases\n**Security Tests**: Regular vulnerability scans\n\nBalance speed with coverage.",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-qa",
      moduleId: "role-qa",
      title: "QA Fundamentals Quiz",
      passingScore: 70,
      questions: [
        {
          id: "qaq1",
          question: "What does 'Shift Left' mean in our testing philosophy?",
          options: [
            "Move tests to the left column in the project board",
            "Find bugs early in development",
            "Test only the left side of the screen",
            "Only QA is responsible for testing"
          ],
          correctAnswer: 1,
          explanation: "Shift Left means moving testing earlier in the development process to catch bugs sooner and cheaper."
        }
      ]
    }
  },

  // UI/UX Designer Module
  {
    id: "role-designer",
    title: "Design at AI Company",
    description: "Our design system, process, and collaboration practices.",
    category: "role_specific",
    roles: ["ui_ux_designer"],
    difficulty: "intermediate",
    durationMinutes: 50,
    sections: [
      {
        id: "design-1",
        title: "Our Design System",
        content: "We use a component-based design system:\n\n**Foundation**: Colors, typography, spacing, shadows\n**Components**: Buttons, inputs, cards, navigation\n**Patterns**: Forms, tables, modals, layouts\n**Templates**: Common page structures\n\nConsistency across products is essential.",
        type: "text"
      },
      {
        id: "design-2",
        title: "Design Process",
        content: "Our design workflow:\n\n1. **Understand**: Research and requirements\n2. **Explore**: Sketches and wireframes\n3. **Design**: High-fidelity mockups in Figma\n4. **Prototype**: Interactive prototypes\n5. **Test**: User testing and feedback\n6. **Handoff**: Developer-ready specs\n7. **Iterate**: Refine based on feedback\n\nCollaborate early and often with developers.",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-designer",
      moduleId: "role-designer",
      title: "Design Process Quiz",
      passingScore: 70,
      questions: [
        {
          id: "dq1",
          question: "What tool do we use for design work?",
          options: [
            "Adobe XD",
            "Sketch",
            "Figma",
            "PowerPoint"
          ],
          correctAnswer: 2,
          explanation: "Figma is our primary design tool for creating and collaborating on designs."
        }
      ]
    }
  },

  // DevOps Module
  {
    id: "role-devops",
    title: "DevOps & Infrastructure",
    description: "Learn our CI/CD pipelines, cloud infrastructure, and deployment practices.",
    category: "role_specific",
    roles: ["devops_engineer"],
    difficulty: "advanced",
    durationMinutes: 60,
    sections: [
      {
        id: "devops-1",
        title: "Infrastructure Overview",
        content: "Our cloud infrastructure:\n\n**Primary Cloud**: AWS and Google Cloud\n**Container Orchestration**: Kubernetes (GKE)\n**CI/CD**: GitHub Actions + ArgoCD\n**Monitoring**: DataDog, Grafana\n**IaC**: Terraform for all infrastructure\n\nEverything as code, everything automated.",
        type: "text"
      },
      {
        id: "devops-2",
        title: "Deployment Pipeline",
        content: "Our deployment workflow:\n\n1. Push to feature branch\n2. Automated tests run\n3. Build Docker image\n4. Deploy to staging\n5. Run E2E tests\n6. Manual approval for production\n7. Canary deployment\n8. Full rollout\n\nRollback is always one click away.",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-devops",
      moduleId: "role-devops",
      title: "DevOps Quiz",
      passingScore: 70,
      questions: [
        {
          id: "doq1",
          question: "What do we use for Infrastructure as Code?",
          options: [
            "Ansible only",
            "Terraform",
            "CloudFormation only",
            "Manual configuration"
          ],
          correctAnswer: 1,
          explanation: "We use Terraform for all infrastructure management, ensuring everything is version controlled and repeatable."
        }
      ]
    }
  },

  // Business Analyst Module  
  {
    id: "role-ba",
    title: "Business Analysis Fundamentals",
    description: "Bridge business needs with technical solutions effectively.",
    category: "role_specific",
    roles: ["business_analyst"],
    difficulty: "intermediate",
    durationMinutes: 45,
    sections: [
      {
        id: "ba-1",
        title: "Requirements Gathering",
        content: "Effective requirements lead to successful projects:\n\n**Stakeholder Interviews**: Understand needs and pain points\n**User Stories**: As a [user], I want [goal] so that [benefit]\n**Acceptance Criteria**: Clear definition of done\n**Documentation**: Requirements in Notion, linked in Linear\n\nAlways validate understanding with stakeholders.",
        type: "text"
      },
      {
        id: "ba-2",
        title: "Bridging Business & Tech",
        content: "You're the translator between worlds:\n\n- Translate business jargon to technical requirements\n- Translate technical constraints to business impact\n- Facilitate communication between teams\n- Ensure solutions meet actual business needs\n\nEmpathy for both sides is essential.",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-ba",
      moduleId: "role-ba",
      title: "Business Analysis Quiz",
      passingScore: 70,
      questions: [
        {
          id: "baq1",
          question: "What format do we use for user stories?",
          options: [
            "Just the feature name",
            "As a [user], I want [goal] so that [benefit]",
            "Technical specifications only",
            "Free-form paragraphs"
          ],
          correctAnswer: 1,
          explanation: "User stories follow the format: As a [user], I want [goal] so that [benefit] - capturing who, what, and why."
        }
      ]
    }
  },

  // Product Owner Module
  {
    id: "role-po",
    title: "Product Ownership at AI Company",
    description: "Define product vision and manage the backlog effectively.",
    category: "role_specific",
    roles: ["product_owner"],
    difficulty: "intermediate",
    durationMinutes: 50,
    sections: [
      {
        id: "po-1",
        title: "Product Vision",
        content: "As a Product Owner, you define and communicate:\n\n**Vision**: Where are we going?\n**Strategy**: How will we get there?\n**Roadmap**: What's the path?\n**Backlog**: What do we do next?\n\nEvery feature should trace back to the vision.",
        type: "text"
      },
      {
        id: "po-2",
        title: "Backlog Management",
        content: "A healthy backlog is:\n\n**Prioritized**: Most important items at top\n**Refined**: Ready for sprint planning\n**Balanced**: Mix of features, bugs, tech debt\n**Connected**: Linked to goals and metrics\n\nRegular grooming keeps the backlog fresh and actionable.",
        type: "text"
      }
    ],
    quiz: {
      id: "quiz-po",
      moduleId: "role-po",
      title: "Product Owner Quiz",
      passingScore: 70,
      questions: [
        {
          id: "poq1",
          question: "What should a healthy backlog contain?",
          options: [
            "Only new features",
            "Only bug fixes",
            "A balanced mix of features, bugs, and tech debt",
            "Only items for the current sprint"
          ],
          correctAnswer: 2,
          explanation: "A healthy backlog balances new features, bug fixes, and technical debt to ensure sustainable development."
        }
      ]
    }
  }
];

// Get modules for a specific role
export function getModulesForRole(role: Role): TrainingModule[] {
  return trainingModules.filter(module => module.roles.includes(role));
}

// Get module by ID
export function getModuleById(id: string): TrainingModule | undefined {
  return trainingModules.find(module => module.id === id);
}

// Resources library
export const resources: Resource[] = [
  {
    id: "res-1",
    title: "Replit Documentation",
    description: "Official documentation for Replit platform and features",
    type: "documentation",
    url: "https://docs.replit.com",
    roles: ["developer", "frontend_dev", "backend_dev", "devops_engineer", "non_it_employee"],
    tools: ["replit"],
    category: "Tools"
  },
  {
    id: "res-2",
    title: "Bubble Manual",
    description: "Comprehensive guide to building with Bubble",
    type: "documentation",
    url: "https://manual.bubble.io",
    roles: ["business_analyst", "product_owner", "non_it_employee"],
    tools: ["bubble"],
    category: "Tools"
  },
  {
    id: "res-3",
    title: "TypeScript Handbook",
    description: "Learn TypeScript from the official documentation",
    type: "tutorial",
    url: "https://www.typescriptlang.org/docs/",
    roles: ["developer", "frontend_dev", "backend_dev"],
    category: "Programming"
  },
  {
    id: "res-4",
    title: "Agile Manifesto",
    description: "The foundational document for agile development",
    type: "documentation",
    url: "https://agilemanifesto.org",
    roles: ["project_manager", "product_owner", "developer", "qa"],
    category: "Methodology"
  },
  {
    id: "res-5",
    title: "Framer Learn",
    description: "Video tutorials for mastering Framer",
    type: "video",
    url: "https://www.framer.com/learn/",
    roles: ["ui_ux_designer", "frontend_dev", "non_it_employee"],
    tools: ["framer"],
    category: "Tools"
  },
  {
    id: "res-6",
    title: "Softr Templates",
    description: "Pre-built templates to accelerate your Softr projects",
    type: "guide",
    url: "https://www.softr.io/templates",
    roles: ["business_analyst", "non_it_employee"],
    tools: ["softr"],
    category: "Tools"
  },
  {
    id: "res-7",
    title: "Design Systems Guide",
    description: "Best practices for building and maintaining design systems",
    type: "guide",
    url: "https://designsystems.com",
    roles: ["ui_ux_designer", "frontend_dev"],
    category: "Design"
  },
  {
    id: "res-8",
    title: "Testing Best Practices",
    description: "Comprehensive guide to software testing strategies",
    type: "documentation",
    url: "https://testing-library.com",
    roles: ["qa", "developer", "frontend_dev", "backend_dev"],
    category: "Quality"
  },
  {
    id: "res-9",
    title: "Kubernetes Documentation",
    description: "Official Kubernetes docs for container orchestration",
    type: "documentation",
    url: "https://kubernetes.io/docs/home/",
    roles: ["devops_engineer", "backend_dev"],
    category: "Infrastructure"
  },
  {
    id: "res-10",
    title: "Product Management Guide",
    description: "Comprehensive guide to effective product management",
    type: "guide",
    url: "https://www.productplan.com/learn/",
    roles: ["product_owner", "project_manager"],
    category: "Product"
  },
  {
    id: "res-11",
    title: "Lovable Documentation",
    description: "Getting started with Lovable AI platform",
    type: "documentation",
    url: "https://docs.lovable.dev",
    roles: ["developer", "frontend_dev", "non_it_employee"],
    tools: ["lovable"],
    category: "Tools"
  },
  {
    id: "res-12",
    title: "Bolt AI Tutorials",
    description: "Learn to use Bolt for rapid development",
    type: "video",
    url: "https://bolt.new",
    roles: ["developer", "frontend_dev", "backend_dev", "non_it_employee"],
    tools: ["bolt"],
    category: "Tools"
  }
];

// Get resources for a specific role
export function getResourcesForRole(role: Role): Resource[] {
  return resources.filter(resource => resource.roles.includes(role));
}

// Get resources for a specific tool
export function getResourcesForTool(tool: Tool): Resource[] {
  return resources.filter(resource => resource.tools?.includes(tool));
}
