from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/greenpoints", tags=["greenpoints"])

CONVERSION_RATE = 1000  # 1000 GP = 1 AINS

balances_db = {}
ains_db = {}
transactions_db = []
tx_counter = {"id": 1}

class PointsTransaction(BaseModel):
    user_id: int
    points: int
    reason: str

class ConvertToAINS(BaseModel):
    user_id: int
    points_to_convert: int

@router.post("/earn")
def earn_points(tx: PointsTransaction):
    balances_db[tx.user_id] = balances_db.get(tx.user_id, 0) + tx.points
    transactions_db.append({"id": tx_counter["id"], "user_id": tx.user_id,
        "points": tx.points, "reason": tx.reason,
        "created_at": datetime.now().isoformat()})
    tx_counter["id"] += 1
    return {"success": True, "points_earned": tx.points,
            "new_balance": balances_db[tx.user_id]}

@router.get("/balance/{user_id}")
def get_balance(user_id: int):
    return {"user_id": user_id,
            "green_points": balances_db.get(user_id, 0),
            "ains_tokens": ains_db.get(user_id, 0.0),
            "points_to_next_ains": CONVERSION_RATE - (balances_db.get(user_id, 0) % CONVERSION_RATE)}

@router.post("/convert")
def convert_to_ains(req: ConvertToAINS):
    balance = balances_db.get(req.user_id, 0)
    if balance < req.points_to_convert:
        raise HTTPException(400, f"Not enough points. Have: {balance}")
    if req.points_to_convert < CONVERSION_RATE:
        raise HTTPException(400, f"Minimum: {CONVERSION_RATE} GP = 1 AINS")
    ains = req.points_to_convert / CONVERSION_RATE
    balances_db[req.user_id] -= req.points_to_convert
    ains_db[req.user_id] = ains_db.get(req.user_id, 0) + ains
    return {"success": True, "ains_earned": ains,
            "new_gp_balance": balances_db[req.user_id],
            "total_ains": ains_db[req.user_id]}

@router.get("/leaderboard")
def leaderboard():
    lb = sorted([{"user_id": k, "points": v} for k,v in balances_db.items()],
                key=lambda x: x["points"], reverse=True)
    return {"leaderboard": lb[:10]}

@router.get("/stats")
def gp_stats():
    return {"total_users": len(balances_db),
            "total_points": sum(balances_db.values()),
            "total_ains_converted": sum(ains_db.values()),
            "rate": f"{CONVERSION_RATE} GP = 1 AINS"}
