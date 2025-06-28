'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  FileText,
  LayoutDashboard,
  ShieldCheck,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/application', label: 'My Application', icon: FileText },
  { href: '/dashboard/compliance', label: 'AI Compliance', icon: ShieldCheck },
  { href: '/dashboard/incorporation', label: 'Incorporate', icon: Building2 },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm lg:px-6">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-xl font-semibold md:text-2xl font-headline">
                    {menuItems.find((item) => pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard'))?.label || 'Dashboard'}
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" alt="@user" data-ai-hint="person avatar" />
                    <AvatarFallback>BT</AvatarFallback>
                </Avatar>
            </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
