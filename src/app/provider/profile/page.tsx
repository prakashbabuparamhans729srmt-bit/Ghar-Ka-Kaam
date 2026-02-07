'use client';

import { ArrowLeft, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";

export default function ProviderProfilePage() {
    const { t } = useLanguage();
    const { logout } = useAuth();
    const [providerName, setProviderName] = useState("प्रोवाइडर");
    const [providerService, setProviderService] = useState("");
    const [providerMobile, setProviderMobile] = useState("");

    const serviceNameMap: { [key: string]: string } = {
        'plumber': t('service_plumbing'),
        'electrician': t('service_electrical'),
        'cleaner': t('service_cleaning'),
        'ac-technician': t('service_ac'),
        'painter': t('service_painting'),
        'carpenter': t('service_carpenter'),
        'multi-skill': t('multi_skill'),
    };

    useEffect(() => {
        const savedName = localStorage.getItem("providerName");
        const savedService = localStorage.getItem("providerService");
        const savedMobile = localStorage.getItem("providerMobile");
        if (savedName) setProviderName(savedName);
        if (savedService) setProviderService(savedService);
        if (savedMobile) setProviderMobile(savedMobile);
    }, []);

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/provider/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold font-headline">{t('my_profile')}</h1>
      </div>
      <Card>
        <CardContent className="p-6 flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${providerMobile}`} />
                <AvatarFallback>{providerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
                <h2 className="text-xl font-bold">{providerName}</h2>
                <p className="text-muted-foreground">{serviceNameMap[providerService] || providerService}</p>
            </div>
            <Badge variant="default">{t('providerProfile_verified')}</Badge>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Button variant="outline">{t('edit_profile')}</Button>
              <Button variant="outline" asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  {t('settings')}
                </Link>
              </Button>
              <Button variant="destructive" onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                {t('logout')}
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
