import socketio
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import chat, health
from app.core.config import settings
from app.db.prisma_client import connect_db, disconnect_db
from app.sockets import chat_namespace  # noqa: F401 (registers socket event handlers)
from app.sockets.socket_manager import sio

app = FastAPI(title="My Project API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(chat.router)


@app.on_event("startup")
async def on_startup():
    await connect_db()


@app.on_event("shutdown")
async def on_shutdown():
    await disconnect_db()


# Combine FastAPI (HTTP routes) with the Socket.IO ASGI app.
# Socket.IO handles requests under /socket.io, everything else falls through to FastAPI.
combined_asgi_app = socketio.ASGIApp(sio, other_asgi_app=app, socketio_path="socket.io")


if __name__ == "__main__":
    uvicorn.run(
        "main:combined_asgi_app",
        host=settings.backend_host,
        port=settings.backend_port,
        reload=settings.environment == "development",
    )
