import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/help-center")({
  beforeLoad: () => {
    throw redirect({ to: "/help" });
  },
});
