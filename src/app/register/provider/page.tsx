"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileUp, Loader2, XCircle } from "lucide-react";
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
import { useLanguage } from "@/context/language-context";

const initialState = {
  message: "",
};

const certificationsData = [
  { id: "iti", labelKey: "certificate_iti" },
  { id: "govt", labelKey: "certificate_govt" },
  { id: "training", labelKey: "certificate_training" },
  { id: "other", labelKey: "certificate_other" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useLanguage();
  return (
    <Button type="submit" className="w-full bg-cyan-400 text-black hover:bg-cyan-500 font-bold" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {t('providerRegistration_proceed')}
    </Button>
  );
}

export default function ProviderRegistration() {
  const [formState, formAction] = useFormState(onRegister, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [base64Files, setBase64Files] = useState<string[]>([]);
  
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [serviceType, setServiceType] = useState("");
  
  const certifications = certificationsData.map(c => ({...c, label: t(c.labelKey)}));


  useEffect(() => {
    if (formState.message === 'verification_successful' && formState.data?.isValid) {
      toast({
        title: t('providerRegistration_aiVerificationSuccess'),
        variant: 'default',
      });
      localStorage.setItem("providerName", name);
      localStorage.setItem("providerMobile", mobile);
      localStorage.setItem("providerService", serviceType);
      router.push("/provider/dashboard");

    } else if (formState.message && formState.message !== 'verification_successful') {
      toast({
        title: t('providerRegistration_error'),
        description: formState.data?.reason ? t(formState.data.reason) : t(formState.message),
        variant: 'destructive',
      });
    }
  }, [formState, toast, t, name, mobile, serviceType, router]);


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
    <>
      <Card className="w-full max-w-lg bg-transparent border-0 shadow-none text-white">
          <form ref={formRef} action={formAction}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="bg-transparent hover:bg-white/10 text-white hover:text-white border-white/20" asChild>
                  <Link href="/role-selection">
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <CardTitle className="font-headline text-xl">
                  🔧 {t('providerRegistration_title')}
                </CardTitle>
              </div>
              <CardDescription className="text-white/70">
                {t('providerRegistration_description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('providerRegistration_nameLabel')}</Label>
                  <Input id="name" name="name" placeholder={t('providerRegistration_namePlaceholder')} required value={name} onChange={(e) => setName(e.target.value)} className="bg-white/5 border-white/20 focus-visible:ring-cyan-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">📱 {t('customerRegistration_mobileLabel')}</Label>
                  <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">+91</span>
                      <Input id="mobile" name="mobile" placeholder="9876543210" required className="pl-10 bg-white/5 border-white/20 focus-visible:ring-cyan-500" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceType">🔧 {t('providerRegistration_serviceTypeLabel')}</Label>
                <Select name="serviceType" required onValueChange={setServiceType}>
                  <SelectTrigger className="bg-white/5 border-white/20 focus:ring-cyan-500">
                    <SelectValue placeholder={t('providerRegistration_serviceTypePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumber">{t('service_plumbing')}</SelectItem>
                    <SelectItem value="electrician">{t('service_electrical')}</SelectItem>
                    <SelectItem value="cleaner">{t('service_cleaning')}</SelectItem>
                    <SelectItem value="ac-technician">{t('service_ac')}</SelectItem>
                    <SelectItem value="painter">{t('service_painting')}</SelectItem>
                    <SelectItem value="carpenter">{t('service_carpenter')}</SelectItem>
                    <SelectItem value="multi-skill">{t('multi_skill')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">🎓 {t('providerRegistration_experienceLabel')}</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    placeholder={t('providerRegistration_experiencePlaceholder')}
                    required
                    className="bg-white/5 border-white/20 focus-visible:ring-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('providerRegistration_certificatesLabel')}</Label>
                  <div className="grid gap-2 pt-2">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`cert-${cert.id}`}
                          name="certifications"
                          value={cert.label}
                          className="border-white/50 data-[state=checked]:bg-cyan-400 data-[state=checked]:text-black"
                        />
                        <Label htmlFor={`cert-${cert.id}`} className="font-normal text-white/90">
                          {cert.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workArea">📍 {t('providerRegistration_workAreaLabel')}</Label>
                <Select name="workArea" required>
                  <SelectTrigger className="bg-white/5 border-white/20 focus:ring-cyan-500">
                    <SelectValue placeholder={t('providerRegistration_workAreaPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5km">{t('work_area_5km')}</SelectItem>
                    <SelectItem value="10km">{t('work_area_10km')}</SelectItem>
                    <SelectItem value="full-city">{t('work_area_full_city')}</SelectItem>
                    <SelectItem value="multi-city">{t('work_area_multi_city')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documents">
                  {t('providerRegistration_uploadLabel')}
                </Label>
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileUp className="mb-4 h-8 w-8 text-white/50" />
                      <p className="mb-2 text-sm text-white/70">
                        <span className="font-semibold">{t('providerRegistration_uploadHint')}</span>
                      </p>
                      <p className="text-xs text-white/50">
                        {t('providerRegistration_uploadSubHint')}
                      </p>
                    </div>
                    <Input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                    />
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="text-sm text-white/70">
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
                {base64Files.map((file, index) => (
                  <input key={index} type="hidden" name="documents" value={file} />
                ))}
              </div>

              <Alert className="bg-white/5 border-white/20 text-white">
                <CardTitle className="text-base font-headline">
                  💼 {t('providerRegistration_commissionModelTitle')}
                </CardTitle>
                <AlertDescription className="text-sm text-white/70">
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>{t('providerRegistration_platformCommission')}</li>
                    <li>{t('providerRegistration_minimumFee')}</li>
                    <li>{t('providerRegistration_payment')}</li>
                    <li>{t('providerRegistration_bonus')}</li>
                  </ul>
                </AlertDescription>
              </Alert>

              {formState.data && !formState.data.isValid && (
                <Alert variant={"destructive"}>
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>{t(formState.message)}</AlertTitle>
                  <AlertDescription>{t(formState.data.reason)}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <SubmitButton />
            </CardFooter>
          </form>
      </Card>
    </>
  );
}