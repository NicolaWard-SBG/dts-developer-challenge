import { Request, Response } from "express";
import * as model from "../models/taskModel";

export function createTask(req: Request, res: Response): void {
  const { title, description, status, dueDate } = req.body;

  // Basic validation
  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  if (!status) {
    res.status(400).json({ error: "Status is required" });
    return;
  }

  if (
    status !== "pending" &&
    status !== "in-progress" &&
    status !== "completed"
  ) {
    res
      .status(400)
      .json({ error: "Status must be pending, in-progress, or completed" });
    return;
  }

  if (!dueDate) {
    res.status(400).json({ error: "Due date is required" });
    return;
  }

  const task = model.createTask({
    title: title,
    description: description,
    status: status,
    dueDate: dueDate,
  });

  res.status(201).json(task);
}

export function getAllTasks(req: Request, res: Response): void {
  const tasks = model.getAllTasks();
  res.status(200).json(tasks);
}

export function getTaskById(req: Request, res: Response): void {
  const id = req.params.id;
  const task = model.getTaskById(id);

  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.status(200).json(task);
}

export function updateTaskStatus(req: Request, res: Response): void {
  const id = req.params.id;
  const { status } = req.body;

  if (!status) {
    res.status(400).json({ error: "Status is required" });
    return;
  }

  if (
    status !== "pending" &&
    status !== "in-progress" &&
    status !== "completed"
  ) {
    res
      .status(400)
      .json({ error: "Status must be pending, in-progress, or completed" });
    return;
  }

  const updatedTask = model.updateTaskStatus(id, status);

  if (!updatedTask) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.status(200).json(updatedTask);
}

export function deleteTask(req: Request, res: Response): void {
  const id = req.params.id;
  const deleted = model.deleteTask(id);

  if (!deleted) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.status(204).send();
}
