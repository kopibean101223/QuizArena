from langchain_core.chat_history import InMemoryChatMessageHistory

# Simple in-memory per-conversation history store.
# Swap for a persistent store (e.g. backed by Postgres via Prisma) in production.
_histories: dict[str, InMemoryChatMessageHistory] = {}


def get_history(conversation_id: str) -> InMemoryChatMessageHistory:
    if conversation_id not in _histories:
        _histories[conversation_id] = InMemoryChatMessageHistory()
    return _histories[conversation_id]
