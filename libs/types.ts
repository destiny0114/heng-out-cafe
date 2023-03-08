export interface Product {
  title: string;
  description: string;
  variants: {
    id: string;
    price: {
      currencyCode: string;
      amount: string;
    };
  };
  image: {
    id?: string | null | undefined;
    url: string;
    altText?: string | null | undefined;
  };
  tags: string[];
}

export interface CartLineAdd {
  quantity: number;
  merchandiseId: string;
}

export interface CartLineUpdate {
  id: string;
  quantity: number;
}

export interface CartLineRemove {
  merchandiseId: string;
}

export interface CartResponse {
  cartId: string;
}

export interface RegisterFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginFields {
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserResponse {
  user: User;
  token: string;
  message: string;
}

export interface Auth {
  user: User | null;
  token: string | null;
}
