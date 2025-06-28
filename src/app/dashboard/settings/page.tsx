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
import { Download, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how we contact you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                            <Label htmlFor="app-updates-switch">Application Updates</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive email notifications about the status of your applications.
                            </p>
                        </div>
                        <Switch id="app-updates-switch" defaultChecked={true} />
                    </div>
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                            <Label htmlFor="promo-emails-switch">Promotional Emails</Label>
                            <p className="text-sm text-muted-foreground">
                                Get emails about new features, services, and special offers.
                            </p>
                        </div>
                        <Switch id="promo-emails-switch" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your account security settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                            <Label>Two-Factor Authentication (2FA)</Label>
                             <p className="text-sm text-muted-foreground">
                                Add an extra layer of security to your account.
                            </p>
                        </div>
                        <Button>Set Up 2FA</Button>
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
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
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Data & Privacy</CardTitle>
                    <CardDescription>Manage your personal data and account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                            <Label>Download Your Data</Label>
                             <p className="text-sm text-muted-foreground">
                                Get a copy of all your data stored with eBhutanza.
                            </p>
                        </div>
                        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download</Button>
                    </div>
                     <div className="flex items-center justify-between p-4 border rounded-lg border-destructive/50">
                        <div className="space-y-0.5">
                            <Label className="text-destructive">Delete Account</Label>
                             <p className="text-sm text-muted-foreground">
                                This will permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4"/> Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
