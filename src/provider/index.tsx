import {ChakraProvider} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {theme} from "../theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function Provider({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </QueryClientProvider>
  );
}
