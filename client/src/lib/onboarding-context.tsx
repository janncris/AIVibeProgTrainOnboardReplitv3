import { createContext, useContext, useState, useEffect } from "react";
import type { Role, OnboardingSession, ChatMessage, UserProgress } from "@shared/schema";

interface OnboardingContextType {
  session: OnboardingSession | null;
  setSession: (session: OnboardingSession | null) => void;
  updateProgress: (moduleId: string, sectionId?: string, completed?: boolean) => void;
  addChatMessage: (message: ChatMessage) => void;
  isLoading: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STORAGE_KEY = "onboarding_session";

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<OnboardingSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSessionState(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const setSession = (newSession: OnboardingSession | null) => {
    setSessionState(newSession);
    if (newSession) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const updateProgress = (moduleId: string, sectionId?: string, completed?: boolean) => {
    if (!session) return;

    const existingProgress = session.progress.find(p => p.moduleId === moduleId);
    let updatedProgress: UserProgress[];

    if (existingProgress) {
      updatedProgress = session.progress.map(p => {
        if (p.moduleId !== moduleId) return p;
        
        const completedSections = sectionId && !p.completedSections.includes(sectionId)
          ? [...p.completedSections, sectionId]
          : p.completedSections;

        return {
          ...p,
          completedSections,
          status: completed ? "completed" : p.status === "not_started" ? "in_progress" : p.status,
          completedAt: completed ? new Date().toISOString() : p.completedAt
        };
      });
    } else {
      const newProgress: UserProgress = {
        id: crypto.randomUUID(),
        odId: session.id,
        moduleId,
        status: completed ? "completed" : "in_progress",
        completedSections: sectionId ? [sectionId] : [],
        startedAt: new Date().toISOString(),
        completedAt: completed ? new Date().toISOString() : undefined
      };
      updatedProgress = [...session.progress, newProgress];
    }

    const updatedSession = {
      ...session,
      progress: updatedProgress,
      lastActivityAt: new Date().toISOString()
    };

    setSession(updatedSession);
  };

  const addChatMessage = (message: ChatMessage) => {
    if (!session) return;

    const updatedSession = {
      ...session,
      chatHistory: [...session.chatHistory, message],
      lastActivityAt: new Date().toISOString()
    };

    setSession(updatedSession);
  };

  return (
    <OnboardingContext.Provider value={{
      session,
      setSession,
      updateProgress,
      addChatMessage,
      isLoading
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
