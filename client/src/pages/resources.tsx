import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOnboarding } from "@/lib/onboarding-context";
import { getResourcesForRole, resources } from "@/lib/training-data";
import { toolLabels, type Tool } from "@shared/schema";
import {
  Search,
  ExternalLink,
  FileText,
  Video,
  BookOpen,
  GraduationCap,
  Filter
} from "lucide-react";

const typeIcons = {
  documentation: FileText,
  video: Video,
  guide: BookOpen,
  tutorial: GraduationCap
};

const typeColors = {
  documentation: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  video: "bg-red-500/10 text-red-600 dark:text-red-400",
  guide: "bg-green-500/10 text-green-600 dark:text-green-400",
  tutorial: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
};

const toolColors: Record<Tool, string> = {
  replit: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  bolt: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  lovable: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  softr: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  bubble: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  framer: "bg-violet-500/10 text-violet-600 dark:text-violet-400"
};

export default function ResourcesPage() {
  const [, navigate] = useLocation();
  const { session } = useOnboarding();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [activeTool, setActiveTool] = useState<Tool | "all">("all");

  if (!session) {
    navigate("/");
    return null;
  }

  const roleResources = getResourcesForRole(session.role);

  const filteredResources = roleResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === "all" || resource.type === activeType;
    const matchesTool = activeTool === "all" || resource.tools?.includes(activeTool);
    return matchesSearch && matchesType && matchesTool;
  });

  // Get unique tools from role resources
  const availableTools = Array.from(new Set(
    roleResources.flatMap(r => r.tools || [])
  ));

  // Get unique categories
  const categories = Array.from(new Set(roleResources.map(r => r.category)));

  const resourceTypes = ["all", "documentation", "video", "guide", "tutorial"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Resource Library</h1>
        <p className="mt-2 text-muted-foreground">
          Documentation, tutorials, and guides to help you succeed
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-resources"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={activeTool === "all" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setActiveTool("all")}
            data-testid="filter-tool-all"
          >
            All Tools
          </Badge>
          {availableTools.map(tool => (
            <Badge
              key={tool}
              variant={activeTool === tool ? "default" : "outline"}
              className={`cursor-pointer ${activeTool === tool ? "" : toolColors[tool]}`}
              onClick={() => setActiveTool(tool)}
              data-testid={`filter-tool-${tool}`}
            >
              {toolLabels[tool]}
            </Badge>
          ))}
        </div>
      </div>

      {/* Type Tabs */}
      <Tabs value={activeType} onValueChange={setActiveType}>
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
          {resourceTypes.slice(1).map(type => {
            const Icon = typeIcons[type as keyof typeof typeIcons];
            return (
              <TabsTrigger key={type} value={type} data-testid={`tab-${type}`}>
                <Icon className="mr-2 h-4 w-4" />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={activeType} className="mt-6">
          {filteredResources.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium">No resources found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {categories.map(category => {
                const categoryResources = filteredResources.filter(r => r.category === category);
                if (categoryResources.length === 0) return null;

                return (
                  <div key={category}>
                    <h2 className="mb-4 text-lg font-semibold">{category}</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {categoryResources.map((resource) => {
                        const TypeIcon = typeIcons[resource.type];

                        return (
                          <Card 
                            key={resource.id}
                            className="group hover-elevate"
                            data-testid={`card-resource-${resource.id}`}
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary" className={typeColors[resource.type]}>
                                  <TypeIcon className="mr-1 h-3 w-3" />
                                  {resource.type}
                                </Badge>
                              </div>
                              <CardTitle className="text-base line-clamp-1">
                                {resource.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-2">
                                {resource.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              {resource.tools && resource.tools.length > 0 && (
                                <div className="mb-4 flex flex-wrap gap-1">
                                  {resource.tools.map(tool => (
                                    <Badge 
                                      key={tool} 
                                      variant="outline" 
                                      className={`text-xs ${toolColors[tool]}`}
                                    >
                                      {toolLabels[tool]}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              <Button 
                                className="w-full" 
                                variant="outline"
                                onClick={() => window.open(resource.url, "_blank")}
                                data-testid={`button-open-${resource.id}`}
                              >
                                Open Resource
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
