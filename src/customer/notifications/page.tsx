'use client';

import { ArrowLeft, Bell, Bot, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

const notifications = [
    {
        icon: <CheckCircle className="h-6 w-6 text-green-500" />,
        title: "बुकिंग कन्फर्म!",
        title_en: "Booking Confirmed!",
        description: "राम सिंह के साथ आपकी गीज़र मरम्मत की बुकिंग पक्की हो गई है।",
        description_en: "Your geyser repair booking with Ram Singh is confirmed.",
        time: "5 मिनट पहले",
        time_en: "5 minutes ago",
        isNew: true,
    },
    {
        icon: <Bell className="h-6 w-6 text-primary" />,
        title: "पेमेंट सफल",
        title_en: "Payment Successful",
        description: "AC सर्विस के लिए ₹850 का पेमेंट सफल रहा।",
        description_en: "Payment of ₹850 for AC service was successful.",
        time: "2 घंटे पहले",
        time_en: "2 hours ago",
        isNew: false,
    },
     {
        icon: <Bot className="h-6 w-6 text-primary" />,
        title: "नई सुविधा!",
        title_en: "New Feature!",
        description: "अब आप ऐप से सीधे TV इंस्टॉलेशन भी बुक कर सकते हैं।",
        description_en: "You can now book TV installation directly from the app.",
        time: "1 दिन पहले",
        time_en: "1 day ago",
        isNew: false,
    },
]

export default function NotificationsPage() {
  const { t, locale } = useLanguage();
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
      {notifications.length > 0 ? (
        <Card>
            <CardContent className="p-0">
                <ul className="divide-y">
                    {notifications.map((notification, index) => (
                        <li key={index} className={cn("flex items-start gap-4 p-4", notification.isNew && "bg-secondary/50")}>
                           <div className="w-8 pt-1"> {notification.icon} </div>
                           <div className="flex-1">
                                <p className="font-semibold">{locale === 'hi' ? notification.title : notification.title_en}</p>
                                <p className="text-sm text-muted-foreground">{locale === 'hi' ? notification.description : notification.description_en}</p>
                                <p className="text-xs text-muted-foreground mt-1">{locale === 'hi' ? notification.time : notification.time_en}</p>
                           </div>
                           {notification.isNew && <div className="h-2.5 w-2.5 rounded-full bg-primary mt-2"></div>}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      ) : (
        <Card>
            <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">{t('no_notifications')}</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
