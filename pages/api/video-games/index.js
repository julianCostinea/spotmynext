import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const searchTerm = req.body.searchTerm;

    try {
      const client = await MongoClient.connect("mongodb+srv://sldsonny:<password>@cluster0.gnpji.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
      const db = client.db();
      const videoGamesCollection = db.collection("videogames");
      const result = await videoGamesCollection.findOne(searchTerm);
      res.status(200).json({ message: "success", result: result });
    } catch (error) {
      res.status(error.code ?? 502).send({
        message: error.message ?? "Could not find videogame.",
      });
    }
  }
}

export default handler;
