"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, LocateIcon, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const services = [
  { id: "plumbing", label: "प्लंबिंग" },
  { id: "electrical", label: "इलेक्ट्रिकल" },
  { id: "cleaning", label: "सफाई" },
  { id: "ac", label: "AC सर्विस" },
  { id: "painting", label: "पेंटिंग" },
  { id: "carpenter", label: "कारपेंटर" },
];

const formSchema = z.object({
  mobile: z.string().min(10, { message: "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें।" }),
  address: z.string().min(1, { message: "कृपया अपना पता दर्ज करें।" }),
  houseType: z.string({ required_error: "कृपया घर का प्रकार चुनें।" }),
  services: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "आपको कम से-कम एक सेवा चुननी होगी।",
  }),
});

export default function CustomerRegistration() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
      address: "",
      services: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    localStorage.setItem("customerAddress", values.address);
    router.push("/customer/dashboard");
  }

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const detectedAddress = "साकेत, दिल्ली (अनुमानित)";
          form.setValue("address", detectedAddress);
          localStorage.setItem("customerAddress", detectedAddress);
          toast({
            title: "लोकेशन मिल गई!",
            description: "हमने आपकी लोकेशन का अनुमान लगा लिया है।",
          });
        },
        () => {
          toast({
            title: "लोकेशन नहीं मिली",
            description:
              "आपकी लोकेशन का पता नहीं लगा सके। कृपया मैन्युअल रूप से दर्ज करें।",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "लोकेशन सपोर्ट नहीं है",
        description: "आपके ब्राउज़र में जियोलोकेशन सपोर्ट नहीं है।",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader>
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href="/"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <CardTitle className="font-headline text-xl">📱 ग्राहक पंजीकरण</CardTitle>
        </div>
        <CardDescription>अपना खाता बनाएं और सेवाओं का लाभ उठाएं।</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>📱 मोबाइल नंबर:</FormLabel>
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
                  <FormLabel>📍 आपका पता:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="मैन्युअल दर्ज करें" {...field} />
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
                  <FormLabel>🏠 घर का प्रकार:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="एक प्रकार चुनें" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="apartment">अपार्टमेंट</SelectItem>
                      <SelectItem value="independent">इंडिपेंडेंट हाउस</SelectItem>
                      <SelectItem value="villa">विला</SelectItem>
                      <SelectItem value="office">ऑफिस</SelectItem>
                      <SelectItem value="commercial">कॉमर्शियल प्रॉपर्टी</SelectItem>
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
                  <FormLabel>🎯 पसंदीदा सेवाएँ:</FormLabel>
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
                                {item.label}
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
            <Button type="submit" className="w-full">OTP भेजें</Button>
            <Button variant="outline" className="w-full">
              <LogIn className="mr-2 h-4 w-4" /> Google से लॉगिन
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
