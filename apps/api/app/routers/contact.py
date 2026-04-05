from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter()


class ContactPayload(BaseModel):
    name: str
    email: EmailStr
    type: str = "other"
    message: str


@router.post("/contact")
async def contact(payload: ContactPayload):
    # TODO: podłącz wysyłkę e-mail (Resend / SMTP)
    return {"ok": True}
