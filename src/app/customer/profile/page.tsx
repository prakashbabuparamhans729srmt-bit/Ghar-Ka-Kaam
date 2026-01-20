'use client';

import { ArrowLeft, User, Phone, MapPin, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";

export default function CustomerProfilePage() {
    const { t } = useLanguage();
    const { logout } = useAuth();
    const [customerName, setCustomerName] = useState("ग्राहक");
    const [customerMobile, setCustomerMobile] = useState("");
    const [customerAddress, setCustomerAddress] = useState("...");

    useEffect(() => {
        const savedName = localStorage.getItem("customerName");
        const savedMobile = localStorage.getItem("customerMobile");
        const savedAddress = localStorage.getItem("customerAddress");
        if (savedName) {
            setCustomerName(savedName);
        }
        if (savedMobile) {
            setCustomerMobile(savedMobile);
        }
        if (savedAddress) {
            setCustomerAddress(savedAddress);
        }
    }, []);

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/customer/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold font-headline">{t('my_profile')}</h1>
      </div>
      <Card>
        <CardContent className="p-6 flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${customerMobile}`} />
                <AvatarFallback>{customerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
                <h2 className="text-xl font-bold">{customerName}</h2>
            </div>
            <div className="space-y-2 text-left w-full max-w-sm">
                 <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>+91 {customerMobile}</span>
                </div>
                 <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{customerAddress}</span>
                </div>
            </div>
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
