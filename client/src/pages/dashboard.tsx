import { useLocation, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useOnboarding } from "@/lib/onboarding-context";
import { getModulesForRole } from "@/lib/training-data";
import { roleLabels, type Role } from "@shared/schema";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Trophy,
  Target,
  Sparkles,
  CheckCircle2,
  Play
} from "lucide-react";

const greetings = [
  "Welcome back",
  "Good to see you",
  "Let's learn",
  "Ready to grow"
];

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  advanced: "bg-red-500/10 text-red-600 dark:text-red-400"
};

const categoryIcons = {
  culture: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  tools: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  role_specific: "bg-green-500/10 text-green-600 dark:text-green-400",
  best_practices: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
};

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { session } = useOnboarding();

  if (!session) {
    navigate("/");
    return null;
  }

  const modules = getModulesForRole(session.role);
  const completedModules = session.progress.filter(p => p.status === "completed").length;
  const inProgressModules = session.progress.filter(p => p.status === "in_progress").length;
  const progressPercent = modules.length > 0 ? Math.round((completedModules / modules.length) * 100) : 0;

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Get next recommended module (first not started or in progress)
  const getNextModule = () => {
    const inProgress = modules.find(m => 
      session.progress.find(p => p.moduleId === m.id && p.status === "in_progress")
    );
    if (inProgress) return inProgress;

    return modules.find(m => 
      !session.progress.find(p => p.moduleId === m.id)
    );
  };

  const nextModule = getNextModule();

  const getModuleStatus = (moduleId: string) => {
    const progress = session.progress.find(p => p.moduleId === moduleId);
    return progress?.status || "not_started";
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge variant="secondary" className="mb-3">
              <Sparkles className="mr-1 h-3 w-3" />
              {roleLabels[session.role]}
            </Badge>
            <h1 className="text-3xl font-bold" data-testid="text-welcome">
              {randomGreeting}, {session.name}!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Continue your onboarding journey. You're making great progress!
            </p>
          </div>
          <div className="flex gap-3">
            {nextModule && (
              <Button onClick={() => navigate(`/modules/${nextModule.id}`)} data-testid="button-continue-learning">
                Continue Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate("/assistant")} data-testid="button-ask-ai">
              Ask AI Assistant
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="text-2xl font-bold" data-testid="text-progress-percent">{progressPercent}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold" data-testid="text-completed-modules">
                {completedModules} / {modules.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
              <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold" data-testid="text-in-progress-modules">{inProgressModules}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
              <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Achievements</p>
              <p className="text-2xl font-bold" data-testid="text-achievements">
                {completedModules > 0 ? completedModules : 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>Your journey to becoming an AI Company team member</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {completedModules} of {modules.length} modules completed
              </span>
              <span className="font-medium">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" data-testid="progress-overall" />
          </div>
        </CardContent>
      </Card>

      {/* Next Recommended Module */}
      {nextModule && (
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <CardTitle className="text-lg">Recommended Next</CardTitle>
            </div>
            <CardDescription>Continue where you left off</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className={categoryIcons[nextModule.category]}>
                    {nextModule.category.replace("_", " ")}
                  </Badge>
                  <Badge variant="outline" className={difficultyColors[nextModule.difficulty]}>
                    {nextModule.difficulty}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold" data-testid="text-next-module-title">
                  {nextModule.title}
                </h3>
                <p className="text-sm text-muted-foreground">{nextModule.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {nextModule.durationMinutes} min
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {nextModule.sections.length} sections
                  </span>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={() => navigate(`/modules/${nextModule.id}`)}
                data-testid="button-start-next-module"
              >
                <Play className="mr-2 h-4 w-4" />
                {getModuleStatus(nextModule.id) === "in_progress" ? "Continue" : "Start"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Training Modules Preview */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Training Modules</h2>
          <Button variant="ghost" asChild>
            <Link href="/modules" data-testid="link-view-all-modules">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.slice(0, 6).map((module) => {
            const status = getModuleStatus(module.id);
            const progress = session.progress.find(p => p.moduleId === module.id);
            const sectionProgress = progress 
              ? Math.round((progress.completedSections.length / module.sections.length) * 100)
              : 0;

            return (
              <Card 
                key={module.id} 
                className="group hover-elevate cursor-pointer"
                onClick={() => navigate(`/modules/${module.id}`)}
                data-testid={`card-module-${module.id}`}
              >
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge variant="secondary" className={categoryIcons[module.category]}>
                      {module.category.replace("_", " ")}
                    </Badge>
                    {status === "completed" && (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <h3 className="font-semibold line-clamp-1">{module.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {module.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {module.durationMinutes} min
                    </span>
                    <Badge variant="outline" className={difficultyColors[module.difficulty]}>
                      {module.difficulty}
                    </Badge>
                  </div>
                  {status !== "not_started" && (
                    <div className="mt-3">
                      <Progress value={status === "completed" ? 100 : sectionProgress} className="h-1" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
