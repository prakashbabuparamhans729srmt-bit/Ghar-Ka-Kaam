"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
    <Button type="submit" className="w-full" disabled={pending}>
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
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const certifications = certificationsData.map(c => ({...c, label: t(c.labelKey)}));


  useEffect(() => {
    if (formState.message && formState.data) {
      if (formState.data.isValid) {
        setShowOtpDialog(true);
        toast({
          title: t('providerRegistration_aiVerificationSuccess'),
          description: t('providerRegistration_verifyMobile'),
          variant: 'default',
        });
      } else {
        toast({
          title: t(formState.message),
          description: t(formState.data.reason),
          variant: 'destructive',
        });
      }
    } else if (formState.message) {
      toast({
        title: t('providerRegistration_error'),
        description: t(formState.message),
        variant: 'destructive',
      });
    }
  }, [formState, toast, t]);

  const handleOtpVerify = () => {
    if (otp === "1234") {
      toast({
        title: t('registration_success_title'),
        description: t('registration_success_description'),
        variant: "default",
      });
      formRef.current?.reset();
      setFiles([]);
      setBase64Files([]);
      router.push("/provider/dashboard");
    } else {
      toast({
        title: t('wrong_otp_title'),
        description: t('wrong_otp_description'),
        variant: "destructive",
      });
    }
  };

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
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <CardTitle className="font-headline text-xl">
              🔧 {t('providerRegistration_title')}
            </CardTitle>
          </div>
          <CardDescription>
            {t('providerRegistration_description')}
          </CardDescription>
        </CardHeader>
        <form ref={formRef} action={formAction}>
          <CardContent className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('providerRegistration_nameLabel')}</Label>
              <Input id="name" name="name" placeholder={t('providerRegistration_namePlaceholder')} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">🔧 {t('providerRegistration_serviceTypeLabel')}</Label>
              <Select name="serviceType" required>
                <SelectTrigger>
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
              <Label htmlFor="workArea">📍 {t('providerRegistration_workAreaLabel')}</Label>
              <Select name="workArea" required>
                <SelectTrigger>
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
                  className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-secondary hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileUp className="mb-4 h-8 w-8 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">{t('providerRegistration_uploadHint')}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
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
                    <div key={index} className="text-sm text-muted-foreground">
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
              {base64Files.map((file, index) => (
                <input key={index} type="hidden" name="documents" value={file} />
              ))}
            </div>

            <Alert>
              <CardTitle className="text-base font-headline">
                💼 {t('providerRegistration_commissionModelTitle')}
              </CardTitle>
              <AlertDescription className="text-sm">
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
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('otp_verify_title')}</DialogTitle>
            <DialogDescription>
              {t('otp_verify_description')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="otp" className="text-right sr-only">
                OTP
              </Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={4}
                placeholder={t('otp_placeholder')}
                className="col-span-4 text-center tracking-[1rem]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleOtpVerify} className="w-full">
              {t('verify')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
