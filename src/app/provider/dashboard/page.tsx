"use client";

import { AlertTriangle, MapPin, Star, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const initialJobRequests = [
  {
    id: 1,
    service: "गीज़र की मरम्मत",
    customer: "नेहा गुप्ता",
    location: "साकेत, दिल्ली",
    distance: "2 km दूर",
    time: "30 मिनट पहले",
    avatar: "https://i.pravatar.cc/150?u=neha",
  },
  {
    id: 2,
    service: "AC सर्विस",
    customer: "अमित कुमार",
    location: "मालवीय नगर",
    distance: "4.5 km दूर",
    time: "1 घंटा पहले",
    avatar: "https://i.pravatar.cc/150?u=amit",
  },
  {
    id: 3,
    service: "वायरिंग की जाँच",
    customer: "सुनीता सिंह",
    location: "लाजपत नगर",
    distance: "5 km दूर",
    time: "2 घंटे पहले",
    avatar: "https://i.pravatar.cc/150?u=sunita",
  }
];

export default function ProviderDashboard() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [jobRequests, setJobRequests] = useState(initialJobRequests);

  const handleJobAction = (jobId: number, action: 'accept' | 'reject') => {
    const job = jobRequests.find(j => j.id === jobId);
    if (!job) return;

    setJobRequests(prevJobs => prevJobs.filter(j => j.id !== jobId));
    
    if (action === 'accept') {
        toast({
            title: t('providerDashboard_jobAcceptedTitle'),
            description: t('providerDashboard_jobAcceptedDescription', { customer: job.customer }),
            variant: 'default'
        });
    } else {
        toast({
            title: t('providerDashboard_jobRejectedTitle'),
            description: t('providerDashboard_jobRejectedDescription', { customer: job.customer }),
            variant: 'destructive'
        });
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-headline">{t('providerDashboard_greeting')}</h1>
          <p className="text-muted-foreground">{t('providerDashboard_subtitle')}</p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('providerDashboard_todayEarnings')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,250</div>
              <p className="text-xs text-muted-foreground">{t('providerDashboard_earningsIncrease')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('providerDashboard_totalJobs')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">{t('providerDashboard_jobsCompleted', {count: 3})}</p>
            </CardContent>
          </Card>
           <Card className="col-span-2 md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('providerDashboard_yourRating')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">4.9</div>
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-xs text-muted-foreground">{t('providerDashboard_ratingBasedOn', { count: 55 })}</p>
            </CardContent>
          </Card>
        </section>

        {/* Verification Alert */}
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t('providerDashboard_verificationPending')}</AlertTitle>
            <AlertDescription>
                {t('providerDashboard_verificationMessage')}
                <Button variant="link" className="p-0 h-auto ml-2" asChild>
                  <Link href="/register/provider">{t('providerDashboard_completeNow')}</Link>
                </Button>
            </AlertDescription>
        </Alert>

        {/* Job Requests */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-headline">{t('providerDashboard_newJobRequests')}</h2>
           <div className="grid gap-4">
            {jobRequests.length === 0 ? (
                 <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">{t('providerDashboard_noNewJobs')}</p>
                    </CardContent>
                </Card>
            ) : jobRequests.map((job) => (
                <Card key={job.id}>
                    <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                         <Avatar className="h-12 w-12 hidden sm:flex">
                            <AvatarImage src={job.avatar} />
                            <AvatarFallback>{job.customer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 grid gap-1">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 sm:hidden">
                                    <AvatarImage src={job.avatar} />
                                    <AvatarFallback>{job.customer.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="font-bold">{job.service}</p>
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-4 flex-wrap">
                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location} ({job.distance})</span>
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {job.time}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                            <Button variant="outline" className="flex-1" onClick={() => handleJobAction(job.id, 'reject')}>{t('reject')}</Button>
                            <Button className="flex-1" onClick={() => handleJobAction(job.id, 'accept')}>{t('accept_offer', {amount: 450})}</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
           </div>
        </section>
      </div>
    </div>
  );
}
