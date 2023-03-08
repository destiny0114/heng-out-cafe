import { useInfiniteGetProductsQuery } from "@graphql/generated/graphql";
import { GetProductsDocument, GetProductsQueryVariables, GetProductsQuery } from "@graphql/generated/graphql";
import { graphqlClient } from "@libs/api";
import useDebounce from "@hooks/useDebounce";

export const fetchProducts = async (variables: GetProductsQueryVariables): Promise<GetProductsQuery> => {
  const data = await graphqlClient.request(GetProductsDocument, variables);
  return data;
};

export const useProducts = (limit: number, reverse?: boolean, query?: string) => {
  console.log(process.env.SHOPIFY_ACCESS_TOKEN);

  const debounceQuery = useDebounce(query || "", 300);
  return useInfiniteGetProductsQuery(
    "after",
    graphqlClient,
    { first: limit, reverse: reverse, query: debounceQuery },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.products.pageInfo.hasNextPage) {
          return null;
        }
        return lastPage.products.pageInfo.endCursor;
      },
    }
  );
};
