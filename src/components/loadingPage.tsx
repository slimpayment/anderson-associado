'use client'

import { Loader2 } from "lucide-react";

interface LoadingPageProps {
  message?: string;
}

export function LoadingPage({ message = "Carregando..." }: LoadingPageProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-muted/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 p-6 bg-white rounded-xl shadow-lg border">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="text-sm font-medium text-muted-foreground">
          {message}
        </span>
      </div>
    </div>
  );
}
