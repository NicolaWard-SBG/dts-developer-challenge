import express from "express";
import * as controller from "../controllers/taskController";

const router = express.Router();

router.post("/", controller.createTask);
router.get("/", controller.getAllTasks);
router.get("/:id", controller.getTaskById);
router.patch("/:id/status", controller.updateTaskStatus);
router.delete("/:id", controller.deleteTask);

export default router;
