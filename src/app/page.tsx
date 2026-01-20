"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

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

export default function RoleSelection() {
  const [role, setRole] = React.useState("customer");
  const router = useRouter();
  const { t } = useLanguage();

  const handleContinue = () => {
    if (role === "customer") {
      router.push("/register/customer");
    } else if (role === "provider") {
      router.push("/register/provider");
    }
    // Add other roles logic here
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">
            {t('app_title')}
          </CardTitle>
          <CardDescription className="font-body">
            "{t('app_tagline')}"
          </CardDescription>
          <div className="flex items-center justify-center gap-1 pt-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">4.8/5</span>
            <span>{t('service_rating')}</span>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue="customer"
            className="grid gap-4"
            onValueChange={setRole}
          >
            <Label
              htmlFor="customer"
              className="flex cursor-pointer items-start space-x-4 rounded-md border p-4 transition-all hover:bg-secondary has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:shadow-md"
            >
              <RadioGroupItem value="customer" id="customer" />
              <div className="space-y-1">
                <p className="font-semibold">{t('customer')}</p>
                <p className="text-sm text-muted-foreground">
                  "{t('customer_tagline')}"
                </p>
              </div>
            </Label>
            <Label
              htmlFor="provider"
              className="flex cursor-pointer items-start space-x-4 rounded-md border p-4 transition-all hover:bg-secondary has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:shadow-md"
            >
              <RadioGroupItem value="provider" id="provider" />
              <div className="space-y-1">
                <p className="font-semibold">{t('provider')}</p>
                <p className="text-sm text-muted-foreground">
                  "{t('provider_tagline')}"
                </p>
              </div>
            </Label>
            <Label
              htmlFor="partner"
              className="flex cursor-pointer items-start space-x-4 rounded-md border p-4 transition-all hover:bg-secondary has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:shadow-md"
            >
              <RadioGroupItem value="partner" id="partner" disabled />
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
          <Button className="w-full" onClick={handleContinue}>
            {t('continue')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
