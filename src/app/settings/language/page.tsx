'use client';

import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const languages = [
    { code: 'hi', name: 'हिंदी' },
    { code: 'en', name: 'English' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
];

export default function LanguageSettingsPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [selectedLanguage, setSelectedLanguage] = useState('hi');

    const handleLanguageChange = (langCode: string, langName: string) => {
        setSelectedLanguage(langCode);
        toast({
            title: "भाषा अपडेट की गई!",
            description: `ऐप की भाषा अब ${langName} है।`,
        });
        // In a real app, you would persist this setting and reload the UI.
        setTimeout(() => router.back(), 1000);
    };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold font-headline">भाषा चुनें</h1>
      </div>
      <Card>
        <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {languages.map((lang) => (
                    <Button
                        key={lang.code}
                        variant={selectedLanguage === lang.code ? "default" : "outline"}
                        className="flex justify-between items-center h-12 text-sm"
                        onClick={() => handleLanguageChange(lang.code, lang.name)}
                    >
                        <span>{lang.name}</span>
                        {selectedLanguage === lang.code && <Check className="h-4 w-4" />}
                    </Button>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
