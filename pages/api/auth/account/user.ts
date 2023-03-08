import { fetchCustomer } from "@hooks/useCustomer";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { User } from "@libs/types";

interface NextExtendedApiRequest extends NextApiRequest {
  body: {};
}

type Data = {
  user: User | undefined;
  token: string | undefined;
  message: string;
};

export default async function handler(req: NextExtendedApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      return res.status(403).json({ message: "Not Authorized", user: undefined, token: undefined });
    }

    const { access_token } = cookie.parse(req.headers.cookie);

    const user = await fetchCustomer({ accessToken: access_token });

    if (user) {
      return res.status(200).json({ user: user, token: access_token, message: "Authorized" });
    }

    return res.status(403).json({ user: user, message: "User Forbidden", token: undefined });
  }
  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({
    message: `Method ${req.method} is not supported.`,
    user: undefined,
    token: undefined,
  });
}
