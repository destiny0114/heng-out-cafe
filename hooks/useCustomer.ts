import { GetCustomerQueryVariables, GetCustomerDocument } from "@graphql/generated/graphql";
import { useGetCustomerQuery } from "@graphql/generated/graphql";
import { graphqlClient } from "@libs/api";
import { User } from "@libs/types";

export const fetchCustomer = async (variables: GetCustomerQueryVariables): Promise<User> => {
  const data = await graphqlClient.request(GetCustomerDocument, variables);
  return data.customer as User;
};

export const useCustomer = (accessToken: string) => {
  return useGetCustomerQuery(graphqlClient, { accessToken }, { enabled: !!accessToken });
};
