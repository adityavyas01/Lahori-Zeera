'use client';

import { Progress } from "@/components/ui/progress";

type LoaderProps = {
  progress: number;
};

export default function Loader({ progress }: LoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-sm text-center">
        <h1 className="font-headline text-5xl font-bold text-primary-foreground">
          Lahori Zeera
        </h1>
        <div className="mt-8 space-y-2">
          <Progress value={progress} className="h-2 w-full" />
          <p className="font-mono text-sm text-muted-foreground">{progress}%</p>
        </div>
      </div>
    </div>
  );
}
