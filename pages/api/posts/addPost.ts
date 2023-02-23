import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import client from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { title } = req.body as { title: string };
    const user = await prisma?.user.findUnique({
      where: { email: session.user?.email! },
    });
    if (title.length > 300) {
      res.status(403).json({
        error: "Title too long, keep it less than or equal to 300 characters",
      });
      return;
    }
    if (!title.length) {
      res.status(403).json({
        message: "Title cannot be empty",
        error: "Title cannot be empty",
      });
      return;
    }
    try {
      const post = await client.post.create({
        data: {
          title,
          userId: user?.id!,
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
