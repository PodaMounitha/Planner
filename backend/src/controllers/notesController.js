import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); 
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function createNote(req, res) {
  try {
    const note = new Note(req.body);
    await note.save();

    res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function updateNote(req, res) {
  try {
    const updatednote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatednote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(updatednote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletednote = await Note.findByIdAndDelete(req.params.id);

    if (!deletednote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(deletednote); 
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: error.message });
  }
}