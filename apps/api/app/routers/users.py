from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session
from enum import Enum

from app.database import get_db
from app.models import User
from app.auth import hash_password, verify_password, create_access_token, get_current_user

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
    password: str
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


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


@router.post("/register", response_model=TokenResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(400, "Email already registered")
    new_user = User(
        name=user.name, email=user.email,
        password_hash=hash_password(user.password),
        user_type=user.user_type, lat=user.lat, lng=user.lng,
        green_points=100, ains_tokens=0.0
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    token = create_access_token({"sub": str(new_user.id)})
    return TokenResponse(access_token=token, user=UserResponse.model_validate(new_user))


@router.post("/login", response_model=TokenResponse)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form.username).first()
    if not user or not user.password_hash or not verify_password(form.password, user.password_hash):
        raise HTTPException(401, "Invalid email or password")
    token = create_access_token({"sub": str(user.id)})
    return TokenResponse(access_token=token, user=UserResponse.model_validate(user))


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    return user
