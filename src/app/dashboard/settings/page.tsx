'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required.'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters.'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function SettingsPage() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
        console.log(values);
        toast({
            title: "Password Updated",
            description: "Your password has been changed successfully.",
        });
        form.reset();
    }
    
    const handleThemeToggle = (checked: boolean) => {
        const theme = checked ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', checked);
        toast({
            title: `Theme changed to ${theme}`,
        });
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                            <Label htmlFor="dark-mode-switch">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">
                                Toggles between a light and dark theme.
                            </p>
                        </div>
                        <Switch
                            id="dark-mode-switch"
                            onCheckedChange={handleThemeToggle}
                            defaultChecked={true}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Language</CardTitle>
                    <CardDescription>Set your preferred language for the interface.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Select defaultValue="en">
                        <SelectTrigger className="w-full md:w-1/2">
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English (United States)</SelectItem>
                            <SelectItem value="dz">Dzongkha (Bhutan)</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>For your security, we recommend using a strong password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onPasswordSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Update Password</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>What more can you add?</AlertTitle>
                <AlertDescription>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>**Notification Preferences:** Allow users to choose which email or push notifications they receive.</li>
                        <li>**Data & Privacy:** Include options for users to download their data or delete their account.</li>
                        <li>**Two-Factor Authentication (2FA):** Add a section for users to set up 2FA for enhanced security.</li>
                        <li>**API Keys:** If your service has an API, allow users to generate and manage API keys here.</li>
                        <li>**Billing Information:** If it's a paid service, add links to manage subscriptions and view invoices.</li>
                    </ul>
                </AlertDescription>
            </Alert>
        </div>
    );
