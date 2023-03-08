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
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  },
});

export const graphqlClient2 = new GraphQLClient("https://heng-out-cafe.myshopify.com/api/2022-10/graphql.json", {
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": accessToken,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  },
});
