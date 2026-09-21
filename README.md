# 🚀 Eterna Fullstack Task Manager

A full-stack task management application built as a portfolio project for **Eterna** — connecting skilled Indonesian talent with global opportunities.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)

---

## 📖 About The Project

This project demonstrates a complete **full-stack web application** with:
- **Secure JWT authentication** (register, login, protected routes).
- **CRUD operations** for project management.
- **RESTful API** built with Express + Prisma.
- **Modern React frontend** with TypeScript and Tailwind CSS.
- **PostgreSQL database** with Prisma migrations.

Built to showcase production-ready skills for a **Full Stack React Developer** role.

---

## ✨ Features

### 🔐 Authentication
- [x] User registration with bcrypt password hashing
- [x] Login with JWT token
- [x] Protected routes (auto-redirect if not authenticated)
- [x] Persistent session via localStorage

### 📋 Project Management
- [x] Create new projects
- [x] View all projects (user-specific)
- [x] Update project title & description
- [x] Delete projects
- [x] Responsive project cards

### 🎨 UI/UX
- [x] Modern design with Tailwind CSS v4
- [x] Loading states
- [x] Error handling with user-friendly messages
- [x] Responsive layout (mobile & desktop)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP client |
| **Tailwind CSS v4** | Styling |
| **Context API** | State management |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **TypeScript** | Type safety |
| **Prisma ORM** | Database toolkit |
| **PostgreSQL** | Relational database |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |

---

## 📁 Project Structure
```bash
eterna-fullstack-task-manager/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── contexts/ # React Context (Auth)
│ │ ├── pages/ # Page components
│ │ ├── services/ # API service (Axios)
│ │ └── models/ # TypeScript types
│ └── package.json
│
├── server/ # Express backend
│ ├── src/
│ │ ├── controllers/ # Route handlers
│ │ ├── middlewares/ # Auth middleware
│ │ ├── routes/ # API routes
│ │ └── utils/ # Prisma client
│ ├── prisma/
│ │ └── schema.prisma # Database schema
│ └── package.json
│
└── README.md
```


---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **PostgreSQL** v14+
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/mimomimikmik/eterna-fullstack-task-manager.git
cd eterna-fullstack-task-manager
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a .env file in the server folder:
```bash
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/eterna_db?schema=public"
PORT=5000
JWT_SECRET=your_super_secret_key_here
```

Run database migration:
```bash
npx prisma migrate dev --name init
```

Start the backend:
```bash
npm run dev
```

Backend will run at http://localhost:5000.

### 2. Setup Frontend
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
Frontend will run at http://localhost:5173.

## 📡 API Endpoints
### 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|:---:|---|---|:---:|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login user | ❌ |
| `GET` | `/api/auth/me` | Get current user | ✅ |

### 📋 Projects

| Method | Endpoint | Description | Auth Required |
|:---:|---|---|:---:|
| `GET` | `/api/projects` | Get all user projects | ✅ |
| `POST` | `/api/projects` | Create new project | ✅ |
| `GET` | `/api/projects/:id` | Get project by ID | ✅ |
| `PUT` | `/api/projects/:id` | Update project | ✅ |
| `DELETE` | `/api/projects/:id` | Delete project | ✅ |

**Auth Header Format:**
Authorization: Bearer <your_jwt_token>

## 📸 Screenshots
### 🔐 Login Page
![Login Page](./screenshots/login-page.png)

### 📝 Register Page
![Register Page](./screenshots/register-page.png)

### 📊 Dashboard
![Dashboard](./screenshots/dashboard.png)

### ➕ Create Project
![Create Project](./screenshots/create-project.png)

## 🌐 Live Demo

🔗 **Frontend:** [https://eterna-fullstack-task-manager-green.vercel.app](https://eterna-fullstack-task-manager-green.vercel.app)
🔗 **Backend API:** [https://eterna-fullstack-task-manager-production.up.railway.app](https://eterna-fullstack-task-manager-production.up.railway.app)

### 🎮 Demo Account
Use the following account to try the application without needing to register:

| Field | Value |
|---|---|
| **Email** | `demo@eterna.com` |
| **Password** | `demo123456` |

> **Note:** You can also register a new account yourself to try out the registration feature.

## 👨‍💻 Author
Helmi Ananda Putra

GitHub: @mimomimikmik

Email: npando6@gmail.com

LinkedIn: www.linkedin.com/in/helmi-ananda-putra-51284835b

## 📄 License
This project is licensed under the MIT License.

## 🙏 Acknowledgments
Built as a portfolio project for Eterna Indonesia.

Inspired by modern full-stack development best practices.

⭐ If you like this project, please give it a star! ⭐