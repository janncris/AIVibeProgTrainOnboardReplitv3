import { randomUUID } from "crypto";
import type { 
  OnboardingSession, 
  UserProgress, 
  ChatMessage,
  CreateSession,
  UpdateProgress,
  QuizResult 
} from "@shared/schema";

export interface IStorage {
  // Sessions
  createSession(data: CreateSession): Promise<OnboardingSession>;
  getSession(id: string): Promise<OnboardingSession | undefined>;
  updateSession(id: string, updates: Partial<OnboardingSession>): Promise<OnboardingSession | undefined>;
  deleteSession(id: string): Promise<boolean>;

  // Progress
  updateProgress(sessionId: string, moduleId: string, sectionId?: string, completed?: boolean, quizResult?: QuizResult): Promise<UserProgress | undefined>;
  getProgress(sessionId: string): Promise<UserProgress[]>;

  // Chat
  addChatMessage(sessionId: string, message: ChatMessage): Promise<ChatMessage[]>;
  getChatHistory(sessionId: string): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private sessions: Map<string, OnboardingSession>;

  constructor() {
    this.sessions = new Map();
  }

  async createSession(data: CreateSession): Promise<OnboardingSession> {
    const id = randomUUID();
    const now = new Date().toISOString();
    
    const session: OnboardingSession = {
      id,
      name: data.name,
      role: data.role,
      progress: [],
      chatHistory: [],
      createdAt: now,
      lastActivityAt: now
    };

    this.sessions.set(id, session);
    return session;
  }

  async getSession(id: string): Promise<OnboardingSession | undefined> {
    return this.sessions.get(id);
  }

  async updateSession(id: string, updates: Partial<OnboardingSession>): Promise<OnboardingSession | undefined> {
    const session = this.sessions.get(id);
    if (!session) return undefined;

    const updatedSession = {
      ...session,
      ...updates,
      lastActivityAt: new Date().toISOString()
    };

    this.sessions.set(id, updatedSession);
    return updatedSession;
  }

  async deleteSession(id: string): Promise<boolean> {
    return this.sessions.delete(id);
  }

  async updateProgress(
    sessionId: string, 
    moduleId: string, 
    sectionId?: string, 
    completed?: boolean,
    quizResult?: QuizResult
  ): Promise<UserProgress | undefined> {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    const existingProgress = session.progress.find(p => p.moduleId === moduleId);
    let updatedProgress: UserProgress;

    if (existingProgress) {
      const completedSections = sectionId && !existingProgress.completedSections.includes(sectionId)
        ? [...existingProgress.completedSections, sectionId]
        : existingProgress.completedSections;

      updatedProgress = {
        ...existingProgress,
        completedSections,
        status: completed ? "completed" : existingProgress.status === "not_started" ? "in_progress" : existingProgress.status,
        completedAt: completed ? new Date().toISOString() : existingProgress.completedAt,
        quizResult: quizResult || existingProgress.quizResult
      };

      session.progress = session.progress.map(p => 
        p.moduleId === moduleId ? updatedProgress : p
      );
    } else {
      updatedProgress = {
        id: randomUUID(),
        odId: sessionId,
        moduleId,
        status: completed ? "completed" : "in_progress",
        completedSections: sectionId ? [sectionId] : [],
        startedAt: new Date().toISOString(),
        completedAt: completed ? new Date().toISOString() : undefined,
        quizResult
      };

      session.progress.push(updatedProgress);
    }

    session.lastActivityAt = new Date().toISOString();
    this.sessions.set(sessionId, session);

    return updatedProgress;
  }

  async getProgress(sessionId: string): Promise<UserProgress[]> {
    const session = this.sessions.get(sessionId);
    return session?.progress || [];
  }

  async addChatMessage(sessionId: string, message: ChatMessage): Promise<ChatMessage[]> {
    const session = this.sessions.get(sessionId);
    if (!session) return [];

    session.chatHistory.push(message);
    session.lastActivityAt = new Date().toISOString();
    this.sessions.set(sessionId, session);

    return session.chatHistory;
  }

  async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    const session = this.sessions.get(sessionId);
    return session?.chatHistory || [];
  }
}

export const storage = new MemStorage();
