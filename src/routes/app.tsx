import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { BUSINESS } from "../lib/business-config";

export const Route = createFileRoute("/app")({
  component: AppPageRedirect,
});

function AppPageRedirect() {
  useEffect(() => {
    window.location.href = BUSINESS.loginUrl;
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-center">
      <div className="space-y-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent mx-auto" />
        <p className="text-sm font-medium text-foreground">
          Redirecting to KhanaBook Web Dashboard...
        </p>
        <p className="text-xs text-muted-foreground">
          If you are not redirected automatically,{" "}
          <a href={BUSINESS.loginUrl} className="text-brand underline">
            click here
          </a>
          .
        </p>
      </div>
    </div>
  );
}
