# Task Manager (Next.js + Express.js, In-Memory)

👩‍💻 **Author:** Arti Rana  
🏫 **Institution:** Chandigarh University  
🆔 **UID:** 23bda70082  
📌 **Project Type:** Internship Project

---

## 📖 About the Project

This is a **Task Manager Web Application** built using **Next.js (frontend)** and **Express.js (backend)**.

- The application allows users to:

  - ➕ Add new tasks
  - ✅ Mark tasks as complete / undo
  - ❌ Delete tasks

- All tasks are stored in an **in-memory array**.  
  ⚠️ This means the data **resets automatically whenever the server restarts**, since there is no database used in this project.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (React framework)
- **Backend:** Express.js with CORS support
- **Storage:** In-memory JavaScript array

---

## 🚀 How to Run the Project

```bash
cd next-express-inmemory-tasks
npm install
npm run dev
```

- Express runs on **http://localhost:4000**
- Next.js runs on **http://localhost:3000**

## Folder Structure

```
next-express-inmemory-tasks/
├── client/   # Next.js app
└── server/   # Express.js API
```

## API Endpoints

- `GET    /tasks` → list tasks
- `POST   /tasks` → create task ({ title })
- `PATCH  /tasks/:id` → toggle complete
- `DELETE /tasks/:id` → delete task

---

> Note: Because storage is in-memory, tasks will disappear when you restart the server.
