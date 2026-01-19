import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground",
        className
      )}
    >
      <span className="text-4xl" role="img" aria-label="home">
        🏠
      </span>
    </div>
  );
};

export default Logo;
