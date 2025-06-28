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
import { useLanguage } from '@/context/language-context';


export default function DashboardPage() {
  const [user, setUser] = React.useState<User | null>(null);
  const { t } = useLanguage();

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
                <CardTitle>{t('welcomeMessage', { userName })}</CardTitle>
                <CardDescription>
                {t('welcomeTitle')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{t('applicationProgress')}</p>
                    <p className="text-sm text-muted-foreground">{t('applicationStatus')} <span className="font-semibold text-primary">{t('pendingSubmission')}</span>.</p>
                </div>
                <Progress value={applicationProgress} className="w-full" animated />
                <p className="text-sm text-muted-foreground">{t('percentComplete', { progress: applicationProgress })}</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild>
                    <Link href="/dashboard/application">
                    {t('continueApplication')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
            <Card className="flex flex-col">
                <CardHeader>
                <div className="flex items-center gap-4">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                    <CardTitle>{t('aiComplianceCheck')}</CardTitle>
                </div>
                <CardDescription>
                    {t('aiComplianceCheckDesc')}
                </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                <p>{t('aiComplianceCheckContent')}</p>
                </CardContent>
                <CardFooter>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/compliance">
                        {t('runCheck')}
                    </Link>
                </Button>
                </CardFooter>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                <div className="flex items-center gap-4">
                    <Building2 className="h-8 w-8 text-primary" />
                    <CardTitle>{t('businessIncorporation')}</CardTitle>
                </div>
                <CardDescription>
                    {t('businessIncorporationDesc')}
                </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                <p>{t('businessIncorporationContent')}</p>
                </CardContent>
                <CardFooter>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/incorporation">
                        {t('learnMore')}
                    </Link>
                </Button>
                </CardFooter>
            </Card>
            </div>
        </div>
    </>
  );
}
