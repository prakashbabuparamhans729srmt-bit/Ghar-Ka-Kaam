import { ArrowLeft, User, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CustomerProfilePage() {
    const customerName = "रवि जी";
    const customerMobile = "+91 9876543210";
    const customerAddress = "साकेत, दिल्ली";

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/customer/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold font-headline">मेरी प्रोफाइल</h1>
      </div>
      <Card>
        <CardContent className="p-6 flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
                <AvatarImage src="https://i.pravatar.cc/150?u=ravi" />
                <AvatarFallback>{customerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
                <h2 className="text-xl font-bold">{customerName}</h2>
            </div>
            <div className="space-y-2 text-left w-full max-w-sm">
                 <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{customerMobile}</span>
                </div>
                 <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{customerAddress}</span>
                </div>
            </div>
            <Button variant="outline" className="mt-4">प्रोफाइल संपादित करें</Button>
        </CardContent>
      </Card>
    </div>
  );
}
