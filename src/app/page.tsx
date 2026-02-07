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

export default function WelcomePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const isCustomer = !!localStorage.getItem("customerName");
      const isProvider = !!localStorage.getItem("providerName");
      
      if (isCustomer) {
        router.replace('/customer/dashboard');
      } else if (isProvider) {
        router.replace('/provider/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || (!isLoading && isAuthenticated)) {
      return (
          <div className="flex min-h-screen w-full items-center justify-center bg-background">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">
            {t('welcome_title')}
          </CardTitle>
          <CardDescription className="font-body">
            "{t('app_tagline')}"
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button className="w-full py-6 text-base" onClick={() => router.push('/role-selection')}>
            <Phone className="mr-2 h-5 w-5" />
            {t('signup_with_mobile')}
          </Button>
          <Button variant="outline" className="w-full py-6 text-base" disabled>
            <Mail className="mr-2 h-5 w-5" />
            {t('signup_with_email')}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 pt-4">
            <p className="text-xs text-center text-muted-foreground">{t('by_continuing_agree')}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
