from app.db.prisma_client import prisma
from app.langchain_agent.agent import get_agent_response


async def create_conversation(title: str | None = None):
    return await prisma.conversation.create(data={"title": title})


async def add_message_and_get_reply(conversation_id: str, content: str) -> dict:
    await prisma.message.create(
        data={"content": content, "role": "user", "conversationId": conversation_id}
    )

    reply_text = await get_agent_response(content)

    assistant_message = await prisma.message.create(
        data={
            "content": reply_text,
            "role": "assistant",
            "conversationId": conversation_id,
        }
    )

    return {"role": "assistant", "text": assistant_message.content}
