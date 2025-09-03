import express from "express";
import riddleRoutes from "./routes/riddleRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4546;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/riddles", riddleRoutes);
app.use("/api/players", playerRoutes);

app.get("/api/status", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date(),
    environment: "development",
    apiVersion: "1.0.0",
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong!",
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`Status: http://localhost:${PORT}/api/status`);
});

export default app;
