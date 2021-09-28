import {MongoClient} from 'mongodb';

async function handler (req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'MongoURI'
    );
    const db = client.db();
    const videoGamesCollection = db.collection('videogames');
    const result = await videoGamesCollection.insertOne(data);
    console.log(result);
    res.status(201).json({message: 'Video game inserted'});
  }
}

export default handler;
