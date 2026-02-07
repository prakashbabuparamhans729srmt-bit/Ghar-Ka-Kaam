"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/language-context";
import { useState, Suspense } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";

function VerifyOtpComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mobile = searchParams.get('mobile');
    const { t } = useLanguage();
    const { toast } = useToast();
    const { login } = useAuth();
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleVerifyOtp = () => {
        if (otp.length !== 6) {
            toast({
                title: t('wrong_otp_title'),
                description: "Please enter a 6-digit OTP.",
                variant: 'destructive'
            });
            return;
        }
        setIsLoading(true);
        // Here you would integrate with Firebase to verify OTP
        console.log("Verifying OTP", otp);
        
        // Dummy verification for demonstration
        setTimeout(() => {
            if (otp === "123456") {
                login(mobile || "");
                toast({
                    title: t('login_successful_title'),
                    description: t('login_successful_description'),
                });
                
                // Check if user has already registered
                const isCustomer = !!localStorage.getItem("customerName");
                const isProvider = !!localStorage.getItem("providerName");

                if(isCustomer || isProvider){
                    router.replace(isCustomer ? '/customer/dashboard' : '/provider/dashboard');
                } else {
                    // New user, go to role selection
                    router.replace('/role-selection');
                }

            } else {
                toast({
                    title: t('wrong_otp_title'),
                    description: t('wrong_otp_description'),
                    variant: "destructive",
                });
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Card className="w-full max-w-md bg-transparent border-0 shadow-none text-white">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => router.back()} className="bg-transparent hover:bg-white/10 text-white hover:text-white border-white/20">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <CardTitle className="font-headline text-xl">{t('otp_verify_title')}</CardTitle>
                </div>
                <CardDescription className="text-white/70">
                    {t('otp_verify_description_login', { mobile: mobile || '...' })}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="otp" className="text-right sr-only">
                            OTP
                        </Label>
                        <Input
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            placeholder="——"
                            className="col-span-4 text-center text-2xl tracking-[1rem] bg-white/5 border-0 font-mono focus-visible:ring-cyan-500"
                        />
                    </div>
                </div>
                 <div className="text-center text-sm text-white/70">
                    {t('didnt_receive_code')}{' '}
                    <Button variant="link" className="p-0 h-auto font-semibold text-cyan-400">
                        {t('resend_otp')}
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleVerifyOtp} className="w-full bg-cyan-400 text-black hover:bg-cyan-500 font-bold" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('verify')}
                </Button>
            </CardFooter>
        </Card>
    );
}


export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
            <VerifyOtpComponent />
        </Suspense>
    )
}