import { Briefcase, DollarSign, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/provider/dashboard"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo className="h-10 w-10"/>
            <span className="sr-only">GharKaam</span>
          </Link>
          <h1 className="text-lg font-semibold">प्रोवाइडर डैशबोर्ड</h1>
        </nav>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button variant="secondary" size="icon" className="rounded-full h-8 w-8" asChild>
            <Link href="/provider/profile">
              <User className="h-4 w-4" />
              <span className="sr-only">Toggle user menu</span>
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="sticky bottom-0 z-10 border-t bg-background/95 p-2 backdrop-blur-sm md:hidden">
          <div className="grid grid-cols-4 gap-2">
            <Button variant="ghost" className="flex h-12 flex-col items-center justify-center gap-1 text-xs" asChild>
                <Link href="/provider/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>डैशबोर्ड</span>
                </Link>
            </Button>
            <Button variant="ghost" className="flex h-12 flex-col items-center justify-center gap-1 text-xs" asChild>
                <Link href="/provider/jobs">
                    <Briefcase className="h-5 w-5" />
                    <span>जॉब्स</span>
                </Link>
            </Button>
            <Button variant="ghost" className="flex h-12 flex-col items-center justify-center gap-1 text-xs" asChild>
                <Link href="/provider/earnings">
                    <DollarSign className="h-5 w-5" />
                    <span>कमाई</span>
                </Link>
            </Button>
             <Button variant="ghost" className="flex h-12 flex-col items-center justify-center gap-1 text-xs" asChild>
                <Link href="/provider/profile">
                    <User className="h-5 w-5" />
                    <span>प्रोफाइल</span>
                </Link>
            </Button>
          </div>
      </footer>
    </div>
  );
}
