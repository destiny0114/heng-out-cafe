import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

interface NextExtendedApiRequest extends NextApiRequest {}

type Data = {
  cartId: string | undefined;
  message: string;
};

export default async function handler(req: NextExtendedApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      return res.status(403).json({ message: "Not Authorized", cartId: undefined });
    }

    const { cartId } = cookie.parse(req.headers.cookie);

    if (cartId) {
      return res.status(200).json({ cartId, message: "Authorized" });
    }

    return res.status(403).json({ cartId: undefined, message: "User Forbidden" });
  }
  res.setHeader("Allow", ["GET"]);
  res.status(405).json({
    message: `Method ${req.method} is not supported.`,
    cartId: undefined,
  });
}
