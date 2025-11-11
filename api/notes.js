import mongoose from "mongoose";

const uri = "mongodb+srv://sjq:050828@cluster0.rxvv6g7.mongodb.net/?appName=Cluster0";

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default async function handler(req, res) {
  await mongoose.connect(uri, { dbName: "sjqlove" });

  if (req.method === "GET") {
    const notes = await Note.find();
    return res.status(200).json(notes);
  }

  if (req.method === "POST") {
    const note = new Note(req.body);
    await note.save();
    return res.status(201).json(note);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
