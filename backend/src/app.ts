import express from "express";
import cors from "cors";
import tasks from "./routes/tasks";

const app = express();

// Allow requests from React app (usually runs on port 3000)
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/tasks", tasks);

export default app;
