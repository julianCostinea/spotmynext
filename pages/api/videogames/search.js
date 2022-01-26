import { connectToDatabase } from "../../../lib/mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { db } = await connectToDatabase();
      const videoGamesCollection = db.collection("videogames");
      const result = await videoGamesCollection
        .find({ title: { $regex: new RegExp(req.query.searchId, 'i') } })
        .toArray();
      res.status(200).json({ message: "success", result: result });
    } catch (error) {
      res.status(error.code ?? 502).send({
        message: error.message ?? "Could not find any item",
      });
    }
  }
}

export default handler;