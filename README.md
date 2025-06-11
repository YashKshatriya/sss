# FiberCraft

A full-stack MERN application for managing and showcasing fiber crafts.

## Project Structure

```
fibercraft/
├── backend/         # Express.js backend
│   ├── controllers/ # Route controllers
│   ├── models/      # Mongoose models
│   ├── routes/      # API routes
│   └── server.js    # Main server file
└── frontend/        # React frontend
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fibercraft
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=http://localhost:5173
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login existing user

## Technologies Used

- Frontend:
  - React
  - Vite
  - Tailwind CSS
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT Authentication
  - bcryptjs 