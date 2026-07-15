import uuid

from app.services.chat_service import add_message_and_get_reply
from app.sockets.socket_manager import sio


@sio.event
async def connect(sid, environ, auth=None):
    print(f"Client connected: {sid}")


@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")


@sio.on("chat:message")
async def handle_chat_message(sid, data):
    """
    Expected payload: { "text": str, "conversationId": str | None }
    Emits back: chat:message with { id, sender, text }
    """
    text = data.get("text", "")
    conversation_id = data.get("conversationId")

    # Echo the user's message to everyone in the room (optional broadcast)
    await sio.emit(
        "chat:message",
        {"id": str(uuid.uuid4()), "sender": "user", "text": text},
        to=sid,
    )

    if conversation_id:
        reply = await add_message_and_get_reply(conversation_id, text)
    else:
        reply = {"role": "assistant", "text": "(no conversationId provided)"}

    await sio.emit(
        "chat:message",
        {"id": str(uuid.uuid4()), "sender": "assistant", "text": reply["text"]},
        to=sid,
    )
