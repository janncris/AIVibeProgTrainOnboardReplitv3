import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useOnboarding } from "@/lib/onboarding-context";
import { getModulesForRole, getModuleById } from "@/lib/training-data";
import { roleLabels } from "@shared/schema";
import {
  Target,
  CheckCircle2,
  Clock,
  Trophy,
  TrendingUp,
  BookOpen,
  Calendar,
  Award
} from "lucide-react";

const categoryLabels = {
  culture: "Company Culture",
  tools: "Tools & Platforms",
  role_specific: "Role Specific",
  best_practices: "Best Practices"
};

const categoryColors = {
  culture: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  tools: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  role_specific: "bg-green-500/10 text-green-600 dark:text-green-400",
  best_practices: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
};

export default function ProgressPage() {
  const [, navigate] = useLocation();
  const { session } = useOnboarding();

  if (!session) {
    navigate("/");
    return null;
  }

  const modules = getModulesForRole(session.role);
  const completedModules = session.progress.filter(p => p.status === "completed");
  const inProgressModules = session.progress.filter(p => p.status === "in_progress");
  
  const totalModules = modules.length;
  const completedCount = completedModules.length;
  const inProgressCount = inProgressModules.length;
  const notStartedCount = totalModules - completedCount - inProgressCount;
  const progressPercent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  // Calculate estimated time remaining
  const remainingModules = modules.filter(m => 
    !session.progress.find(p => p.moduleId === m.id && p.status === "completed")
  );
  const estimatedTimeRemaining = remainingModules.reduce((acc, m) => acc + m.durationMinutes, 0);

  // Group modules by category
  const modulesByCategory = modules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, typeof modules>);

  // Calculate quiz performance
  const quizResults = completedModules
    .filter(p => p.quizResult)
    .map(p => p.quizResult!);
  const averageQuizScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((acc, r) => acc + r.score, 0) / quizResults.length)
    : 0;

  const getModuleProgress = (moduleId: string) => {
    const progress = session.progress.find(p => p.moduleId === moduleId);
    return progress;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Your Progress</h1>
        <p className="mt-2 text-muted-foreground">
          Track your onboarding journey and achievements
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <p className="text-2xl font-bold" data-testid="text-overall-progress">
                {progressPercent}%
              </p>
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
              <p className="text-2xl font-bold" data-testid="text-completed-count">
                {completedCount} / {totalModules}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time Remaining</p>
              <p className="text-2xl font-bold" data-testid="text-time-remaining">
                {Math.floor(estimatedTimeRemaining / 60)}h {estimatedTimeRemaining % 60}m
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
              <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quiz Average</p>
              <p className="text-2xl font-bold" data-testid="text-quiz-average">
                {averageQuizScore > 0 ? `${averageQuizScore}%` : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Progress by Category</CardTitle>
          <CardDescription>See how you're doing in each area</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(modulesByCategory).map(([category, categoryModules]) => {
            const categoryCompleted = categoryModules.filter(m =>
              session.progress.find(p => p.moduleId === m.id && p.status === "completed")
            ).length;
            const categoryProgress = Math.round((categoryCompleted / categoryModules.length) * 100);

            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={categoryColors[category as keyof typeof categoryColors]}>
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {categoryCompleted} / {categoryModules.length} modules
                    </span>
                  </div>
                  <span className="text-sm font-medium">{categoryProgress}%</span>
                </div>
                <Progress value={categoryProgress} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Module Details */}
      <Card>
        <CardHeader>
          <CardTitle>Module Details</CardTitle>
          <CardDescription>Detailed view of all your training modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modules.map((module) => {
              const progress = getModuleProgress(module.id);
              const status = progress?.status || "not_started";
              const sectionProgress = progress
                ? Math.round((progress.completedSections.length / module.sections.length) * 100)
                : 0;

              return (
                <div
                  key={module.id}
                  className="flex items-center gap-4 rounded-lg border p-4 hover-elevate cursor-pointer"
                  onClick={() => navigate(`/modules/${module.id}`)}
                  data-testid={`progress-module-${module.id}`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    status === "completed"
                      ? "bg-green-500/10"
                      : status === "in_progress"
                      ? "bg-amber-500/10"
                      : "bg-muted"
                  }`}>
                    {status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : status === "in_progress" ? (
                      <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate">{module.title}</h4>
                      <Badge variant="outline" className="shrink-0">
                        {module.durationMinutes} min
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{module.sections.length} sections</span>
                      {progress?.completedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Completed {new Date(progress.completedAt).toLocaleDateString()}
                        </span>
                      )}
                      {progress?.quizResult && (
                        <span className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          Quiz: {progress.quizResult.score}%
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-24 shrink-0">
                    {status !== "not_started" && (
                      <div className="space-y-1">
                        <div className="text-right text-xs text-muted-foreground">
                          {status === "completed" ? "100%" : `${sectionProgress}%`}
                        </div>
                        <Progress 
                          value={status === "completed" ? 100 : sectionProgress} 
                          className="h-1.5" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      {completedCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Badges earned through your training</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {completedModules.map((progress) => {
                const module = getModuleById(progress.moduleId);
                if (!module) return null;

                return (
                  <div
                    key={progress.id}
                    className="flex flex-col items-center rounded-lg border p-4 text-center"
                    data-testid={`achievement-${module.id}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="mt-3 text-sm font-medium line-clamp-2">{module.title}</h4>
                    {progress.quizResult && (
                      <Badge variant="secondary" className="mt-2">
                        Score: {progress.quizResult.score}%
                      </Badge>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {progress.completedAt && new Date(progress.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
