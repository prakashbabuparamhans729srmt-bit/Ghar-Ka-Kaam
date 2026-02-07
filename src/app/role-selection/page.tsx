"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Star, ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Logo from "@/components/logo";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-screen w-full bg-background">
      <div 
        className="hidden md:flex md:w-2/5 flex-col justify-between p-12 text-white"
        style={{background: 'linear-gradient(145deg, hsl(175, 95%, 10%), hsl(0, 0%, 3%))'}}
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
);

export default function RoleSelection() {
  const [role, setRole] = React.useState("customer");
  const router = useRouter();
  const { t } = useLanguage();
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else {
        const isCustomer = !!localStorage.getItem("customerName");
        const isProvider = !!localStorage.getItem("providerName");
        if (isCustomer) {
          router.replace('/customer/dashboard');
        } else if (isProvider) {
          router.replace('/provider/dashboard');
        }
      }
    }
  }, [isAuthenticated, isLoading, router]);

  const handleContinue = () => {
    if (role === "customer") {
      router.push("/register/customer");
    } else if (role === "provider") {
      router.push("/register/provider");
    }
    // Add other roles logic here
  };

  const hasProfile = !isLoading && isAuthenticated && (!!localStorage.getItem("customerName") || !!localStorage.getItem("providerName"));

  if (isLoading || !isAuthenticated || hasProfile) {
    return (
        <AuthLayout>
            <div className="flex w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md bg-transparent border-0 shadow-none">
        <CardHeader>
          <div className="flex items-center gap-4 relative">
            <Button variant="outline" size="icon" className="absolute -left-1 bg-transparent hover:bg-muted" asChild>
                <Link href="/"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div className="text-center w-full">
              <div className="mx-auto mb-4 inline-block">
                <Logo className="h-20 w-20" />
              </div>
              <CardTitle className="font-headline text-3xl">
                {t('app_title')}
              </CardTitle>
              <CardDescription className="font-body text-muted-foreground">
                "{t('app_tagline')}"
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-center font-semibold mb-4">{t('choose_your_role')}</p>
          <RadioGroup
            defaultValue="customer"
            className="grid gap-4"
            onValueChange={setRole}
          >
            <Label
              htmlFor="customer"
              className="flex cursor-pointer items-start space-x-4 rounded-md border p-4 transition-all hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-muted has-[[data-state=checked]]:shadow-md"
            >
              <RadioGroupItem value="customer" id="customer" className="text-primary" />
              <div className="space-y-1">
                <p className="font-semibold">{t('customer')}</p>
                <p className="text-sm text-muted-foreground">
                  "{t('customer_tagline')}"
                </p>
              </div>
            </Label>
            <Label
              htmlFor="provider"
              className="flex cursor-pointer items-start space-x-4 rounded-md border p-4 transition-all hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-muted has-[[data-state=checked]]:shadow-md"
            >
              <RadioGroupItem value="provider" id="provider" className="text-primary" />
              <div className="space-y-1">
                <p className="font-semibold">{t('provider')}</p>
                <p className="text-sm text-muted-foreground">
                  "{t('provider_tagline')}"
                </p>
              </div>
            </Label>
            <Label
              htmlFor="partner"
              className="flex cursor-pointer items-start space-x-4 rounded-md border p-4 transition-all hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-muted has-[[data-state=checked]]:shadow-md opacity-50"
            >
              <RadioGroupItem value="partner" id="partner" disabled className="text-primary" />
              <div className="space-y-1">
                <p className="font-semibold">{t('partner')}</p>
                <p className="text-sm text-muted-foreground">
                  "{t('partner_tagline')}"
                </p>
              </div>
            </Label>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold" onClick={handleContinue}>
            {t('continue')}
          </Button>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
