"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CheckCircle, FileUp, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

import { onRegister } from "./actions";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState = {
  message: "",
};

const certifications = [
  { id: "iti", label: "ITI" },
  { id: "govt", label: "सरकारी" },
  { id: "training", label: "प्रशिक्षण" },
  { id: "other", label: "अन्य" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      आगे बढ़ें
    </Button>
  );
}

export default function ProviderRegistration() {
  const [formState, formAction] = useFormState(onRegister, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [base64Files, setBase64Files] = useState<string[]>([]);

  useEffect(() => {
    if (formState.message && formState.data) {
      toast({
        title: formState.message,
        description: formState.data.reason,
        variant: formState.data.isValid ? "default" : "destructive",
      });
      if(formState.data.isValid) {
        formRef.current?.reset();
        setFiles([]);
        setBase64Files([]);
      }
    } else if (formState.message) {
      toast({
        title: "त्रुटि",
        description: formState.message,
        variant: "destructive",
      });
    }
  }, [formState, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64Files((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
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
            <CardTitle className="font-headline text-xl">🔧 सेवा प्रदाता पंजीकरण</CardTitle>
        </div>
        <CardDescription>
          हमारे साथ जुड़ें और अपनी कमाई बढ़ाएं।
        </CardDescription>
      </CardHeader>
      <form ref={formRef} action={formAction}>
        <CardContent className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">नाम</Label>
            <Input id="name" name="name" placeholder="आपका पूरा नाम" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType">🔧 सेवा का प्रकार:</Label>
            <Select name="serviceType" required>
              <SelectTrigger>
                <SelectValue placeholder="एक सेवा चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plumber">प्लंबर</SelectItem>
                <SelectItem value="electrician">इलेक्ट्रीशियन</SelectItem>
                <SelectItem value="cleaner">सफाई कर्मचारी</SelectItem>
                <SelectItem value="ac-technician">AC टेक्नीशियन</SelectItem>
                <SelectItem value="painter">पेंटर</SelectItem>
                <SelectItem value="carpenter">कारपेंटर</SelectItem>
                <SelectItem value="multi-skill">मल्टी-स्किल</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">🎓 अनुभव (वर्ष):</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="उदा. 5"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>प्रमाणपत्र:</Label>
              <div className="grid gap-2 pt-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`cert-${cert.id}`}
                      name="certifications"
                      value={cert.label}
                    />
                    <Label htmlFor={`cert-${cert.id}`} className="font-normal">
                      {cert.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workArea">📍 कार्य क्षेत्र:</Label>
            <Select name="workArea" required>
              <SelectTrigger>
                <SelectValue placeholder="अपना कार्य क्षेत्र चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5km">5km रेडियस</SelectItem>
                <SelectItem value="10km">10km रेडियस</SelectItem>
                <SelectItem value="full-city">पूरा शहर</SelectItem>
                <SelectItem value="multi-city">मल्टी-सिटी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documents">दस्तावेज़ अपलोड करें (AI द्वारा सत्यापित)</Label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileUp className="w-8 h-8 mb-4 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">अपलोड करने के लिए क्लिक करें</span> या खींचें और छोड़ें</p>
                      <p className="text-xs text-muted-foreground">पहचान पत्र, प्रमाण पत्र, आदि।</p>
                  </div>
                  <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} multiple />
              </label>
            </div>
            {files.length > 0 && (
              <div className="mt-2 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="text-sm text-muted-foreground">{file.name}</div>
                ))}
              </div>
            )}
            {base64Files.map((file, index) => (
              <input key={index} type="hidden" name="documents" value={file} />
            ))}
          </div>

          <Alert>
            <CardTitle className="text-base font-headline">💼 कमीशन मॉडल</CardTitle>
            <AlertDescription className="text-sm">
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>प्लेटफॉर्म कमीशन: 15%</li>
                    <li>न्यूनतम शुल्क: ₹150*</li>
                    <li>भुगतान: दैनिक/साप्ताहिक</li>
                    <li>बोनस: समीक्षा और रेटिंग पर आधारित</li>
                </ul>
            </AlertDescription>
          </Alert>

          {formState.data && (
            <Alert variant={formState.data.isValid ? "default" : "destructive"}>
              {formState.data.isValid ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertTitle>{formState.message}</AlertTitle>
              <AlertDescription>{formState.data.reason}</AlertDescription>
            </Alert>
          )}

        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
