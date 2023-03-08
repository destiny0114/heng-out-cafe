import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useIsMutating, useIsFetching } from "@tanstack/react-query";
import { LoadingOverlay } from "@components/LoadingOverlay";
import { useCreateCustomerAccessTokenMutation, useCreateCustomerMutation } from "@graphql/generated/graphql";
import { graphqlClient } from "@libs/api";
import { LoginFields, RegisterFields, Auth, UserResponse } from "@libs/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  auth: Auth;
  register: (fields: RegisterFields) => void;
  login: (fields: LoginFields) => void;
  logout: () => void;
  errorMessage: string | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState<Auth>({ user: null, token: null });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: createCustomerMutate } = useCreateCustomerMutation(graphqlClient, {
    onSuccess: (data, variables) => {
      if (data?.customerCreate?.customerUserErrors.length) {
        setErrorMessage(data.customerCreate.customerUserErrors[0].message);
        return;
      }
      createCustomerAccessTokenMutate({ input: { email: variables.input.email, password: variables.input.password } });
    },
  });
  const { mutate: createCustomerAccessTokenMutate } = useCreateCustomerAccessTokenMutation(graphqlClient, {
    onSuccess: async (data) => {
      console.log(data);

      if (data?.customerAccessTokenCreate?.customerUserErrors.length) {
        setErrorMessage(data.customerAccessTokenCreate.customerUserErrors[0].message);
        return;
      }
      const response = await fetch(`/api/auth/account/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: data.customerAccessTokenCreate?.customerAccessToken?.accessToken }),
      });
      if (!response.ok) return;

      setAuth((await response.json()) as UserResponse);
      router.push("/dashboard");
    },
  });

  const isMutating = useIsMutating();
  const isFetching = useIsFetching();

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setErrorMessage(null);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const register = useCallback(
    (fields: RegisterFields) => {
      createCustomerMutate({
        input: {
          firstName: fields.firstName,
          lastName: fields.lastName,
          email: fields.email,
          password: fields.password,
          acceptsMarketing: false,
        },
      });
    },
    [createCustomerMutate]
  );

  const login = useCallback(
    (fields: LoginFields) => {
      createCustomerAccessTokenMutate({
        input: {
          email: fields.email,
          password: fields.password,
        },
      });
    },
    [createCustomerAccessTokenMutate]
  );

  const logout = useCallback(async () => {
    await fetch(`/api/auth/account/logout`, {
      method: "POST",
    });

    setAuth({ user: null, token: null });
    router.push("/login");
  }, [router]);

  const checkUser = useCallback(async () => {
    const response = await fetch(`/api/auth/account/user`);

    if (!response.ok) return;

    setAuth((await response.json()) as UserResponse);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, register, login, logout, errorMessage }}>
      {(isMutating > 0 || isFetching > 0) && <LoadingOverlay />}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
