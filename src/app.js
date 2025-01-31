import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import authRoute from "./routes/auth.js";

const app = express();

app
  .use(express.urlencoded({ extended: true, limit: "16kb" }))
  .use(express.json({ limit: "16kb" }))
  .use(cookieParser())
  .use(cors({ credentials: true, origin: process.env.ORIGIN }))
  .use(express.static("public"))
  .use(morgan("dev"));

app.use("/api/v1", authRoute);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internet server error";
  res.status(status).json({ message });
});

export default app;
