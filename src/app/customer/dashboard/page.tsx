"use client";

import Link from "next/link";
import { Search, Star } from "lucide-react";
import { getServiceCategories, getTopProviders } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";
import { useToast } from "@/hooks/use-toast";

export default function CustomerDashboard() {
  const { t, locale } = useLanguage();
  const serviceCategories = getServiceCategories(t);
  const topProviders = getTopProviders(t);
  const router = useRouter();
  const { toast } = useToast();
  
  const [currentDate, setCurrentDate] = useState("");
  const [location, setLocation] = useState("साकेत, दिल्ली");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    const savedLocation = localStorage.getItem("customerAddress");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, [locale]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return;
      
      const matchedService = serviceCategories.find(service => 
        service.name.toLowerCase().includes(query)
      );

      if (matchedService) {
        router.push(matchedService.href);
      } else {
        toast({
          title: t('search_no_results_title'),
          description: t('search_no_results_description', { query: searchQuery }),
          variant: "default",
        });
      }
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
      <div className="space-y-4">
        {/* Header Section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-headline">{t('customerDashboard_greeting')}</h1>
          <p className="text-muted-foreground">{currentDate} | 📍 {location}</p>
        </div>

        {/* Search Section */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t('customerDashboard_searchPlaceholder')}
            className="w-full rounded-full bg-muted pl-10 py-6 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Quick Services Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-headline">{t('customerDashboard_quickServices')}</h2>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
            {serviceCategories.map((service) => (
              <Link href={service.href} key={service.name} className="group flex flex-col items-center text-center gap-2">
                <div className={cn("flex h-16 w-16 items-center justify-center rounded-2xl transition-all group-hover:scale-105", service.color)}>
                  <service.icon className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">{service.name}</div>
                <div className="text-xs text-muted-foreground">₹{service.price}*</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Rated Providers Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-headline">{t('customerDashboard_topRatedProviders')}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {topProviders.slice(0, 2).map((provider) => (
              <Card key={provider.name} className="transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${provider.providerId}`} />
                    <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="font-bold">{provider.name} <span className="text-sm font-normal text-muted-foreground">({provider.service})</span></p>
                    <div className="flex items-center gap-1 text-sm text-primary">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-bold">{provider.rating}</span>
                    </div>
                     <p className="text-sm text-muted-foreground">⏰ {provider.eta}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{provider.price}</p>
                    <p className="text-xs text-muted-foreground">{t('provider_startingAt')}</p>
                    <Button size="sm" className="mt-2">{t('book_now')}</Button>
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
