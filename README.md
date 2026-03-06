# User Management Backend

This is the backend API for the User Management System built with **Node.js and Express**.  
It handles authentication, user profile management, and image upload.

---

## Live API

https://user-management-api-mace.onrender.com

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Supabase
- Multer
- Bcrypt
- CORS

---

## Features

- User Registration API
- Login Authentication
- Password Hashing using Bcrypt
- Profile Fetch API
- Update User Profile
- Upload Profile Image
- PostgreSQL Database

---


## Project Structure

```
backend
│
├── controllers
│   └── userController.js
│
├── routes
│   └── userRoutes.js
│
├── db
│   └── db.js
│
├── middleware
│   └── upload.js
│
└── server.js
```
## API Endpoints

POST /api/register  
POST /api/login  
GET /api/profile/:email  
PUT /api/profile/:id  
PUT /api/profile/:id/image

## Deployment

Backend is deployed using **Render**.

---

## Author

Ragul R  
GitHub: https://github.com/ragul-05-07-2004