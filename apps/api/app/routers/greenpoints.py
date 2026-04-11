from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, GreenPointsTransaction
from app.auth import get_current_user

router = APIRouter(prefix="/greenpoints", tags=["greenpoints"])

CONVERSION_RATE = 1000

class PointsTransaction(BaseModel):
    user_id: int
    points: int
    reason: str
    source: str = "manual"

class ConvertToAINS(BaseModel):
    user_id: int
    points_to_convert: int

@router.post("/earn")
def earn_points(tx: PointsTransaction, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.id != tx.user_id:
        raise HTTPException(403, "Cannot earn points for another user")
    user = db.query(User).filter(User.id == tx.user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    user.green_points += tx.points
    new_tx = GreenPointsTransaction(
        user_id=tx.user_id, points=tx.points,
        reason=tx.reason, source=tx.source
    )
    db.add(new_tx); db.commit()
    return {"success": True, "points_earned": tx.points,
            "new_balance": user.green_points}

@router.get("/balance/{user_id}")
def get_balance(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    return {"user_id": user_id,
            "green_points": user.green_points,
            "ains_tokens": user.ains_tokens,
            "points_to_next_ains": CONVERSION_RATE - (user.green_points % CONVERSION_RATE)}

@router.post("/convert")
def convert_to_ains(req: ConvertToAINS, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.id != req.user_id:
        raise HTTPException(403, "Cannot convert points for another user")
    user = db.query(User).filter(User.id == req.user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    if user.green_points < req.points_to_convert:
        raise HTTPException(400, f"Not enough points. Have: {user.green_points}")
    if req.points_to_convert < CONVERSION_RATE:
        raise HTTPException(400, f"Minimum: {CONVERSION_RATE} GP = 1 AINS")
    ains = req.points_to_convert / CONVERSION_RATE
    user.green_points -= req.points_to_convert
    user.ains_tokens += ains
    db.commit()
    return {"success": True, "ains_earned": ains,
            "new_gp_balance": user.green_points,
            "total_ains": user.ains_tokens}

@router.get("/leaderboard")
def leaderboard(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.green_points.desc()).limit(10).all()
    return {"leaderboard": [
        {"user_id": u.id, "name": u.name, "points": u.green_points}
        for u in users
    ]}

@router.get("/stats")
def gp_stats(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return {
        "total_users": len(users),
        "total_points": sum(u.green_points for u in users),
        "total_ains_converted": sum(u.ains_tokens for u in users),
        "rate": f"{CONVERSION_RATE} GP = 1 AINS"
    }
