import { ArrowLeft, User, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProviderProfilePage() {
    const providerName = "राम सिंह";
    const providerService = "प्लंबर";

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/provider/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold font-headline">मेरी प्रोफाइल</h1>
      </div>
      <Card>
        <CardContent className="p-6 flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
                <AvatarImage src="https://i.pravatar.cc/150?u=p001" />
                <AvatarFallback>{providerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
                <h2 className="text-xl font-bold">{providerName}</h2>
                <p className="text-muted-foreground">{providerService}</p>
            </div>
            <Badge variant="outline">सत्यापित</Badge>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Button variant="outline">प्रोफाइल संपादित करें</Button>
              <Button variant="outline" asChild>
                <Link href="/settings/language">
                  <Globe className="mr-2 h-4 w-4" />
                  भाषा बदलें
                </Link>
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
