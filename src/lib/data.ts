import { Hammer, Lightbulb, PaintRoller, ShowerHead, Snowflake, Sofa, Tv2 } from "lucide-react";
import { BroomIcon } from "@/components/icons/broom-icon";

export const serviceCategories = [
    { name: "प्लंबिंग", icon: ShowerHead, price: "300", color: "bg-cyan-500/10 text-cyan-500", href: "/customer/services/plumbing" },
    { name: "इलेक्ट्रिकल", icon: Lightbulb, price: "250", color: "bg-orange-500/10 text-orange-500", href: "/customer/services/electrical" },
    { name: "सफाई", icon: BroomIcon, price: "500", color: "bg-emerald-500/10 text-emerald-500", href: "/customer/services/cleaning" },
    { name: "AC", icon: Snowflake, price: "600", color: "bg-sky-500/10 text-sky-500", href: "/customer/services/ac" },
    { name: "पेंटिंग", icon: PaintRoller, price: "800", color: "bg-violet-500/10 text-violet-500", href: "/customer/services/painting" },
    { name: "कारपेंटर", icon: Hammer, price: "450", color: "bg-yellow-700/10 text-yellow-700", href: "/customer/services/carpenter" },
    { name: "फर्नीचर", icon: Sofa, price: "700", color: "bg-rose-500/10 text-rose-500", href: "/customer/services/furniture" },
    { name: "टीवी", icon: Tv2, price: "550", color: "bg-indigo-500/10 text-indigo-500", href: "/customer/services/tv" },
];

export const topProviders = [
    {
        name: "राम सिंह",
        service: "प्लंबर",
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
        service: "इलेक्ट्रीशियन",
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
        service: "प्लंबर",
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
