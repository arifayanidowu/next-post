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
    const { id, message } = req.body as { id: string; message: string };
    const user = await prisma?.user.findUnique({
      where: { email: session.user?.email! },
    });

    if (!message.length) {
      res.status(403).json({
        error: "Comment cannot be empty",
      });
      return;
    }

    if (message.length > 300) {
      res.status(403).json({
        error: "Comment too long, keep it less than or equal to 300 characters",
      });
      return;
    }
    try {
      const comment = await client.comment.create({
        data: {
          message,
          postId: id,
          userId: user?.id!,
        },
      });
      res.status(200).json(comment);
    } catch (error) {
      const err = error as { message: string };
      res.status(403).json({
        error: "Unexpected error occurred while creating comment",
        message: err.message,
      });
    }
  }
}
