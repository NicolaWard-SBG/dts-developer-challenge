import Database, { type Database as DatabaseType } from "better-sqlite3";

const db: DatabaseType = new Database("tasks.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL,
    dueDate TEXT NOT NULL
  );
`);

export default db;
