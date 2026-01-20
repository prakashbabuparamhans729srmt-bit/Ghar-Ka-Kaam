import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProviderJobsPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/provider/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold font-headline">मेरी जॉब्स</h1>
      </div>
      <Card>
        <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">आपके पास कोई सक्रिय जॉब नहीं है।</p>
        </CardContent>
      </Card>
    </div>
  );
}
