'use client';

import { ArrowLeft, CheckCircle, Clock, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activeJobs = [
    {
        id: 'JOB001',
        customer: 'गौरव मेहरा',
        avatar: 'https://i.pravatar.cc/150?u=gaurav',
        service_hi: 'गीज़र की मरम्मत',
        service_en: 'Geyser Repair',
        location: 'साकेत, दिल्ली',
        time_hi: 'आज दोपहर 2:00 बजे',
        time_en: 'Today at 2:00 PM',
        status: 'Accepted'
    }
];

const completedJobs = [
    {
        id: 'JOB002',
        customer: 'नेहा गुप्ता',
        avatar: 'https://i.pravatar.cc/150?u=neha',
        service_hi: 'नल की मरम्मत',
        service_en: 'Tap Repair',
        location: 'मालवीय नगर',
        time_hi: 'कल',
        time_en: 'Yesterday',
        status: 'Completed',
        rating: 5,
    },
    {
        id: 'JOB003',
        customer: 'अमित कुमार',
        avatar: 'https://i.pravatar.cc/150?u=amit',
        service_hi: 'AC सर्विस',
        service_en: 'AC Service',
        location: 'लाजपत नगर',
        time_hi: '2 दिन पहले',
        time_en: '2 days ago',
        status: 'Completed',
        rating: 4,
    }
];

export default function ProviderJobsPage() {
  const { t, locale } = useLanguage();
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/provider/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold font-headline">{t('my_jobs')}</h1>
      </div>
      
       <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="active">{t('jobs_active')}</TabsTrigger>
                <TabsTrigger value="completed">{t('jobs_completed')}</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
                {activeJobs.length > 0 ? (
                    <div className="space-y-4">
                        {activeJobs.map(job => (
                            <Card key={job.id}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{locale === 'hi' ? job.service_hi : job.service_en}</CardTitle>
                                    <CardDescription>{t('customer')}: {job.customer}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3 pt-4">
                                    <div className="flex items-center text-sm">
                                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>{locale === 'hi' ? job.time_hi : job.time_en}</span>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button className="w-full">{t('jobs_start_job')}</Button>
                                        <Button variant="outline" className="w-full">{t('jobs_contact_customer')}</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground">{t('no_active_jobs')}</p>
                        </CardContent>
                    </Card>
                )}
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
                 {completedJobs.length > 0 ? (
                    <div className="space-y-4">
                        {completedJobs.map(job => (
                            <Card key={job.id}>
                               <CardContent className="p-4 flex items-center gap-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={job.avatar} />
                                    <AvatarFallback>{job.customer.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 space-y-1">
                                    <p className="font-bold">{locale === 'hi' ? job.service_hi : job.service_en}</p>
                                    <p className="text-sm text-muted-foreground">{t('customer')}: {job.customer}</p>
                                    <p className="text-xs text-muted-foreground">{locale === 'hi' ? job.time_hi : job.time_en}</p>
                                  </div>
                                  <div className="flex items-center gap-1 text-primary">
                                      <Star className="h-5 w-5 fill-current" />
                                      <span className="font-bold text-lg">{job.rating}.0</span>
                                  </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground">{t('no_completed_jobs')}</p>
                        </CardContent>
                    </Card>
                )}
            </TabsContent>
        </Tabs>
    </div>
  );
}
