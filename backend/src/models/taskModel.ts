import db from "../database/databaseSetup";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
}

export function createTask(task: {
  title: string;
  description?: string;
  status: string;
  dueDate: string;
}): Task {
  const stmt = db.prepare(
    `INSERT INTO tasks (title, description, status, dueDate) VALUES (?, ?, ?, ?)`
  );
  const result = stmt.run(
    task.title,
    task.description,
    task.status,
    task.dueDate
  );

  const newTask: Task = {
    id: Number(result.lastInsertRowid),
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
  };

  return newTask;
}

export function getAllTasks(): Task[] {
  const stmt = db.prepare(`SELECT * FROM tasks`);
  const tasks = stmt.all() as Task[];
  return tasks;
}

export function getTaskById(id: string): Task | undefined {
  const stmt = db.prepare(`SELECT * FROM tasks WHERE id = ?`);
  const task = stmt.get(id) as Task | undefined;
  return task;
}

export function updateTaskStatus(id: string, status: string): Task | undefined {
  const stmt = db.prepare(`UPDATE tasks SET status = ? WHERE id = ?`);
  const result = stmt.run(status, id);

  if (result.changes === 0) {
    return undefined;
  }

  const updatedTask = getTaskById(id);
  return updatedTask;
}

export function deleteTask(id: string): boolean {
  const stmt = db.prepare(`DELETE FROM tasks WHERE id = ?`);
  const result = stmt.run(id);
  return result.changes > 0;
}
