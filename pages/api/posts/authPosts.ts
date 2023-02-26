import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import client from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    try {
      const post = await client.user.findUnique({
        where: {
          email: session.user?.email!,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
              user: true,
            },
          },
        },
      });
      res.status(200).json(post);
    } catch (error) {
      const err = error as { message: string };
      res.status(403).json({
        error: "Unexpected error occurred while creating post",
        message: err.message,
      });
    }
  }
}
