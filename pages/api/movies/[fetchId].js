import { connectToDatabase } from "../../../lib/mongodb";
import {ObjectId} from "mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { db } = await connectToDatabase();
      const moviesCollection = db.collection("movies");
      const result = await moviesCollection
        .findOne({ _id: ObjectId(req.query.fetchId) })
      res.status(200).json({ message: "success", result: result });
    } catch (error) {
      res.status(error.code ?? 502).send({
        message: error.message ?? "Something went wrong.",
      });
    }
  }
}

export default handler;
