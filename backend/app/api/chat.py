from fastapi import APIRouter, HTTPException

from app.db.prisma_client import prisma
from app.langchain_agent.agent import get_agent_response

router = APIRouter(prefix="/chat", tags=["chat"])


@router.get("/conversations/{conversation_id}/messages")
async def get_messages(conversation_id: str):
    conversation = await prisma.conversation.find_unique(
        where={"id": conversation_id}, include={"messages": True}
    )
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation.messages


@router.post("/conversations/{conversation_id}/messages")
async def post_message(conversation_id: str, content: str):
    user_message = await prisma.message.create(
        data={
            "content": content,
            "role": "user",
            "conversationId": conversation_id,
        }
    )

    ai_reply = await get_agent_response(content)

    assistant_message = await prisma.message.create(
        data={
            "content": ai_reply,
            "role": "assistant",
            "conversationId": conversation_id,
        }
    )

    return {"user_message": user_message, "assistant_message": assistant_message}
