'use client';

import React from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const incorporationSchema = z.object({
  companyName: z.string().min(3, 'Company name must be at least 3 characters.'),
  companyType: z.string({ required_error: 'Please select a company type.' }),
  businessActivity: z.string().min(10, 'Please describe your business activity.'),
});

export default function IncorporationPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<z.infer<typeof incorporationSchema>>({
        resolver: zodResolver(incorporationSchema),
        defaultValues: {
            companyName: '',
            businessActivity: '',
        },
    });

    function onSubmit(values: z.infer<typeof incorporationSchema>) {
        setIsSubmitting(true);
        console.log(values);
        
        setTimeout(() => {
            setIsSubmitting(false);
            toast({
                title: "Incorporation Request Sent",
                description: `Your request to incorporate "${values.companyName}" has been submitted to the Bhutanese Company Registry.`,
            });
            form.reset();
        }, 2000);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Incorporate Your Business in Bhutan</CardTitle>
                <CardDescription>
                    Fill in your company details below to begin the incorporation process. This service is available after e-residency approval.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Proposed Company Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Druk Innovations" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The name will be checked for availability.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="companyType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Type</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a legal entity type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="private-limited">Private Limited Company</SelectItem>
                                            <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                                            <SelectItem value="public-limited">Public Limited Company</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="businessActivity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Principal Business Activity</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Software development, consulting" {...field} />
                                    </FormControl>
                                     <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" size="lg" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit for Incorporation
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
