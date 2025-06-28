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

function WelcomeFrame({ userName, mainContentRef }: { userName: string; mainContentRef: React.RefObject<HTMLDivElement> }) {
  useEffect(() => {
    // Hide the main scrollbar while the welcome frame is visible
    document.body.style.overflow = 'hidden';

    const scrollTimer = setTimeout(() => {
      // Scroll to the main content
      mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });

      // Restore the scrollbar after the animation has had time to complete
      setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 1500); 
    }, 3000); // Wait 3 seconds before scrolling

    // Cleanup function to clear timers and restore scrollbar if the user navigates away
    return () => {
      clearTimeout(scrollTimer);
      document.body.style.overflow = 'auto';
    };
  }, [mainContentRef]);

  return (
    <div className="relative -m-4 flex h-[calc(100vh_-_3.5rem)] w-auto flex-col items-center justify-center overflow-hidden text-foreground sm:-m-6">
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
          Welcome, {userName}
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
  const userName = 'Tashi Delek'; // This would come from a user session
  const applicationProgress = 25;

  return (
    <>
      <WelcomeFrame userName={userName} mainContentRef={mainContentRef} />

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
            </CardHeader>
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
