import { ComplianceChecker } from './compliance-checker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CompliancePage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>AI-Powered Compliance & Risk Assessment</CardTitle>
            <CardDescription>
            Enter applicant data to analyze for potential compliance and risk issues. Our AI will provide a summary, flag issues, suggest actions, and determine an overall risk level.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ComplianceChecker />
        </CardContent>
    </Card>
  );
}
