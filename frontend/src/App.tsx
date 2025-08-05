import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Simple interface for a task
interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
}

function App() {
  // State to store all tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // State for the form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");

  // State for showing/hiding the form
  const [showForm, setShowForm] = useState(false);

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3001";

  // Get all tasks from the server
  const getTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE}/tasks`);
      setTasks(response.data);
    } catch (error) {
      alert("Error getting tasks. Make sure the server is running!");
    }
  };

  // Create a new task
  const createTask = async () => {
    if (!title || !dueDate) {
      alert("Title and due date are required!");
      return;
    }

    try {
      const newTask = {
        title: title,
        description: description,
        status: status,
        dueDate: dueDate,
      };

      await axios.post(`${API_BASE}/tasks`, newTask);

      // Clear the form
      setTitle("");
      setDescription("");
      setStatus("pending");
      setDueDate("");
      setShowForm(false);

      // Refresh the task list
      getTasks();
    } catch (error) {
      alert("Error creating task!");
    }
  };

  // Update task status
  const updateStatus = async (taskId: number, newStatus: string) => {
    try {
      await axios.patch(`${API_BASE}/tasks/${taskId}/status`, {
        status: newStatus,
      });
      getTasks(); // Refresh the list
    } catch (error) {
      alert("Error updating task!");
    }
  };

  // Delete a task
  const deleteTask = async (taskId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${API_BASE}/tasks/${taskId}`);
        getTasks(); // Refresh the list
      } catch (error) {
        alert("Error deleting task!");
      }
    }
  };

  // Load tasks when the page first loads
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="App">
      <h1>My Task List</h1>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Task"}
      </button>

      {/* Form to add new task */}
      {showForm && (
        <div className="form">
          <h3>Add New Task</h3>

          <div>
            <label htmlFor="task-title">Title:</label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label htmlFor="task-desc">Description:</label>
            <textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description (optional)"
            />
          </div>

          <div>
            <label htmlFor="task-status">Status:</label>
            <select
              id="task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-due">Due Date:</label>
            <input
              id="task-due"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <button onClick={createTask}>Create Task</button>
        </div>
      )}

      {/* List of tasks */}
      <div className="tasks">
        <h3>All Tasks ({tasks.length})</h3>

        {tasks.length === 0 ? (
          <p>No tasks yet. Create your first task!</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task">
              <h4>{task.title}</h4>
              {task.description && <p>{task.description}</p>}
              <p>
                <strong>Status:</strong> {task.status}
              </p>
              <p>
                <strong>Due:</strong> {task.dueDate}
              </p>

              <div className="task-buttons">
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
