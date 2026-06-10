import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@core/context/AuthContext";
import { BroadcastAudioProvider } from "@core/context/BroadcastAudioContext";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <BroadcastAudioProvider>
        <AuthProvider>{children}</AuthProvider>
      </BroadcastAudioProvider>
    </QueryClientProvider>
  );
}
