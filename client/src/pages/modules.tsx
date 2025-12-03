import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOnboarding } from "@/lib/onboarding-context";
import { getModulesForRole } from "@/lib/training-data";
import { toolLabels, type Tool } from "@shared/schema";
import {
  Search,
  Clock,
  BookOpen,
  CheckCircle2,
  Play,
  Filter
} from "lucide-react";

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  advanced: "bg-red-500/10 text-red-600 dark:text-red-400"
};

const categoryLabels = {
  culture: "Company Culture",
  tools: "Tools & Platforms",
  role_specific: "Role Specific",
  best_practices: "Best Practices"
};

const categoryIcons = {
  culture: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  tools: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  role_specific: "bg-green-500/10 text-green-600 dark:text-green-400",
  best_practices: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
};

export default function ModulesPage() {
  const [, navigate] = useLocation();
  const { session } = useOnboarding();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  if (!session) {
    navigate("/");
    return null;
  }

  const allModules = getModulesForRole(session.role);

  const filteredModules = allModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || module.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getModuleStatus = (moduleId: string) => {
    const progress = session.progress.find(p => p.moduleId === moduleId);
    return progress?.status || "not_started";
  };

  const getModuleProgress = (moduleId: string, sectionsCount: number) => {
    const progress = session.progress.find(p => p.moduleId === moduleId);
    if (!progress) return 0;
    if (progress.status === "completed") return 100;
    return Math.round((progress.completedSections.length / sectionsCount) * 100);
  };

  const categories = ["all", "culture", "tools", "role_specific", "best_practices"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Training Modules</h1>
        <p className="mt-2 text-muted-foreground">
          Complete these modules to master your role at AI Company
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-modules"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredModules.length} module{filteredModules.length !== 1 ? "s" : ""} available
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
          {categories.slice(1).map(cat => (
            <TabsTrigger key={cat} value={cat} data-testid={`tab-${cat}`}>
              {categoryLabels[cat as keyof typeof categoryLabels]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          {filteredModules.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium">No modules found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredModules.map((module) => {
                const status = getModuleStatus(module.id);
                const progress = getModuleProgress(module.id, module.sections.length);

                return (
                  <Card 
                    key={module.id}
                    className="group hover-elevate cursor-pointer"
                    onClick={() => navigate(`/modules/${module.id}`)}
                    data-testid={`card-module-${module.id}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className={categoryIcons[module.category]}>
                          {categoryLabels[module.category]}
                        </Badge>
                        {status === "completed" && (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        )}
                      </div>
                      <CardTitle className="line-clamp-1">{module.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Tools badges */}
                      {module.tools && module.tools.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1">
                          {module.tools.map(tool => (
                            <Badge key={tool} variant="outline" className="text-xs">
                              {toolLabels[tool]}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {module.durationMinutes} min
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {module.sections.length} sections
                        </span>
                        <Badge variant="outline" className={difficultyColors[module.difficulty]}>
                          {module.difficulty}
                        </Badge>
                      </div>

                      {status !== "not_started" && (
                        <div className="mt-4 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-1.5" />
                        </div>
                      )}

                      <Button 
                        className="mt-4 w-full" 
                        variant={status === "completed" ? "secondary" : "default"}
                        data-testid={`button-module-${module.id}`}
                      >
                        {status === "completed" ? (
                          <>Review Module</>
                        ) : status === "in_progress" ? (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Continue
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Start Module
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
