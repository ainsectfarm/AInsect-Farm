from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from enum import Enum

router = APIRouter(prefix="/users", tags=["users"])

class UserType(str, Enum):
    individual = "individual"
    farmer = "farmer"
    supermarket = "supermarket"
    business = "business"
    biogas = "biogas"

class UserCreate(BaseModel):
    name: str
    email: str
    user_type: UserType
    location: str = ""

class User(BaseModel):
    id: int
    name: str
    email: str
    user_type: UserType
    green_points: int = 0
    ains_tokens: float = 0.0

# Tymczasowa baza w pamięci (potem PostgreSQL)
users_db = []
counter = {"id": 1}

@router.post("/register", response_model=User)
def register(user: UserCreate):
    new_user = User(
        id=counter["id"],
        name=user.name,
        email=user.email,
        user_type=user.user_type,
        green_points=100,  # bonus na start
        ains_tokens=0.0
    )
    users_db.append(new_user)
    counter["id"] += 1
    return new_user

@router.get("/", response_model=list[User])
def get_users():
    return users_db

@router.get("/{user_id}", response_model=User)
def get_user(user_id: int):
    user = next((u for u in users_db if u.id == user_id), None)
    if not user:
        raise HTTPException(404, "User not found")
    return user
