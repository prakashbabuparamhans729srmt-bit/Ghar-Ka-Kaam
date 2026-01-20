'use client';

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";

export default function NotificationsPage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/customer/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold font-headline">{t('notifications')}</h1>
      </div>
      <Card>
        <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">{t('no_notifications')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
