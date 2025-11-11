import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("dating"); // 数据库名可自定义
    const collection = db.collection("notes");

    if (req.method === "GET") {
      const notes = await collection.find().toArray();
      res.status(200).json(notes);
    } else if (req.method === "POST") {
      const newNote = req.body;
      await collection.insertOne(newNote);
      res.status(200).json({ message: "Note added" });
    } else if (req.method === "PUT") {
      const { _id, ...rest } = req.body;
      await collection.updateOne({ _id }, { $set: rest });
      res.status(200).json({ message: "Note updated" });
    } else if (req.method === "DELETE") {
      const { _id } = req.query;
      await collection.deleteOne({ _id });
      res.status(200).json({ message: "Note deleted" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    await client.close();
  }
}
