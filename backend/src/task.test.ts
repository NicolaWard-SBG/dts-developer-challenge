import request from "supertest";
import app from "./app";
import db from "./database/databaseSetup";
import { beforeEach, describe, test, expect, afterAll } from "@jest/globals";

// Clear the database before each test
beforeEach(() => {
  db.exec(`DELETE FROM tasks`);
});

// Close the database connection after all of the tests
afterAll(() => {
  db.close();
});

describe("Task API Basic Tests", () => {
  test("should create a task", async () => {
    const taskData = {
      title: "Test Task",
      status: "pending",
      dueDate: "2025-07-20",
    };

    const response = await request(app)
      .post("/tasks")
      .send(taskData)
      .expect(201);

    expect(response.body.title).toBe("Test Task");
    expect(response.body.status).toBe("pending");
    expect(response.body.id).toBeDefined();
  });

  test("should get all tasks", async () => {
    const response = await request(app).get("/tasks").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test("should get task by ID", async () => {
    // Create a task
    const taskData = {
      title: "Test Task",
      status: "pending",
      dueDate: "2025-07-20",
    };

    const createResponse = await request(app)
      .post("/tasks")
      .send(taskData)
      .expect(201);

    const taskId = createResponse.body.id;

    const response = await request(app).get(`/tasks/${taskId}`).expect(200);

    expect(response.body.id).toBe(taskId);
    expect(response.body.title).toBe("Test Task");
  });

  test("should update task status", async () => {
    // Create a task
    const taskData = {
      title: "Test Task",
      status: "pending",
      dueDate: "2025-07-20",
    };

    const createResponse = await request(app)
      .post("/tasks")
      .send(taskData)
      .expect(201);

    const taskId = createResponse.body.id;

    // Then update it
    const response = await request(app)
      .patch(`/tasks/${taskId}/status`)
      .send({ status: "completed" })
      .expect(200);

    expect(response.body.status).toBe("completed");
  });

  test("should delete task", async () => {
    // Create a task
    const taskData = {
      title: "Test Task",
      status: "pending",
      dueDate: "2025-07-20",
    };

    const createResponse = await request(app)
      .post("/tasks")
      .send(taskData)
      .expect(201);

    const taskId = createResponse.body.id;

    // Then delete it
    await request(app).delete(`/tasks/${taskId}`).expect(204);
  });

  test("should reject task without title", async () => {
    const taskData = {
      status: "pending",
      dueDate: "2025-07-20",
    };

    await request(app).post("/tasks").send(taskData).expect(400);
  });

  test("should reject invalid status", async () => {
    const taskData = {
      title: "Test Task",
      status: "invalid",
      dueDate: "2025-07-20",
    };

    await request(app).post("/tasks").send(taskData).expect(400);
  });
});
