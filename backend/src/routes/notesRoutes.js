import express from "express";
import rateLimiter from "../middleware/rateLimiter.js";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} from "../controllers/notesController.js";

const router = express.Router();

router.use(rateLimiter)

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;