import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/lib/onboarding-context";
import { getModuleById } from "@/lib/training-data";
import { toolLabels } from "@shared/schema";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  BookOpen,
  CheckCircle2,
  Circle,
  Play,
  Award,
  XCircle,
  RotateCcw
} from "lucide-react";

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  advanced: "bg-red-500/10 text-red-600 dark:text-red-400"
};

export default function ModuleDetailPage() {
  const [, navigate] = useLocation();
  const params = useParams<{ id: string }>();
  const { session, updateProgress } = useOnboarding();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const module = params.id ? getModuleById(params.id) : null;

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  if (!module || !session) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-medium">Module not found</p>
            <Button className="mt-4" onClick={() => navigate("/modules")}>
              Back to Modules
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = session.progress.find(p => p.moduleId === module.id);
  const completedSections = progress?.completedSections || [];
  const currentSection = module.sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === module.sections.length - 1;
  const isSectionCompleted = completedSections.includes(currentSection.id);
  const allSectionsCompleted = module.sections.every(s => completedSections.includes(s.id));
  const moduleProgress = Math.round((completedSections.length / module.sections.length) * 100);

  const handleNextSection = () => {
    if (!isSectionCompleted) {
      updateProgress(module.id, currentSection.id);
    }

    if (isLastSection) {
      if (module.quiz) {
        setShowQuiz(true);
      } else {
        updateProgress(module.id, undefined, true);
        navigate("/modules");
      }
    } else {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const handleQuizSubmit = () => {
    if (!module.quiz) return;

    let correct = 0;
    module.quiz.questions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / module.quiz.questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= module.quiz.passingScore) {
      updateProgress(module.id, undefined, true);
    }
  };

  const handleRetryQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  if (showQuiz && module.quiz) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setShowQuiz(false)} data-testid="button-back-to-content">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to content
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle>{module.quiz.title}</CardTitle>
            </div>
            <CardDescription>
              Answer all questions to complete this module. You need {module.quiz.passingScore}% to pass.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {quizSubmitted ? (
              <div className="space-y-6">
                <div className={`rounded-lg p-6 text-center ${
                  quizScore! >= module.quiz.passingScore 
                    ? "bg-green-500/10" 
                    : "bg-red-500/10"
                }`}>
                  {quizScore! >= module.quiz.passingScore ? (
                    <>
                      <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 dark:text-green-400" />
                      <h3 className="mt-4 text-xl font-semibold">Congratulations!</h3>
                      <p className="mt-2 text-muted-foreground">
                        You scored {quizScore}% and passed the quiz!
                      </p>
                    </>
                  ) : (
                    <>
                      <XCircle className="mx-auto h-12 w-12 text-red-600 dark:text-red-400" />
                      <h3 className="mt-4 text-xl font-semibold">Not quite there</h3>
                      <p className="mt-2 text-muted-foreground">
                        You scored {quizScore}%. You need {module.quiz.passingScore}% to pass.
                      </p>
                    </>
                  )}
                </div>

                {/* Show answers */}
                <div className="space-y-6">
                  {module.quiz.questions.map((q, idx) => {
                    const userAnswer = quizAnswers[q.id];
                    const isCorrect = userAnswer === q.correctAnswer;

                    return (
                      <div key={q.id} className="space-y-3">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <XCircle className="mt-0.5 h-5 w-5 text-red-600 dark:text-red-400" />
                          )}
                          <div>
                            <p className="font-medium">
                              {idx + 1}. {q.question}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Your answer: {q.options[userAnswer] || "Not answered"}
                            </p>
                            {!isCorrect && (
                              <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                                Correct answer: {q.options[q.correctAnswer]}
                              </p>
                            )}
                            <p className="mt-2 text-sm italic text-muted-foreground">
                              {q.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  {quizScore! < module.quiz.passingScore && (
                    <Button onClick={handleRetryQuiz} data-testid="button-retry-quiz">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Try Again
                    </Button>
                  )}
                  <Button 
                    variant={quizScore! >= module.quiz.passingScore ? "default" : "outline"} 
                    onClick={() => navigate("/modules")}
                    data-testid="button-back-to-modules"
                  >
                    Back to Modules
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {module.quiz.questions.map((q, idx) => (
                  <div key={q.id} className="space-y-4">
                    <p className="font-medium">
                      {idx + 1}. {q.question}
                    </p>
                    <RadioGroup
                      value={quizAnswers[q.id]?.toString()}
                      onValueChange={(value) => setQuizAnswers(prev => ({
                        ...prev,
                        [q.id]: parseInt(value)
                      }))}
                    >
                      {q.options.map((option, optIdx) => (
                        <div key={optIdx} className="flex items-center space-x-3">
                          <RadioGroupItem 
                            value={optIdx.toString()} 
                            id={`${q.id}-${optIdx}`}
                            data-testid={`radio-${q.id}-${optIdx}`}
                          />
                          <Label htmlFor={`${q.id}-${optIdx}`} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {idx < module.quiz.questions.length - 1 && <Separator />}
                  </div>
                ))}

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length < module.quiz.questions.length}
                  data-testid="button-submit-quiz"
                >
                  Submit Quiz
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/modules")} data-testid="button-back">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className={difficultyColors[module.difficulty]}>
              {module.difficulty}
            </Badge>
            {module.tools?.map(tool => (
              <Badge key={tool} variant="outline">
                {toolLabels[tool]}
              </Badge>
            ))}
          </div>
          <h1 className="mt-2 text-2xl font-bold" data-testid="text-module-title">
            {module.title}
          </h1>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Section {currentSectionIndex + 1} of {module.sections.length}
            </span>
            <span className="font-medium">{moduleProgress}% complete</span>
          </div>
          <Progress value={moduleProgress} className="mt-2 h-2" data-testid="progress-module" />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar - Section Navigation */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Sections</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="space-y-1 p-4 pt-0">
                {module.sections.map((section, idx) => {
                  const isCompleted = completedSections.includes(section.id);
                  const isCurrent = idx === currentSectionIndex;

                  return (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSectionIndex(idx)}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors hover-elevate ${
                        isCurrent
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground"
                      }`}
                      data-testid={`button-section-${idx}`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                      ) : (
                        <Circle className={`h-4 w-4 shrink-0 ${isCurrent ? "text-primary" : ""}`} />
                      )}
                      <span className="line-clamp-1">{section.title}</span>
                    </button>
                  );
                })}

                {module.quiz && (
                  <>
                    <Separator className="my-2" />
                    <button
                      onClick={() => allSectionsCompleted && setShowQuiz(true)}
                      disabled={!allSectionsCompleted}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        allSectionsCompleted
                          ? "hover-elevate text-muted-foreground"
                          : "cursor-not-allowed opacity-50"
                      }`}
                      data-testid="button-take-quiz"
                    >
                      <Award className="h-4 w-4 shrink-0" />
                      <span>Take Quiz</span>
                    </button>
                  </>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{currentSection.type}</Badge>
              {isSectionCompleted && (
                <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400">
                  Completed
                </Badge>
              )}
            </div>
            <CardTitle>{currentSection.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {currentSection.content.split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <h4 key={idx} className="font-semibold mt-4 mb-2">
                      {paragraph.replace(/\*\*/g, "")}
                    </h4>
                  );
                }
                if (paragraph.includes("**")) {
                  const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={idx} className="mb-4">
                      {parts.map((part, partIdx) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={partIdx}>{part.replace(/\*\*/g, "")}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  );
                }
                if (paragraph.startsWith("-")) {
                  const items = paragraph.split("\n").filter(Boolean);
                  return (
                    <ul key={idx} className="list-disc pl-6 mb-4 space-y-1">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item.replace(/^-\s*/, "")}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d\./)) {
                  const items = paragraph.split("\n").filter(Boolean);
                  return (
                    <ol key={idx} className="list-decimal pl-6 mb-4 space-y-1">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item.replace(/^\d+\.\s*/, "")}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={idx} className="mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {currentSection.codeSnippet && (
              <pre className="mt-6 rounded-lg bg-muted p-4 overflow-x-auto font-mono text-sm">
                <code>{currentSection.codeSnippet}</code>
              </pre>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevSection}
          disabled={currentSectionIndex === 0}
          data-testid="button-prev-section"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleNextSection} data-testid="button-next-section">
          {isLastSection ? (
            module.quiz ? "Take Quiz" : "Complete Module"
          ) : (
            "Next"
          )}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
