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
  const info = stmt.run(
    task.title,
    task.description || null,
    task.status,
    task.dueDate
  );
  return {
    id: Number(info.lastInsertRowid),
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
  };
}

export function getAllTasks(): Task[] {
  const stmt = db.prepare(`SELECT * FROM tasks ORDER BY dueDate ASC`);
  return stmt.all() as Task[];
}

export function getTaskById(id: string): Task | undefined {
  const stmt = db.prepare(`SELECT * FROM tasks WHERE id = ?`);
  return stmt.get(id) as Task | undefined;
}

export function updateTaskStatus(id: string, status: string): Task | undefined {
  const stmt = db.prepare(`UPDATE tasks SET status = ? WHERE id = ?`);
  const info = stmt.run(status, id);

  if (info.changes === 0) {
    return undefined;
  }

  return getTaskById(id);
}

export function deleteTask(id: string): boolean {
  const stmt = db.prepare(`DELETE FROM tasks WHERE id = ?`);
  const info = stmt.run(id);
  return info.changes > 0;
}
