import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "./AppRoutes";
import { posts } from "@/data/blog";

export const blogSlugs = posts.map((p) => p.slug);

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const queryClient = new QueryClient();
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>,
  );
  return { html, helmet: helmetContext.helmet };
}
