'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  LayoutDashboard, 
  FolderKanban, 
  Calendar, 
  School, 
  MessageSquare, 
  Users,
  Search,
  Menu,
  Bell,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const routes = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Dashboard', path: '/Dashboard', icon: LayoutDashboard },
  { name: 'Projects', path: '/GroupProjects', icon: FolderKanban },
  { name: 'Calendar', path: '/calendar', icon: Calendar },
  { name: 'Classroom', path: '/classroom', icon: School },
  { name: 'Chat', path: '/communication/chat', icon: MessageSquare },
  { name: 'Students', path: '/students', icon: Users },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <School className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="hidden font-bold text-xl lg:inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Classroom Hub
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {routes.map((route) => {
                const Icon = route.icon;
                const isActive = pathname === route.path || (route.path !== '/' && pathname?.startsWith(route.path));
                
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                      "group relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                    {route.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="search"
                placeholder="Search anything..."
                className="pl-10 h-10 w-48 lg:w-64 rounded-xl border border-input/50 bg-background/50 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all hover:bg-accent/30"
              />
            </div>
            
            <div className="flex items-center gap-1">
              <button className="p-2.5 rounded-xl text-muted-foreground hover:bg-accent/50 transition-all relative group">
                  <Bell className="w-5 h-5 group-hover:shake" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background ring-2 ring-primary/20 animate-pulse"></span>
              </button>

              <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>

              <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-accent/50 transition-all group">
                <Avatar className="h-8 w-8 border border-border/50 group-hover:border-primary/50 transition-colors">
                  <AvatarImage src="/avatars/user.png" />
                  <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">YR</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
              </button>

              <button className="md:hidden p-2 rounded-xl hover:bg-accent transition-all">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
