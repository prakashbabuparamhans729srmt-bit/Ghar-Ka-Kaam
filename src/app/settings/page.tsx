'use client';

import { ArrowLeft, ChevronRight, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
    const router = useRouter();
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
           <span className="sr-only">वापस</span>
        </Button>
        <h1 className="text-2xl font-bold font-headline">सेटिंग्स</h1>
      </div>
      <Card>
        <CardContent className="p-0">
           <ul className="divide-y">
                <li className="p-4 hover:bg-muted/50 transition-colors">
                     <Link href="/settings/language" className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Globe className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">भाषा</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                </li>
           </ul>
        </CardContent>
      </Card>
    </div>
  );
}
