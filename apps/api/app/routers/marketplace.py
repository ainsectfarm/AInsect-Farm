from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
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

class Product(BaseModel):
    id: int
    seller_id: int
    name: str
    category: ProductCategory
    original_price: float
    current_price: float
    discount_pct: int
    weight_kg: float
    expiry_hours: float
    lat: float
    lng: float
    description: str
    available: bool = True
    created_at: str

class Reservation(BaseModel):
    product_id: int
    buyer_id: int
    pickup_time: str

products_db = []
reservations_db = []
prod_counter = {"id": 1}
res_counter = {"id": 1}

def calc_discount(expiry_hours: float) -> int:
    if expiry_hours >= 48: return 20
    if expiry_hours >= 24: return 40
    if expiry_hours >= 12: return 60
    if expiry_hours >= 6:  return 80
    return 90

@router.post("/products", response_model=Product)
def add_product(product: ProductCreate):
    discount = calc_discount(product.expiry_hours)
    current_price = round(product.original_price * (1 - discount/100), 2)
    new = Product(
        id=prod_counter["id"], seller_id=product.seller_id,
        name=product.name, category=product.category,
        original_price=product.original_price, current_price=current_price,
        discount_pct=discount, weight_kg=product.weight_kg,
        expiry_hours=product.expiry_hours, lat=product.lat, lng=product.lng,
        description=product.description, created_at=datetime.now().isoformat()
    )
    products_db.append(new); prod_counter["id"] += 1
    return new

@router.get("/products", response_model=list[Product])
def get_products(available_only: bool = True):
    return [p for p in products_db if p.available] if available_only else products_db

@router.post("/reserve")
def reserve_product(reservation: Reservation):
    product = next((p for p in products_db if p.id == reservation.product_id and p.available), None)
    if not product:
        raise HTTPException(404, "Product not found or unavailable")
    product.available = False
    points = int(product.weight_kg * 0.5)
    res = {"id": res_counter["id"], "product_id": reservation.product_id,
           "buyer_id": reservation.buyer_id, "pickup_time": reservation.pickup_time,
           "green_points_earned": points, "status": "confirmed",
           "created_at": datetime.now().isoformat()}
    reservations_db.append(res); res_counter["id"] += 1
    return res

@router.get("/map")
def get_map_pins():
    pins = [{"id": p.id, "type": "product", "name": p.name,
             "lat": p.lat, "lng": p.lng,
             "discount": f"-{p.discount_pct}%", "price": p.current_price}
            for p in products_db if p.available]
    return {"pins": pins, "total": len(pins)}

@router.get("/stats")
def marketplace_stats():
    return {
        "total_products": len(products_db),
        "active": len([p for p in products_db if p.available]),
        "reservations": len(reservations_db),
        "kg_saved": sum(p.weight_kg for p in products_db),
        "co2_saved_kg": round(sum(p.weight_kg for p in products_db) * 2.5, 2)
    }
