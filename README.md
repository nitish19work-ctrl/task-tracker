# MERN Task Tracker

A full stack task tracker built using the MERN stack.

## Features

- User Authentication
- Create / Read / Update / Delete Tasks
- Dashboard Analytics
- Pie Charts, Bar Charts, Line Charts
- Download Task Report (Excel)

## Task Fields

- Title
- Description
- Status (Pending, In Progress, Completed)
- Priority (Low, Medium, High)
- Due Date

## Tech Stack

- React
- Node.js
- Express.js
- MongoDB
- Axios
- Recharts
- Tailwind CSS
- React Hot Toast

## Installation

Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend/expense-tracker
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/task/add | Add a task |
| GET | /api/v1/task/get | Get all tasks |
| PUT | /api/v1/task/:id | Update a task |
| DELETE | /api/v1/task/:id | Delete a task |
| GET | /api/v1/task/downloadexcel | Download tasks as Excel |
| GET | /api/v1/dashboard | Get dashboard data |
