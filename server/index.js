import express from "express";
import "./loadEnv.js";
import cors from "cors";
import "express-async-errors";
import user from "./routes/user.js";
import weather from "./routes/weather.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /api/v1 routes
app.use("/api/v1/user", user);
app.use("/api/v1/weather", weather);
// Global error handling
app.use((err, _req, res, _next) => {
  res.status(500).send("Uh oh! An unexpected error occured. " + err);
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

export default app;
