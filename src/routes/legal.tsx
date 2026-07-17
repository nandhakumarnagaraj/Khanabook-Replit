import { createFileRoute, redirect } from "@tanstack/react-router";

// Legal has been split into dedicated pages. Preserve the old link.
export const Route = createFileRoute("/legal")({
  beforeLoad: () => {
    throw redirect({ to: "/privacy-policy" });
  },
  component: () => null,
});
