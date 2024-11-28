# RBAC Authentication System

## Overview

This system implements secure authentication and role-based access control (RBAC) using **Node.js**, **Express**, **MongoDB**, and **JWT**. Users can log in, register, view protected resources, and be granted access based on roles (Admin, Moderator, User).

## Features

- **User Authentication** (JWT-based)
- **Role-Based Access Control (RBAC)**
- **Secure Password Storage** (bcrypt)
- **Logout Handling**
- **User Profiles**

### Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for building the API and handling HTTP requests.
- **MongoDB**: NoSQL database used for data storage.
- **JWT (JSON Web Tokens)**: Used for secure user authentication and authorization.
- **bcrypt**: A library used for hashing passwords securely.

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in to receive a JWT.
- `POST /api/auth/logout`: Log out and invalidate the current token.

### Usage

- **Register a User**:  
  Send a POST request to `/api/auth/register` with a JSON payload containing `username`, `email`, `password`, and `role`.

  Example:

  ```json
  {
    "username": "user1",
    "email": "user1@example.com",
    "password": "password",
    "role": "User"
  }
  ```

- **Login**:
  Send a POST request to /api/auth/login with username and password to receive a JWT.
  Example:
  ```json
  {
    "username": "user1",
    "password": "password"
  }
  ```
- **Access Protected Routes**:
  Use the JWT token in the Authorization header as Bearer <token> to access protected routes like /api/auth/profile, /api/auth/admin, or /api/auth/moderator.
  Authorization: Bearer <your_jwt_token>

  ```

  ```

### Protected Routes

- `GET /api/auth/profile`: Get the logged-in user's profile.
- `GET /api/auth/admin`: Access Admin-only content (Admin role required).
- `GET /api/auth/moderator`: Access Moderator-only content.

## Setup

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd rbac-auth-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory and add your environment variables:
   ```bash
   JWT_SECRET=your_secret_key
   MONGO_URI=your_mongo_connection_string
   ```
4. Start the application:
   ```bash
   npm start
   ```

The server will be running on http://localhost:5000
