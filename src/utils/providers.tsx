"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalsProvider } from "@mantine/modals";
import { ErrorBoundary } from "../components";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // default: true
        },
      },
    })
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={client}>
        <ModalsProvider>{children}</ModalsProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
