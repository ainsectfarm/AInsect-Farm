import os

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.routers import users, waste, marketplace, greenpoints, contact

load_dotenv()

limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])

app = FastAPI(
    title="FLIK API",
    version="1.2.0",
    description="FLIK App — Circular Economy Marketplace API"
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

ALLOWED_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://192.168.1.108:3000").split(",")

app.add_middleware(CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"])

app.include_router(users.router)
app.include_router(waste.router)
app.include_router(marketplace.router)
app.include_router(greenpoints.router)
app.include_router(contact.router)


@app.get("/")
def root():
    return {"app": "FLIK API", "version": "1.2.0",
            "modules": ["users", "waste", "marketplace", "greenpoints", "contact"],
            "docs": "/docs"}


@app.get("/health")
def health():
    return {"status": "ok", "app": "FLIK"}
