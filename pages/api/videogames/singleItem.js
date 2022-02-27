import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { db } = await connectToDatabase();
      const videoGamesCollection = db.collection("videogames");
      const result = await videoGamesCollection.updateOne(
        { _id: ObjectId(req.body.parentId) },
        { $inc: { "recommendations.$[elem].votes": 1 } },
        {
          arrayFilters: [
            {
              "elem.id": {
                $in: req.body.votedIds,
              },
            },
          ],
        }
      );
      res.status(200).json({ message: "success", result: result });
    } catch (error) {
      res.status(error.code ?? 500).send({
        message: error.message ?? "Something went wrong.",
      });
    }
  }
}

export default handler;
