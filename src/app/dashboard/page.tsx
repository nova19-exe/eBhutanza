'use client';

import React from 'react';
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
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';


export default function DashboardPage() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const userName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const applicationProgress = 25;

  return (
    <>
        <div className="flex flex-col gap-8">
            <Card>
            <CardHeader>
                <CardTitle>Joen pa Leg So, {userName}!</CardTitle>
                <CardDescription>
                Welcome to eBhutanza. Your digital residency for a borderless world starts here.
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
