import { QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

const endPoint = process.env.SHOPIFY_STORE_ENDPOINT || "";
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN || "";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    },
  },
});

export const graphqlClient = new GraphQLClient(endPoint, {
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": accessToken,
  },
});
