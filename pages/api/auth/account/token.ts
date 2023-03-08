import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { fetchCustomer } from "@hooks/useCustomer";
import { User } from "@libs/types";

interface NextExtendedApiRequest extends NextApiRequest {
  body: {
    access_token: string;
  };
}

type Data = {
  user: User | undefined;
  token: string | undefined;
  message: string;
};

export default async function handler(req: NextExtendedApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const { access_token } = req.body;
    const user = await fetchCustomer({ accessToken: access_token });

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      })
    );
    return res.status(200).json({
      user,
      token: access_token,
      message: "Token generated successful.",
    });
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({
    user: undefined,
    message: `Method ${req.method} is not supported.`,
    token: undefined,
  });
}
