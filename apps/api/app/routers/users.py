from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
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
    lat: float = 0.0
    lng: float = 0.0

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    user_type: str
    green_points: int
    ains_tokens: float
    class Config:
        from_attributes = True

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(400, "Email already registered")
    new_user = User(
        name=user.name, email=user.email,
        user_type=user.user_type, lat=user.lat, lng=user.lng,
        green_points=100, ains_tokens=0.0
    )
    db.add(new_user); db.commit(); db.refresh(new_user)
    return new_user

@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    return user
