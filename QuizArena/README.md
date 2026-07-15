#QuizArena

Full-stack app: **Next.js** (frontend) + **Python/FastAPI** (backend), **PostgreSQL** via **Prisma ORM**, **LangChain** for AI logic, **Socket.IO** for realtime chat, styled with **TailwindCSS**.

## Structure

```
my-project/
├── .env                    # Shared environment variables
├── docker-compose.yml      # Postgres + backend + frontend containers
├── frontend/                # Next.js app (App Router) + Tailwind
└── backend/                  # FastAPI app + Prisma (Python client) + LangChain + Socket.IO
```

## Prerequisites

- Node.js 20+
- Python 3.11+
- Poetry (`pip install poetry`)
- Docker (optional, for Postgres/containers)

## 1. Environment variables

Copy and edit the root `.env` file (already provided with sane local defaults). Set your `OPENAI_API_KEY`/`ANTHROPIC_API_KEY` and `SECRET_KEY`.

## 2. Database (PostgreSQL)

Start Postgres with Docker:

```bash
docker compose up -d db
```

Or point `DATABASE_URL` in `.env` at an existing Postgres instance.

## 3. Backend setup

```bash
cd backend
poetry install
poetry run prisma generate
poetry run prisma migrate dev --name init
poetry run python main.py
```

Backend runs at `http://localhost:8000` (FastAPI docs at `/docs`, Socket.IO mounted at `/socket.io`).

## 4. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

## 5. Run everything with Docker (alternative)

```bash
docker compose up --build
```

## Tech stack

| Layer      | Tech                                   |
|------------|-----------------------------------------|
| Frontend   | Next.js (App Router), TailwindCSS, TS   |
| Backend    | Python, FastAPI, python-socketio        |
| ORM        | Prisma (Python client)                  |
| Database   | PostgreSQL                              |
| AI         | LangChain                               |
| Realtime   | Socket.IO                               |
