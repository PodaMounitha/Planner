import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";
import { fileURLToPath } from "url";

// Force restart nodemon
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from backend/.env when running locally; in Render, env vars should be set in the dashboard.
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
const PORT = process.env.PORT || 5001;

// repoRoot = <repo>/ (server is in <repo>/backend/src)
const repoRoot = path.resolve(__dirname, "..", "..");

console.log("Starting server with correct ENV variables loaded...");

app.use(express.json());

const corsOrigin = process.env.CORS_ORIGIN;
if (corsOrigin) {
  const allowedOrigins = corsOrigin
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: allowedOrigins,
    })
  );
} else if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req url is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

// ✅ FIXED PATH
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(repoRoot, "frontend", "dist");

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