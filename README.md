# Task Management Application

A full-stack task management application built with React (TypeScript) frontend and Express.js backend with SQLite database.

## Features

- Create, read, update, and delete tasks
- Task status management (pending, in-progress, completed)
- Due date tracking
- Responsive web interface
- RESTful API
- SQLite database storage

## Way of Working

This project was developed following agile development practices and modern software engineering workflows:

### Project Management

- **Trello Board**: Work was organizsd using a Trello board with individual tickets for each feature
- **Board Link**: [DTS Developer Challenge Board](https://trello.com/invite/b/687d0f78573bce4ee6c3b640/ATTI9e80699fde0fedadaef1caff558c9c2e51AF80D9/dts-developer-challenge)
- **Task Breakdown**: The project was split into focused tickets including:
  - Backend API development
  - Frontend React application
  - CRUD operations
  - CSS styling and responsive design
  - Documentation(README)

### Code Quality & Review Process

- **GitHub Copilot**: Utilised built-in GitHub Copilot code review features for:
  - Code suggestions and improvements
  - Best practice recommendations
  - Security vulnerability detection
- **Pre-merge Reviews**: All code was reviewed using Copilot suggestions before merging
- **TypeScript**: Full type safety implementation to catch errors at compile time

### Testing Strategy

- **Unit Tests**: Comprehensive unit tests written for each service layer
- **Backend Testing**: Complete API endpoint testing using Jest and Supertest
- **Test Coverage**: All CRUD operations and edge cases covered

### Production-Ready Considerations

In a typical agile working environment, this code would undergo additional quality assurance:

- **QA Testing**: Dedicated QA team would perform:
  - Manual testing of all user journeys
  - Cross-browser compatibility testing
  - Mobile responsiveness validation
- **User Acceptance Testing**: Stakeholder review and approval
- **CI/CD Pipeline**: Automated deployment with additional integration tests

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
