import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useOnboarding } from "@/lib/onboarding-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  roles, 
  roleLabels, 
  roleDescriptions, 
  type Role 
} from "@shared/schema";
import {
  Code2,
  Users,
  Target,
  Palette,
  TestTube,
  Layout,
  Server,
  Cloud,
  BarChart3,
  Sparkles,
  ArrowRight,
  Zap
} from "lucide-react";

const roleIcons: Record<Role, React.ReactNode> = {
  developer: <Code2 className="h-8 w-8" />,
  project_manager: <Users className="h-8 w-8" />,
  product_owner: <Target className="h-8 w-8" />,
  ui_ux_designer: <Palette className="h-8 w-8" />,
  qa: <TestTube className="h-8 w-8" />,
  frontend_dev: <Layout className="h-8 w-8" />,
  backend_dev: <Server className="h-8 w-8" />,
  devops_engineer: <Cloud className="h-8 w-8" />,
  business_analyst: <BarChart3 className="h-8 w-8" />,
  non_it_employee: <Sparkles className="h-8 w-8" />
};

const roleColors: Record<Role, string> = {
  developer: "from-blue-500/20 to-cyan-500/20",
  project_manager: "from-green-500/20 to-emerald-500/20",
  product_owner: "from-purple-500/20 to-violet-500/20",
  ui_ux_designer: "from-pink-500/20 to-rose-500/20",
  qa: "from-orange-500/20 to-amber-500/20",
  frontend_dev: "from-cyan-500/20 to-blue-500/20",
  backend_dev: "from-indigo-500/20 to-blue-500/20",
  devops_engineer: "from-teal-500/20 to-green-500/20",
  business_analyst: "from-amber-500/20 to-yellow-500/20",
  non_it_employee: "from-fuchsia-500/20 to-pink-500/20"
};

export default function RoleSelection() {
  const [, navigate] = useLocation();
  const { setSession } = useOnboarding();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [step, setStep] = useState<"role" | "name">("role");

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setStep("name");
  };

  const handleStart = () => {
    if (!selectedRole || !name.trim()) return;

    const session = {
      id: crypto.randomUUID(),
      name: name.trim(),
      role: selectedRole,
      progress: [],
      chatHistory: [],
      createdAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString()
    };

    setSession(session);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">AI Company</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {step === "role" ? (
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <Badge variant="secondary" className="mb-4" data-testid="badge-welcome">
                Welcome aboard
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight" data-testid="text-title">
                Choose Your Role
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Select the role that best matches your position. This will personalize your
                onboarding experience with relevant training modules and resources.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {roles.map((role) => (
                <Card
                  key={role}
                  className={`group cursor-pointer transition-all hover-elevate active-elevate-2 ${
                    selectedRole === role
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                  onClick={() => handleRoleSelect(role)}
                  data-testid={`card-role-${role}`}
                >
                  <CardContent className="p-6">
                    <div
                      className={`mb-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-br p-3 ${roleColors[role]}`}
                    >
                      <div className="text-foreground">
                        {roleIcons[role]}
                      </div>
                    </div>
                    <h3 className="font-semibold" data-testid={`text-role-label-${role}`}>
                      {roleLabels[role]}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {roleDescriptions[role]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-md">
            <Button
              variant="ghost"
              className="mb-8"
              onClick={() => setStep("role")}
              data-testid="button-back-to-roles"
            >
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to role selection
            </Button>

            <Card>
              <CardContent className="p-8">
                <div className="mb-6 text-center">
                  <div
                    className={`mx-auto mb-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-br p-4 ${
                      selectedRole ? roleColors[selectedRole] : ""
                    }`}
                  >
                    {selectedRole && roleIcons[selectedRole]}
                  </div>
                  <h2 className="text-2xl font-bold" data-testid="text-selected-role">
                    {selectedRole && roleLabels[selectedRole]}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {selectedRole && roleDescriptions[selectedRole]}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">What's your name?</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleStart()}
                      data-testid="input-name"
                      autoFocus
                    />
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!name.trim()}
                    onClick={handleStart}
                    data-testid="button-start-onboarding"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
