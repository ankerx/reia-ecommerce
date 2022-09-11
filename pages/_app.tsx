import { ThemeProvider } from "@material-tailwind/react";
import { useState } from "react";

import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

import { CartProvider } from "../src/context/context";
import { Layout } from "../src/modules/UI/Layout";
import "../src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CartProvider>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </CartProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
