import { useLocation, Link } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding-context";
import { roleLabels, type Role } from "@shared/schema";
import {
  LayoutDashboard,
  BookOpen,
  Library,
  BarChart3,
  MessageSquareText,
  Zap,
  LogOut,
  Settings
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Training Modules", href: "/modules", icon: BookOpen },
  { name: "Resources", href: "/resources", icon: Library },
  { name: "Progress", href: "/progress", icon: BarChart3 },
  { name: "AI Assistant", href: "/assistant", icon: MessageSquareText },
];

const roleColors: Record<Role, string> = {
  developer: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  project_manager: "bg-green-500/10 text-green-600 dark:text-green-400",
  product_owner: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  ui_ux_designer: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  qa: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  frontend_dev: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  backend_dev: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  devops_engineer: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  business_analyst: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  non_it_employee: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400"
};

export function AppSidebar() {
  const [location] = useLocation();
  const { session, setSession } = useOnboarding();

  const handleLogout = () => {
    setSession(null);
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
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-semibold">AI Company</span>
            <p className="text-xs text-muted-foreground">Onboarding</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = location === item.href || 
                  (item.href !== "/dashboard" && location.startsWith(item.href));
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        {session && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-sm font-medium">
                  {getInitials(session.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium" data-testid="text-user-name">
                  {session.name}
                </p>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${roleColors[session.role]}`}
                  data-testid="badge-user-role"
                >
                  {roleLabels[session.role]}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
