# FastAPI + PostgreSQL Docker App

A full-stack web application built with **FastAPI**, **PostgreSQL**, **NGINX**, and **Docker Compose**, including a simple frontend and REST API.

The app allows users to:
- Add items
- View items
- Edit items
- Delete items

All data is stored in a PostgreSQL database.

---

## 🏗️ Architecture

Browser
|
v
NGINX (Reverse Proxy + Frontend)
|
v
FastAPI (Gunicorn + Uvicorn)
|
v
PostgreSQL

---

## 🚀 Tech Stack

- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL
- **Frontend:** HTML + CSS + JavaScript
- **Reverse Proxy:** NGINX
- **Containerization:** Docker & Docker Compose
- **ORM / DB Access:** SQLAlchemy (Core)
- **Process Manager:** Gunicorn

---

## 📁 Project Structure

.
├── app/
│ ├── main.py
│ └── database.py
├── frontend/
│ └── index.html
├── nginx.conf
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
---

## ⚙️ Setup & Run

### 1️⃣ Prerequisites
Make sure you have:
- Docker
- Docker Compose

---

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/Maged-Elshaarawy/my-fastapi-app.git
cd my-fastapi-app
3️⃣ Build & Start the App
docker compose up --build
```
4️⃣ Access the Application

Frontend:

http://localhost


or

http://<VM-IP>


Database health check:
```
/db-check
```
🗄️ Database Setup (First Time Only)

Enter PostgreSQL container:
```bash
docker exec -it project-db-1 psql -U user -d mydb
```

Create the table:
```bash
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
```

Verify:
```bash
\dt
SELECT * FROM items;
```
🔌 API Endpoints
Get all items
```bash
GET /api/items
```
Create item
```bash
POST /api/items?name=ItemName
```
Update item
```bash
PUT /api/items/{id}?name=NewName
```
Delete item
```bash
DELETE /api/items/{id}
```
🖥️ Adminer (Optional – DB UI)

If enabled in docker-compose.yml:

URL:

http://localhost:8090


Credentials:

System: PostgreSQL

Server: db

Username: user

Password: pass

Database: mydb

🔐 Security Notes

The frontend never accesses the database directly

All DB access goes through FastAPI

Credentials should be moved to environment variables for production

Do not expose PostgreSQL to the public internet

📦 Production Notes

For production:

Use HTTPS (Let’s Encrypt)

Use a VPS or Cloudflare Tunnel

Add proper logging & monitoring

Use Alembic for migrations

🧑‍💻 Author

Maged Elshaarawy

📜 License

This project is licensed for learning and demonstration purposes.
