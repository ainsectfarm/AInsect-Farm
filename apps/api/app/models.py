from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=True)  # nullable for existing users
    user_type = Column(String(20), nullable=False)
    green_points = Column(Integer, default=100)
    ains_tokens = Column(Float, default=0.0)
    lat = Column(Float, default=0.0)
    lng = Column(Float, default=0.0)
    created_at = Column(DateTime, server_default=func.now())

class WasteReport(Base):
    __tablename__ = "waste_reports"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    waste_type = Column(String(30), nullable=False)
    weight_kg = Column(Float, nullable=False)
    destination = Column(String(20), nullable=False)
    green_points_earned = Column(Integer, default=0)
    lat = Column(Float, default=0.0)
    lng = Column(Float, default=0.0)
    description = Column(Text, default="")
    created_at = Column(DateTime, server_default=func.now())

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(200), nullable=False)
    category = Column(String(30), nullable=False)
    original_price = Column(Float, nullable=False)
    current_price = Column(Float, nullable=False)
    discount_pct = Column(Integer, default=0)
    weight_kg = Column(Float, nullable=False)
    expiry_hours = Column(Float, default=24)
    lat = Column(Float, default=0.0)
    lng = Column(Float, default=0.0)
    description = Column(Text, default="")
    available = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())

class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    buyer_id = Column(Integer, ForeignKey("users.id"))
    pickup_time = Column(DateTime, nullable=False)
    green_points_earned = Column(Integer, default=0)
    status = Column(String(20), default="confirmed")
    created_at = Column(DateTime, server_default=func.now())

class GreenPointsTransaction(Base):
    __tablename__ = "greenpoints_transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    points = Column(Integer, nullable=False)
    reason = Column(String(200), nullable=False)
    source = Column(String(50), default="manual")
    created_at = Column(DateTime, server_default=func.now())
