// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from "next/types";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest) {
  const note_id = req.query.id;

  if (req.method === "PUT") {
    const { title, content } = req.body;

    try {
      await prisma.note
        .update({
          where: { id: String(note_id) },
          data: {
            title: title,
            content: content,
          },
        })
        .then((res) => () => console.log(res));
    } catch (error) {
      console.log("failure");
    }
  }
  if (req.method === "DELETE") {
    try {
      await prisma.note
        .delete({
          where: { id: String(note_id) },
        })
        .then((res) => () => console.log(res));
    } catch (error) {
      console.log("error");
    }
  }
}
