import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { db } = await connectToDatabase();
      const videoGamesCollection = db.collection("videogames");
      const result = await videoGamesCollection.updateOne(
        { _id: ObjectId(req.body.parentId) },
        { $inc: {"recommendations.$[elem].0": 1} },
        {arrayFilters: [{"elem":{$in:[req.body.preparedVotedIds]}}]}
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