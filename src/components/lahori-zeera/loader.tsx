'use client';

import { Progress } from "@/components/ui/progress";

type LoaderProps = {
  progress: number;
};

export default function Loader({ progress }: LoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-sm text-center space-y-4">
        <h1 className="font-headline text-5xl font-bold text-primary animate-pulse">
          Lahori Zeera
        </h1>
        <p className="text-muted-foreground">Getting the first sip ready...</p>
      </div>
    </div>
  );
}
