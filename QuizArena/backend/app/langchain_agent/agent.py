from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

from app.core.config import settings

SYSTEM_PROMPT = """You are a helpful assistant for My Project.
Answer clearly and concisely, and ask a clarifying question if the request is ambiguous."""

_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", SYSTEM_PROMPT),
        ("human", "{input}"),
    ]
)


def _get_llm() -> ChatOpenAI:
    return ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0.3,
        api_key=settings.openai_api_key,
    )


async def get_agent_response(user_input: str) -> str:
    """
    Runs the user's message through the LangChain prompt + LLM chain
    and returns the assistant's reply as plain text.
    """
    llm = _get_llm()
    chain = _prompt | llm
    result = await chain.ainvoke({"input": user_input})
    return result.content
