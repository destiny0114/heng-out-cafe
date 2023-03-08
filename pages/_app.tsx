import "nprogress/nprogress.css";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@components/Layout";
import AuthProvider from "@context/AuthContext";
import ShopProvider from "@context/ShopContext";
import { queryClient } from "@libs/api";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <ShopProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ShopProvider>
        </AuthProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
