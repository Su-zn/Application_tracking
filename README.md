# Application Tracker

Track your job applications with ease. A full-stack web app to manage, search, and filter applications by status — built with React, Express, and PostgreSQL.

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 19, Vite 8, Tailwind CSS 4        |
| Backend    | Express 5, TypeScript 6                 |
| Database   | PostgreSQL 16 via Prisma 7 ORM          |
| Validation | Zod 4                                   |
| Container  | Docker, Docker Compose                  |

## Prerequisites

- **Node.js** >= 22
- **npm** >= 10
- **PostgreSQL** >= 16 (if running without Docker)
- **Docker** & **Docker Compose** (optional, for containerized setup)

## Environment Variables

Create a `Backend/.env` file (see [`.env.example`](Backend/.env.example)):

```env
PORT=3000
DATABASE_URL="postgresql://postgres:admin@localhost:5432/Tracking_ApplicationStatus?schema=public"
CORS_ORIGIN="http://localhost:5173"
```

And a `frontend/.env` file:

```env
VITE_API_URL=http://localhost:3000
```

### Variable Reference

| Variable         | Required | Default                  | Description                     |
|------------------|----------|--------------------------|---------------------------------|
| `PORT`           | No       | `3000`                   | Backend server port             |
| `DATABASE_URL`   | Yes      | —                        | PostgreSQL connection string    |
| `CORS_ORIGIN`    | No       | `http://localhost:5173`  | Allowed CORS origin             |
| `VITE_API_URL`   | No       | `http://localhost:3000`  | API base URL (frontend)         |

## Quick Start (Docker)

```bash
docker compose up --build
```

- **Frontend:** http://localhost:5173
- **Backend:**  http://localhost:3000
- **Database:** `localhost:5433` (maps to container port 5432)

## Manual Setup

### 1. Clone and install

```bash
git clone https://github.com/Su-zn/Application_tracking.git
cd Application_tracking

# Backend
cd Backend
npm install
npx prisma generate
npx prisma db push

# Frontend
cd ../frontend
npm install
```

### 2. Start in development mode

```bash
# Terminal 1 — Backend
cd Backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

### 3. Open

Frontend at **http://localhost:5173**, backend at **http://localhost:3000**.

## Available Scripts

### Backend

| Script           | Description                          |
|------------------|--------------------------------------|
| `npm run dev`    | Start dev server with hot-reload     |
| `npm run build`  | Compile TypeScript to JavaScript     |
| `npm run db:migrate` | Run Prisma migrations            |
| `npm run db:push` | Push schema to database              |
| `npm run db:studio` | Open Prisma Studio GUI            |

### Frontend

| Script            | Description                         |
|-------------------|-------------------------------------|
| `npm run dev`     | Start Vite dev server               |
| `npm run build`   | Production build                    |
| `npm run lint`    | Lint source files                   |
| `npm run preview` | Preview production build locally    |

## API Documentation

Base URL: `http://localhost:3000/api/v1`

### Application Endpoints

#### Create Application

```http
POST /application/createApplication
```

Request body:

```json
{
  "companyName": "Acme Corp",
  "jobTitle": "Software Engineer",
  "jobType": "FULL_TIME",
  "status": "APPLIED",
  "appliedDate": "2026-06-15",
  "notes": "Referred by John"
}
```

`jobType` enum: `INTERNSHIP` | `FULL_TIME` | `PART_TIME`

`status` enum: `APPLIED` | `INTERVIEWING` | `OFFER` | `REJECTED`

---

#### Get All Applications

```http
GET /application/getApplications
```

Returns applications sorted by `appliedDate` descending.

---

#### Get Application by ID

```http
GET /application/getApplicationById/:id
```

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `id`      | UUID   | Application ID |

---

#### Search Applications

```http
GET /application/searchApplications?q=<query>
```

| Parameter | Type   | Description                    |
|-----------|--------|--------------------------------|
| `q`       | String | Search by company or job title (case-insensitive) |

---

#### Filter by Status

```http
GET /application/filterApplicationsByStatus?status=<status>
```

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `status`  | Enum   | `APPLIED`, `INTERVIEWING`, `OFFER`, or `REJECTED` |

---

#### Update Application

```http
PUT /application/updateApplication/:id
```

All fields optional. Same shape as create.

---

#### Delete Application

```http
DELETE /application/deleteApplication/:id
```

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `id`      | UUID   | Application ID |

---

## Database Schema

### Enums

- **JobType:** `INTERNSHIP`, `FULL_TIME`, `PART_TIME`
- **Status:** `APPLIED`, `INTERVIEWING`, `OFFER`, `REJECTED`

### `applications` table

| Column        | Type      | Notes                |
|---------------|-----------|----------------------|
| id            | UUID      | Primary key          |
| company_name  | String    |                      |
| job_title     | String    |                      |
| job_type      | JobType   | Enum                 |
| status        | Status    | Default: `APPLIED`   |
| applied_date  | DateTime  |                      |
| notes         | Text?     | Optional             |
| created_at    | DateTime  | Auto                 |
| updated_at    | DateTime  | Auto                 |

## Project Structure

```
├── Backend/
│   ├── prisma/              # Schema + migrations
│   ├── src/
│   │   ├── config/          # DB connection
│   │   ├── middlewares/      # Validation, error handling
│   │   ├── modules/          # Feature modules (routes, controllers, services)
│   │   └── routes/           # Router aggregation
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Feature-specific components
│   │   ├── hooks/            # Custom React hooks
│   │   └── services/         # API client
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Running Tests

No test suite is configured yet.
