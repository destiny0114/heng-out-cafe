import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { User } from "@libs/types";

interface NextExtendedApiRequest extends NextApiRequest {}

type Data = {
  user: User | undefined;
  message: string;
};

export default async function handler(req: NextExtendedApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: Number(new Date(0)),
        sameSite: "strict",
        path: "/",
      }),
      cookie.serialize("cartId", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: Number(new Date(0)),
        sameSite: "strict",
        path: "/",
      }),
    ]);
    return res.status(200).json({
      user: undefined,
      message: "Token destroyed.",
    });
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({
    message: `Method ${req.method} is not supported.`,
    user: undefined,
  });
}
