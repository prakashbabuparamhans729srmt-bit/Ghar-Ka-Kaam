import { Hammer, Lightbulb, PaintRoller, ShowerHead, Snowflake, Sofa, Tv2 } from "lucide-react";
import { BroomIcon } from "@/components/icons/broom-icon";

export const getServiceCategories = (t: (key: string) => string) => [
    { id: "plumbing", name: t('service_plumbing'), icon: ShowerHead, price: "300", color: "bg-primary/10 text-primary", href: "/customer/services/plumbing" },
    { id: "electrical", name: t('service_electrical'), icon: Lightbulb, price: "250", color: "bg-primary/10 text-primary", href: "/customer/services/electrical" },
    { id: "cleaning", name: t('service_cleaning'), icon: BroomIcon, price: "500", color: "bg-primary/10 text-primary", href: "/customer/services/cleaning" },
    { id: "ac", name: t('service_ac'), icon: Snowflake, price: "600", color: "bg-primary/10 text-primary", href: "/customer/services/ac" },
    { id: "painting", name: t('service_painting'), icon: PaintRoller, price: "800", color: "bg-primary/10 text-primary", href: "/customer/services/painting" },
    { id: "carpenter", name: t('service_carpenter'), icon: Hammer, price: "450", color: "bg-primary/10 text-primary", href: "/customer/services/carpenter" },
    { id: "furniture", name: t('service_furniture'), icon: Sofa, price: "700", color: "bg-primary/10 text-primary", href: "/customer/services/furniture" },
    { id: "tv", name: t('service_tv'), icon: Tv2, price: "550", color: "bg-primary/10 text-primary", href: "/customer/services/tv" },
];

export const getTopProviders = (t: (key: string) => string) => [
    {
        name: "राम सिंह",
        serviceId: "plumbing",
        service: t('service_plumbing'),
        rating: 4.9,
        eta: "30 मिनट में",
        price: "300",
        providerId: "p001",
        realTimeLocation: "साकेत, दिल्ली",
        completionRate: 98,
        responseTime: "2m",
        skills: ["नल मरम्मत", "टॉयलेट अनब्लॉक", "गीज़र सर्विस"],
    },
    {
        name: "राजू शर्मा",
        serviceId: "electrical",
        service: t('service_electrical'),
        rating: 4.8,
        eta: "45 मिनट में",
        price: "250",
        providerId: "p002",
        realTimeLocation: "मालवीय नगर, दिल्ली",
        completionRate: 95,
        responseTime: "5m",
        skills: ["स्विचबोर्ड रिपेयर", "वायरिंग", "फैन इंस्टालेशन"],
    },
    {
        name: "सुरेश कुमार",
        serviceId: "plumbing",
        service: t('service_plumbing'),
        rating: 4.7,
        eta: "40 मिनट में",
        price: "280",
        providerId: "p003",
        realTimeLocation: "हौज खास, दिल्ली",
        completionRate: 95,
        responseTime: "5m",
        skills: ["पाइप रिपेयर", "नया नल इंस्टॉल", "पानी का रिसाव"],
    },
];

// Re-exporting the original data for files that are not yet converted to use the new context
export const serviceCategories = getServiceCategories((key: string) => key);
export const topProviders = getTopProviders((key: string) => key);
