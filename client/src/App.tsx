import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { OnboardingProvider, useOnboarding } from "@/lib/onboarding-context";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import RoleSelection from "@/pages/role-selection";
import Dashboard from "@/pages/dashboard";
import ModulesPage from "@/pages/modules";
import ModuleDetailPage from "@/pages/module-detail";
import ResourcesPage from "@/pages/resources";
import ProgressPage from "@/pages/progress";
import AssistantPage from "@/pages/assistant";
import NotFound from "@/pages/not-found";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function getBreadcrumbs(path: string) {
  const segments = path.split("/").filter(Boolean);
  const breadcrumbs: { label: string; href?: string }[] = [];

  if (segments.length === 0 || segments[0] === "dashboard") {
    breadcrumbs.push({ label: "Dashboard" });
  } else if (segments[0] === "modules") {
    breadcrumbs.push({ label: "Training Modules", href: "/modules" });
    if (segments[1]) {
      breadcrumbs.push({ label: "Module Details" });
    }
  } else if (segments[0] === "resources") {
    breadcrumbs.push({ label: "Resources" });
  } else if (segments[0] === "progress") {
    breadcrumbs.push({ label: "Progress" });
  } else if (segments[0] === "assistant") {
    breadcrumbs.push({ label: "AI Assistant" });
  }

  return breadcrumbs;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const breadcrumbs = getBreadcrumbs(location);

  const style = {
    "--sidebar-width": "280px",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" data-testid="button-sidebar-toggle" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, idx) => (
                  <BreadcrumbItem key={idx}>
                    {idx > 0 && <BreadcrumbSeparator />}
                    {crumb.href ? (
                      <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function Router() {
  const { session, isLoading } = useOnboarding();
  const [location] = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // If no session and not on home page, redirect to role selection
  if (!session && location !== "/") {
    return <RoleSelection />;
  }

  // If no session, show role selection
  if (!session) {
    return <RoleSelection />;
  }

  // Otherwise show app with sidebar
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/modules" component={ModulesPage} />
        <Route path="/modules/:id" component={ModuleDetailPage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/progress" component={ProgressPage} />
        <Route path="/assistant" component={AssistantPage} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <OnboardingProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </OnboardingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
