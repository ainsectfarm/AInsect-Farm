from fastapi import APIRouter
from pydantic import BaseModel
from enum import Enum
from datetime import datetime

router = APIRouter(prefix="/waste", tags=["waste"])

class WasteType(str, Enum):
    food_organic = "food_organic"
    crop_residue = "crop_residue"
    restaurant = "restaurant"
    supermarket = "supermarket"
    industrial = "industrial"

class WasteDestination(str, Enum):
    biogas = "biogas"
    bsf = "bsf"
    cricket = "cricket"
    charity = "charity"

class WasteReport(BaseModel):
    user_id: int
    waste_type: WasteType
    weight_kg: float
    lat: float = 0.0
    lng: float = 0.0
    description: str = ""

class WasteReportResponse(BaseModel):
    id: int
    user_id: int
    waste_type: WasteType
    weight_kg: float
    destination: WasteDestination
    green_points_earned: int
    created_at: str

reports_db = []
counter = {"id": 1}

def route_waste(waste_type: WasteType, weight_kg: float) -> WasteDestination:
    """AI routing logic - later replaced by Qwen"""
    if waste_type in [WasteType.food_organic, WasteType.supermarket]:
        return WasteDestination.bsf if weight_kg < 50 else WasteDestination.biogas
    if waste_type == WasteType.restaurant:
        return WasteDestination.biogas
    if waste_type == WasteType.crop_residue:
        return WasteDestination.cricket
    return WasteDestination.biogas

@router.post("/report", response_model=WasteReportResponse)
def report_waste(report: WasteReport):
    destination = route_waste(report.waste_type, report.weight_kg)
    points = int(report.weight_kg * 1.0)  # 1 GP per kg
    new_report = WasteReportResponse(
        id=counter["id"],
        user_id=report.user_id,
        waste_type=report.waste_type,
        weight_kg=report.weight_kg,
        destination=destination,
        green_points_earned=points,
        created_at=datetime.now().isoformat()
    )
    reports_db.append(new_report)
    counter["id"] += 1
    return new_report

@router.get("/", response_model=list[WasteReportResponse])
def get_reports():
    return reports_db

@router.get("/stats")
def get_stats():
    total_kg = sum(r.weight_kg for r in reports_db)
    total_points = sum(r.green_points_earned for r in reports_db)
    return {
        "total_reports": len(reports_db),
        "total_kg_saved": total_kg,
        "total_green_points": total_points,
        "co2_saved_kg": round(total_kg * 2.5, 2)
    }
