from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Product, Reservation, User
from enum import Enum
from datetime import datetime

router = APIRouter(prefix="/marketplace", tags=["marketplace"])

class ProductCategory(str, Enum):
    near_expiry = "near_expiry"
    farmer_fresh = "farmer_fresh"
    ainsekt_products = "ainsekt_products"
    food_rescue = "food_rescue"

class ProductCreate(BaseModel):
    seller_id: int
    name: str
    category: ProductCategory
    original_price: float
    weight_kg: float
    expiry_hours: float = 24
    lat: float = 0.0
    lng: float = 0.0
    description: str = ""

class ReservationCreate(BaseModel):
    product_id: int
    buyer_id: int
    pickup_time: str

def calc_discount(expiry_hours: float) -> int:
    if expiry_hours >= 48: return 20
    if expiry_hours >= 24: return 40
    if expiry_hours >= 12: return 60
    if expiry_hours >= 6:  return 80
    return 90

@router.post("/products")
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    seller = db.query(User).filter(User.id == product.seller_id).first()
    if not seller:
        raise HTTPException(404, "Seller not found")
    discount = calc_discount(product.expiry_hours)
    current_price = round(product.original_price * (1 - discount/100), 2)
    new = Product(
        seller_id=product.seller_id, name=product.name,
        category=product.category, original_price=product.original_price,
        current_price=current_price, discount_pct=discount,
        weight_kg=product.weight_kg, expiry_hours=product.expiry_hours,
        lat=product.lat, lng=product.lng, description=product.description
    )
    db.add(new); db.commit(); db.refresh(new)
    return {"id": new.id, "name": new.name, "current_price": new.current_price,
            "discount_pct": new.discount_pct, "available": new.available}

@router.get("/products")
def get_products(available_only: bool = True, db: Session = Depends(get_db)):
    q = db.query(Product)
    if available_only:
        q = q.filter(Product.available == True)
    return q.all()

@router.post("/reserve")
def reserve_product(res: ReservationCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(
        Product.id == res.product_id, Product.available == True).first()
    if not product:
        raise HTTPException(404, "Product not found or unavailable")
    buyer = db.query(User).filter(User.id == res.buyer_id).first()
    if not buyer:
        raise HTTPException(404, "Buyer not found")
    product.available = False
    points = int(product.weight_kg * 0.5)
    buyer.green_points += points
    new_res = Reservation(
        product_id=res.product_id, buyer_id=res.buyer_id,
        pickup_time=datetime.fromisoformat(res.pickup_time),
        green_points_earned=points, status="confirmed"
    )
    db.add(new_res); db.commit(); db.refresh(new_res)
    return {"id": new_res.id, "status": "confirmed",
            "green_points_earned": points,
            "buyer_total_points": buyer.green_points}

@router.get("/map")
def get_map_pins(db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.available == True).all()
    pins = [{"id": p.id, "type": "product", "name": p.name,
             "lat": p.lat, "lng": p.lng,
             "discount": f"-{p.discount_pct}%",
             "price": p.current_price} for p in products]
    return {"pins": pins, "total": len(pins)}

@router.get("/stats")
def marketplace_stats(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    reservations = db.query(Reservation).all()
    total_kg = sum(p.weight_kg for p in products)
    return {
        "total_products": len(products),
        "active": len([p for p in products if p.available]),
        "reservations": len(reservations),
        "kg_saved": total_kg,
        "co2_saved_kg": round(total_kg * 2.5, 2)
    }
