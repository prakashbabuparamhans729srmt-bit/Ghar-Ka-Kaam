'use client';

import { ArrowLeft, CheckCircle, Clock, FileText, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { Badge } from "@/components/ui/badge";

const bookings = [
    {
        id: 'BK001',
        service: 'गीज़र की मरम्मत',
        service_en: 'Geyser Repair',
        provider: 'राम सिंह',
        date: '25 जुलाई, 2024',
        date_en: 'July 25, 2024',
        status: 'Confirmed',
        status_hi: 'पक्की हो गई',
        icon: <CheckCircle className="h-4 w-4 text-green-500" />
    },
    {
        id: 'BK002',
        service: 'AC सर्विस',
        service_en: 'AC Service',
        provider: 'अमित कुमार',
        date: '28 जुलाई, 2024',
        date_en: 'July 28, 2024',
        status: 'Pending',
        status_hi: 'लंबित',
        icon: <Clock className="h-4 w-4 text-orange-500" />
    }
];


export default function BookingsPage() {
  const { t, locale } = useLanguage();
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/customer/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold font-headline">{t('my_bookings')}</h1>
      </div>
      {bookings.length > 0 ? (
        <div className="space-y-4">
            {bookings.map(booking => (
                <Card key={booking.id}>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center text-lg">
                            <span>{locale === 'hi' ? booking.service : booking.service_en}</span>
                             <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className="flex items-center gap-1">
                                {booking.icon}
                                {locale === 'hi' ? booking.status_hi : booking.status}
                            </Badge>
                        </CardTitle>
                        <CardDescription>{t('booking_id')}: {booking.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4">
                         <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium">{t('provider')}:</span>
                            <span className="ml-2">{booking.provider}</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                             <span className="font-medium">{t('date')}:</span>
                            <span className="ml-2">{locale === 'hi' ? booking.date : booking.date_en}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      ) : (
        <Card>
            <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">{t('no_bookings')}</p>
            </CardContent>
      </Card>
      )}
    </div>
  );
}
