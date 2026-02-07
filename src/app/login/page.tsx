"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/language-context";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import * as React from "react";

export default function LoginPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const { toast } = useToast();
    const [mobile, setMobile] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, isLoading: authIsLoading } = useAuth();

    React.useEffect(() => {
        if (!authIsLoading && isAuthenticated) {
          const isCustomer = !!localStorage.getItem("customerName");
          const isProvider = !!localStorage.getItem("providerName");
          
          if (isCustomer) {
            router.replace('/customer/dashboard');
          } else if (isProvider) {
            router.replace('/provider/dashboard');
          } else {
            // If authenticated but no role, go to role selection
            router.replace('/role-selection');
          }
        }
    }, [isAuthenticated, authIsLoading, router]);


    const handleSendOtp = () => {
        if (mobile.length !== 10) {
            toast({
                title: t('validation_mobile_10_digits'),
                variant: 'destructive'
            });
            return;
        }
        setIsLoading(true);
        // Here you would integrate with Firebase Phone Auth to send OTP
        console.log("Sending OTP to", mobile);
        toast({
            title: t('otp_sent_title'),
            description: t('otp_sent_description', { mobile: mobile }),
        });
        
        // For demonstration, we'll just navigate to the verify page
        setTimeout(() => {
            router.push(`/login/verify?mobile=${mobile}`);
            setIsLoading(false);
        }, 1000);
    };
    
    if (authIsLoading || (!authIsLoading && isAuthenticated)) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <Card className="w-full max-w-md shadow-2xl">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <CardTitle className="font-headline text-xl">{t('login_with_mobile_title')}</CardTitle>
                </div>
                <CardDescription>{t('login_with_mobile_description')}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="mobile">{t('customerRegistration_mobileLabel')}</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">+91</span>
                        <Input
                            id="mobile"
                            type="tel"
                            placeholder="9876543210"
                            className="pl-10"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            maxLength={10}
                        />
                    </div>
                </div>
                <Button onClick={handleSendOtp} className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Phone className="mr-2 h-4 w-4" />}
                    {t('customerRegistration_sendOtp')}
                </Button>
            </CardContent>
        </Card>
    );
}
