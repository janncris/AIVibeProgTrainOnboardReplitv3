import { z } from "zod";

// Role types for the platform
export const roles = [
  "developer",
  "project_manager", 
  "product_owner",
  "ui_ux_designer",
  "qa",
  "frontend_dev",
  "backend_dev",
  "devops_engineer",
  "business_analyst",
  "non_it_employee"
] as const;

export type Role = typeof roles[number];

export const roleLabels: Record<Role, string> = {
  developer: "Developer",
  project_manager: "Project Manager",
  product_owner: "Product Owner",
  ui_ux_designer: "UI/UX Designer",
  qa: "QA Engineer",
  frontend_dev: "Front-End Developer",
  backend_dev: "Back-End Developer",
  devops_engineer: "DevOps Engineer",
  business_analyst: "Business Analyst",
  non_it_employee: "Non-IT Employee"
};

export const roleDescriptions: Record<Role, string> = {
  developer: "Build and maintain software applications with cutting-edge AI tools",
  project_manager: "Lead teams and coordinate projects using agile methodologies",
  product_owner: "Define product vision and manage the product backlog",
  ui_ux_designer: "Create intuitive interfaces and exceptional user experiences",
  qa: "Ensure software quality through comprehensive testing strategies",
  frontend_dev: "Build responsive, accessible user interfaces",
  backend_dev: "Develop robust server-side applications and APIs",
  devops_engineer: "Manage infrastructure, CI/CD, and cloud deployments",
  business_analyst: "Bridge business needs with technical solutions",
  non_it_employee: "Learn no-code tools to build solutions without programming"
};

// Tool types used in training
export const tools = [
  "replit",
  "bolt",
  "lovable",
  "softr",
  "bubble",
  "framer"
] as const;

export type Tool = typeof tools[number];

export const toolLabels: Record<Tool, string> = {
  replit: "Replit",
  bolt: "Bolt",
  lovable: "Lovable",
  softr: "Softr",
  bubble: "Bubble",
  framer: "Framer AI"
};

export const toolDescriptions: Record<Tool, string> = {
  replit: "AI-powered collaborative coding platform for building and deploying apps",
  bolt: "AI code generation tool for rapid development",
  lovable: "AI-first platform for building web applications",
  softr: "No-code platform for building apps from Airtable or Google Sheets",
  bubble: "Visual programming platform for web applications",
  framer: "AI-powered design and prototyping tool"
};

// Difficulty levels
export const difficultyLevels = ["beginner", "intermediate", "advanced"] as const;
export type DifficultyLevel = typeof difficultyLevels[number];

// Module status
export const moduleStatuses = ["not_started", "in_progress", "completed"] as const;
export type ModuleStatus = typeof moduleStatuses[number];

// User schema
export const insertUserSchema = z.object({
  username: z.string().min(3).max(50),
  name: z.string().min(1).max(100),
  role: z.enum(roles),
  avatar: z.string().optional()
});

export type InsertUser = z.infer<typeof insertUserSchema>;

export interface User extends InsertUser {
  id: string;
  createdAt: string;
}

// Training Module schema
export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: "culture" | "tools" | "role_specific" | "best_practices";
  roles: Role[];
  tools?: Tool[];
  difficulty: DifficultyLevel;
  durationMinutes: number;
  sections: ModuleSection[];
  quiz?: Quiz;
}

export interface ModuleSection {
  id: string;
  title: string;
  content: string;
  type: "text" | "video" | "code" | "interactive";
  videoUrl?: string;
  codeSnippet?: string;
}

// Quiz schema
export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizAnswerSchema = z.object({
  quizId: z.string(),
  answers: z.array(z.number())
});

export type QuizAnswer = z.infer<typeof quizAnswerSchema>;

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  answeredAt: string;
}

// User Progress schema
export interface UserProgress {
  id: string;
  odId: string;
  moduleId: string;
  status: ModuleStatus;
  completedSections: string[];
  quizResult?: QuizResult;
  startedAt: string;
  completedAt?: string;
}

export const updateProgressSchema = z.object({
  odId: z.string(),
  moduleId: z.string(),
  sectionId: z.string().optional(),
  status: z.enum(moduleStatuses).optional()
});

export type UpdateProgress = z.infer<typeof updateProgressSchema>;

// Resource schema
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "documentation" | "video" | "guide" | "tutorial";
  url: string;
  roles: Role[];
  tools?: Tool[];
  category: string;
}

// AI Chat schema
export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string()
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const sendMessageSchema = z.object({
  message: z.string().min(1),
  context: z.object({
    userRole: z.enum(roles).optional(),
    userName: z.string().optional(),
    currentModule: z.string().optional()
  }).optional()
});

export type SendMessage = z.infer<typeof sendMessageSchema>;

// Onboarding session - tracks user's onboarding journey
export interface OnboardingSession {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
  progress: UserProgress[];
  chatHistory: ChatMessage[];
  createdAt: string;
  lastActivityAt: string;
}

export const createSessionSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.enum(roles)
});

export type CreateSession = z.infer<typeof createSessionSchema>;

// Dashboard stats
export interface DashboardStats {
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
  averageQuizScore: number;
  totalTimeSpent: number;
  currentStreak: number;
}
