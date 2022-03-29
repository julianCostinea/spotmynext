import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { db } = await connectToDatabase();
      const moviesCollection = db.collection("movies");
      let alreadyPresentIds = [];
      const votedIds = [];

      const fetchPresentIds = await moviesCollection
        .find({ _id: ObjectId(req.body.parentId) })
        .project({ recommendations: 1 })
        .toArray();
      fetchPresentIds[0].recommendations.forEach((element) => {
        alreadyPresentIds.push(element.id);
      });
      for (const element of req.body.votedItems){
        if (!alreadyPresentIds.includes(element.id)) {
          const newItem = {
            id: element.id,
            votes: 1,
            title: element.title,
            photo: element.photo
          }
          await moviesCollection.updateOne({ _id: ObjectId(req.body.parentId) }, { $push: {recommendations: newItem} })
        } else{
          votedIds.push(element.id);
        }
      }

      const result = await moviesCollection.updateOne(
        { _id: ObjectId(req.body.parentId) },
        { $inc: { "recommendations.$[elem].votes": 1 } },
        {
          arrayFilters: [
            {
              "elem.id": {
                $in: votedIds,
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
