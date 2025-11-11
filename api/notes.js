import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("love_db");
    const collection = db.collection("notes");

    if (req.method === "GET") {
      const notes = await collection.find({}).toArray();
      res.status(200).json(notes);
    } else if (req.method === "POST") {
      const body = JSON.parse(req.body);
      const result = await collection.insertOne(body);
      res.status(200).json({ insertedId: result.insertedId });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}
