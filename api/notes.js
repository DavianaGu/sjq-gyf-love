import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

let conn = null;

async function connectDB() {
  if (conn) return conn;
  conn = await mongoose.connect(uri, { dbName: "love" });
  return conn;
}

const noteSchema = new mongoose.Schema({
  name: String,
  content: String,
  date: { type: Date, default: Date.now }
});

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const notes = await Note.find();
    return res.status(200).json(notes);
  }

  if (req.method === "POST") {
    const note = await Note.create(req.body);
    return res.status(201).json(note);
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
