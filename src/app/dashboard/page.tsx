'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Building2,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

function WelcomeFrame({ userName }: { userName: string }) {
  // The welcome frame is now a simple presentational component.
  // It takes up the full screen height because the header will be hidden initially.
  return (
    <div className="relative -m-4 flex h-screen w-auto flex-col items-center justify-center overflow-hidden text-foreground sm:-m-6">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="A monastery in the mountains of Bhutan, representing eBhutanza's digital residency."
        fill
        objectFit="cover"
        className="z-0"
        data-ai-hint="Bhutan landscape monastery"
        priority
      />
      <div className="absolute inset-0 z-0 bg-black/50" />
      <div className="relative z-10 text-center text-white drop-shadow-2xl">
        <h1 className="text-5xl font-bold font-headline md:text-7xl">
          Joen pa Leg So, {userName}
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Your journey to a borderless world begins now.
        </p>
      </div>
    </div>
  );
}


export default function DashboardPage() {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const userName = 'Tashi Delek';
  const applicationProgress = 25;

  useEffect(() => {
    // This effect handles the welcome animation orchestration.
    if (typeof window === 'undefined') return;

    // Add a class to the body to hide layout elements and prevent scrolling.
    document.body.classList.add('welcoming');
    document.body.style.overflow = 'hidden';

    const scrollTimer = setTimeout(() => {
      // Scroll to the main content after 3 seconds.
      mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });

      // After the scroll animation finishes (approx. 1s), restore the layout and scroll.
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        document.body.classList.remove('welcoming');
      }, 1000); 

    }, 3000);

    // Cleanup function to restore everything if the component unmounts.
    return () => {
      clearTimeout(scrollTimer);
      document.body.classList.remove('welcoming');
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {/* WelcomeFrame is at the top of the page flow. */}
      <WelcomeFrame userName={userName} />

      {/* This ref is the scroll target. */}
      <div ref={mainContentRef} className="flex flex-col gap-8 pt-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to eBhutanza</CardTitle>
            <CardDescription>
              A digital residency for a borderless world. Your journey starts here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Application Progress</p>
                <p className="text-sm text-muted-foreground">Your application is <span className="font-semibold text-primary">Pending Submission</span>.</p>
              </div>
              <Progress value={applicationProgress} className="w-full" animated />
              <p className="text-sm text-muted-foreground">{applicationProgress}% complete</p>
            </div>
          </CardContent>
          <CardFooter>
              <Button asChild>
                <Link href="/dashboard/application">
                  Continue Application <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
          </CardFooter>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <CardTitle>AI Compliance Check</CardTitle>
              </div>
              <CardDescription>
                Leverage our AI to proactively identify and address potential compliance issues.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>Analyze applicant data against compliance and risk metrics to proactively flag issues before submission, saving you time and increasing your chances of approval.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                  <Link href="/dashboard/compliance">
                      Run Check
                  </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                  <Building2 className="h-8 w-8 text-primary" />
                  <CardTitle>Business Incorporation</CardTitle>
              </div>
              <CardDescription>
                Seamlessly register your new company once your e-residency is approved.
              </CardDescription>
            </Header>
            <CardContent className="flex-grow">
              <p>Our integration with official registries streamlines the process of establishing your business entity.</p>
            </CardContent>
             <CardFooter>
              <Button variant="outline" asChild>
                  <Link href="/dashboard/incorporation">
                      Learn More
                  </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
