from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import WasteReport, User
from enum import Enum

router = APIRouter(prefix="/waste", tags=["waste"])

class WasteType(str, Enum):
    food_organic = "food_organic"
    crop_residue = "crop_residue"
    restaurant = "restaurant"
    supermarket = "supermarket"
    industrial = "industrial"

class WasteReportCreate(BaseModel):
    user_id: int
    waste_type: WasteType
    weight_kg: float
    lat: float = 0.0
    lng: float = 0.0
    description: str = ""

def route_waste(waste_type: str, weight_kg: float) -> str:
    if waste_type in ["food_organic", "supermarket"]:
        return "bsf" if weight_kg < 50 else "biogas"
    if waste_type == "restaurant":
        return "biogas"
    if waste_type == "crop_residue":
        return "cricket"
    return "biogas"

@router.post("/report")
def report_waste(report: WasteReportCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == report.user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    destination = route_waste(report.waste_type, report.weight_kg)
    points = int(report.weight_kg * 1.0)
    new_report = WasteReport(
        user_id=report.user_id, waste_type=report.waste_type,
        weight_kg=report.weight_kg, destination=destination,
        green_points_earned=points, lat=report.lat,
        lng=report.lng, description=report.description
    )
    db.add(new_report)
    user.green_points += points
    db.commit(); db.refresh(new_report)
    return {"id": new_report.id, "destination": destination,
            "green_points_earned": points,
            "user_total_points": user.green_points}

@router.get("/")
def get_reports(db: Session = Depends(get_db)):
    reports = db.query(WasteReport).all()
    return reports

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    reports = db.query(WasteReport).all()
    total_kg = sum(r.weight_kg for r in reports)
    total_points = sum(r.green_points_earned for r in reports)
    return {
        "total_reports": len(reports),
        "total_kg_saved": total_kg,
        "total_green_points": total_points,
        "co2_saved_kg": round(total_kg * 2.5, 2)
    }
