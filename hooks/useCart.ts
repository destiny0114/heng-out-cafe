import { GetCartQueryVariables, GetCartDocument, GetCartQuery } from "@graphql/generated/graphql";
import { useGetCartQuery } from "@graphql/generated/graphql";
import { graphqlClient } from "@libs/api";

export const fetchCart = async (variables: GetCartQueryVariables): Promise<GetCartQuery> => {
  const data = await graphqlClient.request(GetCartDocument, variables);
  return data.cart;
};

export const useCart = (cartId: string) => {
  return useGetCartQuery(
    graphqlClient,
    { cartId },
    {
      enabled: !!cartId,
    }
  );
};
