import { Request, Response } from "express";
import * as model from "../models/taskModel";

// Valid status values
const VALID_STATUSES = ["pending", "in-progress", "completed"];

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

export function createTask(req: Request, res: Response): void {
  const { title, description, status, dueDate } = req.body;

  // Validation
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    res
      .status(400)
      .json({ error: "Title is required and must be a non-empty string" });
    return;
  }

  if (
    !status ||
    typeof status !== "string" ||
    !VALID_STATUSES.includes(status)
  ) {
    res.status(400).json({
      error: `Status is required and must be one of: ${VALID_STATUSES.join(
        ", "
      )}`,
    });
    return;
  }

  if (!dueDate || typeof dueDate !== "string" || !isValidDate(dueDate)) {
    res
      .status(400)
      .json({ error: "Due date is required and must be a valid date" });
    return;
  }

  if (description && typeof description !== "string") {
    res.status(400).json({ error: "Description must be a string" });
    return;
  }

  try {
    const task = model.createTask({
      title: title.trim(),
      description: description?.trim() || undefined,
      status,
      dueDate,
    });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
}

export function getAllTasks(req: Request, res: Response): void {
  try {
    const tasks = model.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

export function getTaskById(req: Request, res: Response): void {
  const { id } = req.params;

  // Validate ID is numeric
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ error: "Task ID must be a positive integer" });
    return;
  }

  try {
    const task = model.getTaskById(id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
}

export function updateTaskStatus(req: Request, res: Response): void {
  const { id } = req.params;
  const { status } = req.body;

  // Validate ID
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ error: "Task ID must be a positive integer" });
    return;
  }

  // Validate status
  if (
    !status ||
    typeof status !== "string" ||
    !VALID_STATUSES.includes(status)
  ) {
    res.status(400).json({
      error: `Status is required and must be one of: ${VALID_STATUSES.join(
        ", "
      )}`,
    });
    return;
  }

  try {
    const updatedTask = model.updateTaskStatus(id, status);
    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
}

export function deleteTask(req: Request, res: Response): void {
  const { id } = req.params;

  try {
    const deleted = model.deleteTask(id);
    if (!deleted) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
}
