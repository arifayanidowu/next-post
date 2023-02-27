import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const post = await client.post.findUnique({
        where: {
          id: req.query.slug as string,
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      });
      res.status(200).json(post);
    } catch (error) {
      const err = error as { message: string };
      res.status(403).json({
        error: "Unexpected error occurred while fetching post",
        message: err.message,
      });
    }
  }
}
