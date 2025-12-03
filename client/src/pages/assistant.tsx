import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useOnboarding } from "@/lib/onboarding-context";
import { roleLabels, type ChatMessage } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
  MessageSquare,
  Lightbulb,
  HelpCircle,
  BookOpen,
  Zap
} from "lucide-react";

const suggestedQuestions = [
  {
    icon: Lightbulb,
    question: "What are the key values at AI Company?",
    category: "Culture"
  },
  {
    icon: HelpCircle,
    question: "How do I use Replit for my projects?",
    category: "Tools"
  },
  {
    icon: BookOpen,
    question: "What training modules should I complete first?",
    category: "Onboarding"
  },
  {
    icon: Zap,
    question: "How can I be most effective in my role?",
    category: "Growth"
  }
];

export default function AssistantPage() {
  const [, navigate] = useLocation();
  const { session, addChatMessage } = useOnboarding();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session?.chatHistory]);

  if (!session) {
    navigate("/");
    return null;
  }

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        context: {
          userRole: session.role,
          userName: session.name
        }
      });
      return response.json();
    },
    onSuccess: (data) => {
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.message
      };
      addChatMessage(assistantMessage);
    },
    onError: (error) => {
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again."
      };
      addChatMessage(errorMessage);
    }
  });

  const handleSend = () => {
    const message = inputValue.trim();
    if (!message || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: message
    };
    addChatMessage(userMessage);
    setInputValue("");
    
    chatMutation.mutate(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    textareaRef.current?.focus();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold" data-testid="text-page-title">AI Assistant</h1>
        <p className="mt-2 text-muted-foreground">
          Ask me anything about AI Company, your role, or the tools we use
        </p>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Onboarding Assistant</CardTitle>
              <CardDescription>
                Powered by AI to help you succeed as a {roleLabels[session.role]}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {session.chatHistory.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">How can I help you today?</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground max-w-md">
                  I'm here to answer questions about AI Company, help you navigate your training,
                  and provide guidance on the tools you'll be using.
                </p>

                {/* Suggested Questions */}
                <div className="mt-8 grid gap-3 grid-cols-1 md:grid-cols-2 max-w-2xl w-full">
                  {suggestedQuestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedQuestion(item.question)}
                      className="flex items-start gap-3 rounded-lg border p-4 text-left transition-colors hover-elevate"
                      data-testid={`suggested-question-${idx}`}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-1 text-xs">
                          {item.category}
                        </Badge>
                        <p className="text-sm">{item.question}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {session.chatHistory.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    data-testid={`chat-message-${idx}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-primary/10">
                          <Bot className="h-4 w-4 text-primary" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {message.content.split("\n").map((line, lineIdx) => (
                          <p key={lineIdx} className="mb-2 last:mb-0">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getInitials(session.name)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {chatMutation.isPending && (
                  <div className="flex gap-3" data-testid="chat-loading">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-3">
              <Textarea
                ref={textareaRef}
                placeholder="Ask a question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[44px] max-h-32 resize-none"
                rows={1}
                data-testid="input-chat-message"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!inputValue.trim() || chatMutation.isPending}
                data-testid="button-send-message"
              >
                {chatMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground text-center">
              AI responses are generated and may not always be accurate. Verify important information.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
