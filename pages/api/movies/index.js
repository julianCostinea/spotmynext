import {connectToDatabase} from "../../../lib/mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const searchTerm = req.body.searchTerm;

    try {
      const { db } = await connectToDatabase();
      const videoGamesCollection = db.collection("movies");
      const result = await videoGamesCollection.find({title:'Goodfellas'}).toArray();
      res.status(200).json({ message: "success", result: result });
    } catch (error) {
      res.status(error.code ?? 502).send({
        message: error.message ?? "Could not find movie.",
      });
    }
  }
}

export default handler;
