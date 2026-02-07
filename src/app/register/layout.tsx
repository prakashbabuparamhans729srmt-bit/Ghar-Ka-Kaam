import Logo from '@/components/logo';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex min-h-screen w-full bg-background">
        <div 
          className="hidden md:flex md:w-2/5 flex-col justify-between p-12 text-white"
          style={{background: 'linear-gradient(145deg, hsl(175, 95%, 10%), hsl(0, 0%, 3%))'}}
        >
          <div>
            <div className="flex items-center gap-3 text-2xl font-bold font-headline">
              <Logo className="h-10 w-10 bg-white/20" />
              <span>GharKaam</span>
            </div>
            <h1 className="mt-10 text-5xl font-bold font-headline">Get Started with Us</h1>
            <p className="mt-4 text-white/70">Complete these easy steps to register your account.</p>
          </div>
          <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg bg-white p-4 text-black shadow-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white font-bold">1</div>
                  <span className="font-semibold">Sign up your account</span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/50 font-bold">2</div>
                  <span className="font-semibold">Set up your workspace</span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/50 font-bold">3</div>
                  <span className="font-semibold">Set up your profile</span>
              </div>
          </div>
        </div>
        <main className="w-full md:w-3/5 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
  );
}
