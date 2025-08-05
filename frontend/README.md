# Task Management Application

A full-stack task management application built with React (TypeScript) frontend and Express.js backend with SQLite database.

## Features

- Create, read, update, and delete tasks
- Task status management (pending, in-progress, completed)
- Due date tracking
- Responsive web interface
- RESTful API
- SQLite database storage

## Tech Stack

### Frontend

- React 18 with TypeScript
- Axios for HTTP requests
- CSS3 for styling
- Create React App for development setup

### Backend

- Express.js with TypeScript
- SQLite database with better-sqlite3
- CORS enabled for cross-origin requests
- Jest and Supertest for testing

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

### Configuration

#### Environment Variables

Create a .env file in the frontend directory for custom configuration:

```bash
# .env
REACT_APP_API_BASE=http://localhost:3001
```
