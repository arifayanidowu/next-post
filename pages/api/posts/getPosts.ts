import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const posts = await client.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(posts);
    } catch (error) {
      const err = error as { message: string };
      res.status(403).json({
        error: "Unexpected error occurred while fetching posts",
        message: err.message,
      });
    }
  }
}
