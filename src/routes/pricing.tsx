import { createFileRoute, redirect } from "@tanstack/react-router";

// Pricing page removed. Redirect legacy /pricing links to the homepage FAQ.
export const Route = createFileRoute("/pricing")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "faq" });
  },
  component: () => null,
});
