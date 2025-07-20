import express from "express";
import tasks from "./routes/tasks";

const app = express();
app.use(express.json());
app.use("/tasks", tasks);

export default app;
