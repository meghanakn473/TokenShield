# RBAC Authentication System

## Overview

This system implements secure authentication and role-based access control (RBAC) using **Node.js**, **Express**, **MongoDB**, and **JWT**. Users can log in, register, view protected resources, and be granted access based on roles (Admin, Moderator, User).

## Features

- **User Authentication** (JWT-based)
- **Role-Based Access Control (RBAC)**
- **Secure Password Storage** (bcrypt)
- **Logout Handling**
- **User Profiles**

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in to receive a JWT.
- `POST /api/auth/logout`: Log out and invalidate the current token.

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
