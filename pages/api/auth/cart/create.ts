import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

interface NextExtendedApiRequest extends NextApiRequest {
  body: {
    id: string;
  };
}

type Data = {
  cartId: string | null;
  error: string | undefined;
};

export default async function handler(req: NextExtendedApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const { id } = req.body;

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("cartId", id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      })
    );
    return res.status(200).json({
      cartId: id,
      error: undefined,
    });
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({
    error: `Method ${req.method} is not supported.`,
    cartId: null,
  });
}
