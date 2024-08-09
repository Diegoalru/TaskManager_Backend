import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:8000",
      "https://taskmanager.darssolutions.live",
      "http://taskmanager.darssolutions.live"
    ],
    credentials: true,
  })
);

app.use(
  morgan(
    ":remote-addr :method :url :status (:res[content-length] content-length) - :response-time ms"
  )
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

// Establecer ruta de error 404
app.use((req, res, next) => {
  res.status(404).json({
    message: "Invalid route",
  });
});

export default app;
