import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ IMPORTANT FIX
const __dirname = path.resolve("../");

console.log("Starting server with correct ENV variables loaded...");

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req url is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

// ✅ FIXED PATH
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "frontend", "dist");

  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
app.use(rateLimiter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});