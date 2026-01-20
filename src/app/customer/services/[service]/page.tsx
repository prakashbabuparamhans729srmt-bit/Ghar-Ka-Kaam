'use client';

import { ArrowLeft, Star, MapPin, Clock, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getTopProviders, getServiceCategories } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { findBestProvider, FindBestProviderInput } from '@/ai/flows/ai-powered-provider-matching';
import { useLanguage } from '@/context/language-context';

export default function ServiceProvidersPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const serviceIdFromUrl = params.service as string;
  const serviceCategories = getServiceCategories(t);
  const topProviders = getTopProviders(t);

  const [bestProviderId, setBestProviderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const serviceInfo = serviceCategories.find(s => s.id === serviceIdFromUrl);

  useEffect(() => {
    const customerLocation = localStorage.getItem("customerAddress") || 'साकेत, दिल्ली';

    async function getBestProvider() {
      if (!serviceInfo) {
        setIsLoading(false);
        return;
      }

      const relevantProviders = topProviders.filter(p => p.serviceId === serviceInfo.id);

      if (relevantProviders.length === 0) {
          setIsLoading(false);
          return;
      }

      const input: FindBestProviderInput = {
        serviceType: serviceInfo.name,
        customerLocation: customerLocation,
        customerRequirements: 'Need quick service for a leaking tap.',
        providerDetails: relevantProviders.map(p => ({
            providerId: p.providerId,
            realTimeLocation: p.realTimeLocation,
            rating: p.rating,
            completionRate: p.completionRate,
            responseTime: p.responseTime,
            price: Number(p.price),
            skills: p.skills,
        })),
      };

      try {
        setIsLoading(true);
        const result = await findBestProvider(input);
        if (result.bestProviderId) {
            setBestProviderId(result.bestProviderId);
        }
      } catch (e) {
        console.error("AI Provider matching failed:", e);
      } finally {
        setIsLoading(false);
      }
    }
    getBestProvider();
  }, [serviceInfo, topProviders]);


  if (!serviceInfo) {
    return (
      <div className="container mx-auto max-w-4xl p-4 md:p-6 text-center">
        <h1 className="text-2xl font-bold">{t('service_not_found')}</h1>
        <p className="text-muted-foreground">{t('service_not_available')}</p>
        <Button onClick={() => router.back()} className="mt-4">{t('go_back')}</Button>
      </div>
    );
  }
  
  const providersForService = topProviders.filter(
    (provider) => provider.serviceId === serviceIdFromUrl
  );

  const handleBooking = (providerName: string) => {
    toast({
      title: t('booking_confirmed_title'),
      description: t('booking_confirmed_description', { providerName }),
      variant: 'default'
    });
    setTimeout(() => {
        router.push('/customer/dashboard');
    }, 2000);
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/customer/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
            <h1 className="text-2xl font-bold font-headline">{serviceInfo.name}</h1>
            <p className="text-muted-foreground">{t('serviceProviders_pageSubtitle')}</p>
        </div>
      </div>
      
      {isLoading && (
         <div className="flex items-center justify-center gap-2 text-primary p-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-lg">{t('finding_best_provider')}</p>
        </div>
      )}

      {!isLoading && providersForService.length === 0 && (
         <Card>
            <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">{t('no_providers_for_service')}</p>
            </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {!isLoading && providersForService.map((provider) => (
          <Card key={provider.providerId} className={provider.providerId === bestProviderId ? "border-2 border-primary shadow-lg" : ""}>
             {provider.providerId === bestProviderId && (
                <div className="px-4 pt-2 text-sm font-bold text-primary">{t('ai_recommended')}</div>
             )}
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${provider.providerId}`} />
                <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-bold">{provider.name} <span className="text-sm font-normal text-muted-foreground">({provider.service})</span></p>
                <div className="flex items-center gap-1 text-sm text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold">{provider.rating}</span>
                </div>
                 <div className="text-sm text-muted-foreground flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {provider.realTimeLocation}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {provider.eta}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">₹{provider.price}</p>
                <p className="text-xs text-muted-foreground">{t('provider_startingAt')}</p>
                <Button size="sm" className="mt-2" onClick={() => handleBooking(provider.name)}>{t('book_now')}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
