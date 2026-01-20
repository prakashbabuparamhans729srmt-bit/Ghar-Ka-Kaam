"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, LocateIcon, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useLanguage, type TFunction } from "@/context/language-context";
import { getServiceCategories } from "@/lib/data";

const getFormSchema = (t: TFunction) => z.object({
  mobile: z.string().min(10, { message: t('validation_mobile_10_digits') }),
  address: z.string().min(1, { message: t('validation_address_required') }),
  houseType: z.string({ required_error: t('validation_houseType_required') }),
  services: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: t('customerRegistration_preferredServicesError'),
  }),
});

export default function CustomerRegistration() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  const services = getServiceCategories(t);
  
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");

  const formSchema = getFormSchema(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
      address: "",
      services: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("customerAddress", values.address);
    setMobile(values.mobile);
    setStep('otp');
    toast({
        title: t('otp_sent_title'),
        description: t('otp_sent_description', { mobile: values.mobile }),
    });
  }

  const handleOtpVerify = () => {
    // Using a dummy OTP for demonstration
    if (otp === "123456") {
        toast({
            title: t('registration_success_title'),
            description: t('registration_success_description'),
            variant: "default",
        });
        router.push("/customer/dashboard");
    } else {
        toast({
            title: t('wrong_otp_title'),
            description: t('wrong_otp_description'),
            variant: "destructive",
        });
    }
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const detectedAddress = "साकेत, दिल्ली (अनुमानित)";
          form.setValue("address", detectedAddress);
          localStorage.setItem("customerAddress", detectedAddress);
          toast({
            title: t('location_found_title'),
            description: t('location_found_description'),
          });
        },
        () => {
          toast({
            title: t('location_not_found_title'),
            description: t('location_not_found_description'),
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: t('location_unsupported_title'),
        description: t('location_unsupported_description'),
        variant: "destructive",
      });
    }
  };

  return (
      <Card className="w-full max-w-lg shadow-2xl">
        {step === 'details' && (
          <>
            <CardHeader>
              <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" asChild>
                      <Link href="/"><ArrowLeft className="h-4 w-4" /></Link>
                  </Button>
                  <CardTitle className="font-headline text-xl">📱 {t('customerRegistration_title')}</CardTitle>
              </div>
              <CardDescription>{t('customerRegistration_description')}</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>📱 {t('customerRegistration_mobileLabel')}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">+91</span>
                            <Input placeholder="9876543210" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>📍 {t('customerRegistration_addressLabel')}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder={t('customerRegistration_addressPlaceholder')} {...field} />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                              onClick={handleLocateMe}
                            >
                              <LocateIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="houseType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>🏠 {t('customerRegistration_houseTypeLabel')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('customerRegistration_houseTypePlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apartment">{t('customerRegistration_houseType_apartment')}</SelectItem>
                            <SelectItem value="independent">{t('customerRegistration_houseType_independent')}</SelectItem>
                            <SelectItem value="villa">{t('customerRegistration_houseType_villa')}</SelectItem>
                            <SelectItem value="office">{t('customerRegistration_houseType_office')}</SelectItem>
                            <SelectItem value="commercial">{t('customerRegistration_houseType_commercial')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="services"
                    render={() => (
                      <FormItem>
                        <FormLabel>🎯 {t('customerRegistration_preferredServicesLabel')}</FormLabel>
                        <div className="grid grid-cols-2 gap-4 rounded-md border p-4">
                          {services.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="services"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.name}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full">{t('customerRegistration_sendOtp')}</Button>
                  <Button variant="outline" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" /> {t('customerRegistration_loginWithGoogle')}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </>
        )}
        {step === 'otp' && (
           <>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => setStep('details')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <CardTitle className="font-headline text-xl">{t('otp_verify_title')}</CardTitle>
                </div>
                <CardDescription>
                    {t('otp_verify_description')} (+91 {mobile})
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="otp" className="text-right sr-only">
                            OTP
                        </Label>
                        <Input
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            placeholder="——"
                            className="col-span-4 text-center text-2xl tracking-[1rem] bg-secondary border-0 font-mono"
                        />
                    </div>
                </div>
                 <div className="text-center text-sm">
                    {t('didnt_receive_code')}{' '}
                    <Button variant="link" className="p-0 h-auto font-semibold">
                        {t('resend_otp')}
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button onClick={handleOtpVerify} className="w-full">{t('verify')}</Button>
            </CardFooter>
           </>
        )}
      </Card>
  );
}
