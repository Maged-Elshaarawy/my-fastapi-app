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

```
.
├── app/
│   ├── main.py                 # FastAPI application & endpoints
│   ├── database.py             # Database configuration
│   └── schemas.py              # Pydantic models
├── frontend/
│   ├── index.html              # Main frontend page
│   ├── css/
│   │   └── style.css           # Styling (light & dark mode)
│   └── js/
│       └── app.js              # JavaScript logic
├── Dockerfile                  # Python service configuration
├── docker-compose.yml          # Multi-container orchestration
├── nginx.conf                  # NGINX reverse proxy config
├── init.sql                    # Database initialization script
├── db_backup.sql               # Database backup (auto-restored)
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

---

## ⚙️ Setup & Run

### 1️⃣ Prerequisites

Make sure you have:

- Docker
- Docker Compose

---

### 2️⃣ Build & Start the App

```bash
docker compose up -d
```

---

### 3️⃣ Access the Application

**Frontend:**

```
http://localhost
```

**Adminer (Database UI):**

```
http://localhost:8090
```

---

## 🗄️ Database Setup

The database is **automatically initialized** on first startup:

✅ The `items` table is created automatically by [init.sql](init.sql)  
✅ Data persists in the `db_data` volume  
✅ Previous data is restored from [db_backup.sql](db_backup.sql) on restart

**No manual setup needed!**

---

### Verify Database (Optional)

Enter PostgreSQL container:

```bash
docker exec -it project-db-1 psql -U user -d mydb
```

Check the items table:

```sql
\dt
SELECT * FROM items;
```

## 🔌 API Endpoints

### Get all items

```bash
GET /api/items
```

### Create item

```bash
POST /api/items
Content-Type: application/json

{
  "name": "Item Name",
  "description": "Optional description"
}
```

### Update item

```bash
PUT /api/items/{id}
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

### Delete item

```bash
DELETE /api/items/{id}
```

## 🖥️ Adminer (Database UI)

**URL:** http://localhost:8090

**Credentials:**

- **System:** PostgreSQL
- **Server:** db
- **Username:** user
- **Password:** pass
- **Database:** mydb

---

## 🔐 Security Notes

- The frontend never accesses the database directly
- All database access goes through the FastAPI backend
- Credentials should be moved to environment variables in production
- The database is not exposed to the public internet

---

## 🐳 Docker Compose Services

| Service            | Port | Purpose                         |
| ------------------ | ---- | ------------------------------- |
| **nginx**          | 80   | Reverse proxy & static frontend |
| **python-service** | 8000 | FastAPI backend (internal)      |
| **db**             | 5432 | PostgreSQL database (internal)  |
| **adminer**        | 8090 | Database UI                     |
| **cloudflared**    | —    | Cloudflare tunnel (optional)    |

## 📦 Useful Commands

### View logs

```bash
docker compose logs -f
```

### Stop containers

```bash
docker compose down
```

### Restart containers

```bash
docker compose up -d
```

### Access database shell

```bash
docker exec -it project-db-1 psql -U user -d mydb
```

### Backup database

```bash
docker exec project-db-1 pg_dump -U user -d mydb > db_backup.sql
```

---

## 📝 Production Notes

For production deployment:

- Use HTTPS with Let's Encrypt
- Move credentials to environment variables (`.env` file)
- Use a proper reverse proxy (Cloudflare, AWS, etc.)
- Add proper logging and monitoring
- Use Alembic for database migrations
- Enable proper authentication/authorization

---

## 🧑‍💻 Author

**Maged Elshaarawy**

---

## 📜 License

This project is licensed for learning and demonstration purposes.
