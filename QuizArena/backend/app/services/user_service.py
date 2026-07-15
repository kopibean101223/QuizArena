from app.core.security import hash_password
from app.db.prisma_client import prisma


async def create_user(email: str, password: str, name: str | None = None):
    return await prisma.user.create(
        data={
            "email": email,
            "password": hash_password(password),
            "name": name,
        }
    )


async def get_user_by_email(email: str):
    return await prisma.user.find_unique(where={"email": email})
