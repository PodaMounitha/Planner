import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
console.log("Starting server with correct ENV variables loaded...");
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req url is ${req.url}`);
  next();
});


app.use("/api/notes", notesRoutes);
app.use(rateLimiter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
