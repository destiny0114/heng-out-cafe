import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UseQueryResult } from "@tanstack/react-query";
import {
  GetCartQuery,
  useAddCartItemsMutation,
  useCreateCartMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemsMutation,
} from "@graphql/generated/graphql";
import { graphqlClient } from "@libs/api";
import { CartLineAdd, CartLineUpdate, CartLineRemove, CartResponse, User } from "@libs/types";
import { useCart } from "@hooks/useCart";
import { useAuth } from "./AuthContext";

type ShopProviderProps = {
  children: React.ReactNode;
};

type ShopContextType = {
  cartId: string | null;
  cartQuery: UseQueryResult<GetCartQuery, unknown>;
  createEmptyCart: (user: User) => void;
  addProductToCart: (item: CartLineAdd) => void;
  updateProductToCart: (item: CartLineUpdate) => void;
  removeItemFromCart: ({ merchandiseId }: CartLineRemove) => void;
};

const ShopContext = createContext<ShopContextType>({} as ShopContextType);

const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
  const router = useRouter();
  const { auth } = useAuth();
  const [cartId, setCartId] = useState<string | null>(null);
  const cartQuery = useCart(cartId || "");
  const { mutate: createCartMutate } = useCreateCartMutation(graphqlClient, {
    onSuccess: async (data, variables) => {
      await fetch(`/api/auth/cart/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.cartCreate?.cart?.id }),
      });
      setCartId(data.cartCreate?.cart?.id || null);
    },
  });
  const { mutate: addItemsToCartMutate } = useAddCartItemsMutation(graphqlClient, {
    onSuccess: (data) => {
      cartQuery.refetch();
    },
  });
  const { mutate: updateItemsToCartMutate } = useUpdateCartItemsMutation(graphqlClient, {
    onSuccess: (data) => {
      cartQuery.refetch();
    },
  });
  const { mutate: removeItemFromCartMutate } = useRemoveCartItemMutation(graphqlClient, {
    onSuccess: (data) => {
      cartQuery.refetch();
    },
  });

  useEffect(() => {
    if (!auth.user) {
      setCartId(null);
      return;
    }
    checkCartExist(auth.user);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  useEffect(() => {
    if (!auth.user) return;

    if (cartQuery.data && !cartQuery.data.cart) {
      createEmptyCart(auth.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user, cartQuery.data]);

  const createEmptyCart = useCallback(
    (user: User) => {
      createCartMutate({
        input: {
          buyerIdentity: {
            customerAccessToken: auth.token,
            deliveryAddressPreferences: [
              {
                deliveryAddress: {
                  country: "Malaysia",
                  firstName: user.firstName,
                  lastName: user.lastName,
                },
              },
            ],
          },
          lines: [],
        },
      });
    },
    [auth.token, createCartMutate]
  );

  const addProductToCart = useCallback(
    (item: CartLineAdd) => {
      if (!auth.user) {
        router.push("/login");
        return;
      }
      addItemsToCartMutate({ cartId: cartId!, lines: [item] });
    },
    [addItemsToCartMutate, auth.user, cartId]
  );

  const updateProductToCart = useCallback(
    (item: CartLineUpdate) => {
      if (!auth.user) {
        router.push("/login");
        return;
      }
      updateItemsToCartMutate({ cartId: cartId!, lines: [item] });
    },
    [auth.user, cartId, updateItemsToCartMutate]
  );

  const removeItemFromCart = useCallback(
    ({ merchandiseId }: CartLineRemove) => {
      if (!auth.user) {
        router.push("/login");
        return;
      }
      removeItemFromCartMutate({ cartId: cartId!, lineIds: [merchandiseId] });
    },
    [auth.user, removeItemFromCartMutate, cartId]
  );

  const checkCartExist = useCallback(
    async (user: User) => {
      const response = await fetch(`/api/auth/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await response.json()) as CartResponse;

      if (!data.cartId) {
        return createEmptyCart(user);
      }
      setCartId(data.cartId);
    },
    [createEmptyCart]
  );

  return (
    <ShopContext.Provider value={{ cartId, cartQuery, createEmptyCart, addProductToCart, updateProductToCart, removeItemFromCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);

export default ShopProvider;
