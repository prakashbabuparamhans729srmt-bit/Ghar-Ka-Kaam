"use client";

import { AlertTriangle, MapPin, Star, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const jobRequests = [
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
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-headline">नमस्ते, राम सिंह!</h1>
          <p className="text-muted-foreground">आपका दिन शुभ हो।</p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">आज की कमाई</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,250</div>
              <p className="text-xs text-muted-foreground">+20% कल से</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">कुल जॉब</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">3 आज पूरे हुए</p>
            </CardContent>
          </Card>
           <Card className="col-span-2 md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">आपकी रेटिंग</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">4.9</div>
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-xs text-muted-foreground">55 समीक्षाओं पर आधारित</p>
            </CardContent>
          </Card>
        </section>

        {/* Verification Alert */}
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>प्रोफाइल वेरिफिकेशन लंबित है</AlertTitle>
            <AlertDescription>
                आपकी कमाई को अनलॉक करने के लिए कृपया अपनी प्रोफ़ाइल पूरी करें और दस्तावेज़ सत्यापित करें।
                <Button variant="link" className="p-0 h-auto ml-2" asChild>
                  <Link href="/register/provider">अभी पूरा करें</Link>
                </Button>
            </AlertDescription>
        </Alert>

        {/* Job Requests */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-headline">नई जॉब रिक्वेस्ट</h2>
           <div className="grid gap-4">
            {jobRequests.map((job) => (
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
                            <div className="text-sm text-muted-foreground flex items-center gap-4">
                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location} ({job.distance})</span>
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {job.time}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                            <Button variant="outline" className="flex-1">अस्वीकार</Button>
                            <Button className="flex-1">स्वीकार करें (₹450)</Button>
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
