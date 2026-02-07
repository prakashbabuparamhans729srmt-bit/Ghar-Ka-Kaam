"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/logo";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="dark">
      <div className="flex min-h-screen w-full bg-[#111827]">
        <div 
          className="hidden md:flex md:w-2/5 flex-col justify-between p-12 text-white"
          style={{background: 'linear-gradient(145deg, hsl(195, 53%, 25%), hsl(263, 60%, 25%))'}}
        >
          <div>
            <div className="flex items-center gap-3 text-2xl font-bold font-headline">
              <Logo className="h-10 w-10 bg-white/20" />
              <span>GharKaam</span>
            </div>
            <h1 className="mt-10 text-5xl font-bold font-headline">Get Started with Us</h1>
            <p className="mt-4 text-white/70">Complete these easy steps to register your account.</p>
          </div>
          <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg bg-white p-4 text-black shadow-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white font-bold">1</div>
                  <span className="font-semibold">Sign up your account</span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/50 font-bold">2</div>
                  <span className="font-semibold">Set up your workspace</span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/50 font-bold">3</div>
                  <span className="font-semibold">Set up your profile</span>
              </div>
          </div>
        </div>
        <main className="w-full md:w-3/5 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
);


export default function WelcomePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { isLoading } = useAuth();

  // Redirect logic is now in /login page and other layouts
  if (isLoading) {
      return (
          <div className="flex min-h-screen w-full items-center justify-center bg-gray-900">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
      );
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md bg-transparent border-0 shadow-none text-white">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo className="h-20 w-20" />
          </div>
          <CardTitle className="font-headline text-3xl">
            {t('welcome_title')}
          </CardTitle>
          <CardDescription className="font-body text-white/70">
            "{t('app_tagline')}"
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button className="w-full py-6 text-base bg-cyan-400 text-black hover:bg-cyan-500 font-bold" onClick={() => router.push('/login')}>
            <Phone className="mr-2 h-5 w-5" />
            {t('signup_with_mobile')}
          </Button>
          <Button variant="outline" className="w-full py-6 text-base border-white/20 bg-white/5 hover:bg-white/10" disabled>
            <Mail className="mr-2 h-5 w-5" />
            {t('signup_with_email')}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 pt-4">
            <p className="text-xs text-center text-white/50">{t('by_continuing_agree')}</p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}