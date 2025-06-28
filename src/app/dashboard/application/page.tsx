'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Upload, PenSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';
import { useRouter } from 'next/navigation';

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  country: z.string().min(2, 'Country is required.'),
  passportFile: z.any().refine((files) => files?.length === 1, 'Passport scan is required.'),
  signature: z.string().min(2, 'Signature is required.'),
});

export default function ApplicationPage() {
    const { toast } = useToast();
    const { t } = useLanguage();
    const router = useRouter();

    const form = useForm<z.infer<typeof applicationSchema>>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            fullName: '',
            email: '',
            country: '',
            signature: '',
        },
    });

    const passportFileRef = form.register("passportFile");

    function onSubmit(values: z.infer<typeof applicationSchema>) {
        console.log(values);
        
        // Persist status change to be reflected on dashboard
        localStorage.setItem('applicationProgress', '100');
        localStorage.setItem('applicationStatusKey', 'submittedForReview');

        toast({
            title: t('applicationSubmitted'),
            description: t('applicationSubmittedDesc'),
        });

        // Redirect to dashboard to see the change
        router.push('/dashboard');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('personalInfo')}</CardTitle>
                        <CardDescription>{t('personalInfoDesc')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('fullNameLabel')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tashi Delek" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('emailAddressLabel')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="tashi@druknet.bt" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                         <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('countryOfCitizenship')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Bhutan" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('documentUpload')}</CardTitle>
                        <CardDescription>{t('documentUploadDesc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <FormField
                            control={form.control}
                            name="passportFile"
                            render={() => (
                                <FormItem>
                                    <FormLabel>{t('passportScan')}</FormLabel>
                                    <FormControl>
                                        <div className="relative flex items-center justify-center w-full">
                                            <label htmlFor="passport-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">{t('clickToUpload')}</span> {t('dragAndDrop')}</p>
                                                    <p className="text-xs text-muted-foreground">{t('fileTypes')}</p>
                                                </div>
                                                <Input id="passport-upload" type="file" className="hidden" {...passportFileRef} />
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>{t('digitalSignature')}</CardTitle>
                        <CardDescription>{t('digitalSignatureDesc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <FormField
                            control={form.control}
                            name="signature"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('agreementSignature')}</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input placeholder={t('fullNameLabel')} {...field} className="pl-10 text-2xl h-14 font-headline" />
                                            <PenSquare className="absolute w-6 h-6 text-muted-foreground left-2 top-1/2 -translate-y-1/2" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Button type="submit" size="lg" className="w-full md:w-auto">{t('submitApplication')}</Button>
            </form>
        </Form>
    );
}
