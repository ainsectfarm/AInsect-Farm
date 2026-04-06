import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import users, waste, marketplace, greenpoints, contact

load_dotenv()

app = FastAPI(
    title="FLIK API",
    version="1.2.0",
    description="FLIK App — Circular Economy Marketplace API"
)

ALLOWED_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://192.168.1.108:3000").split(",")

app.add_middleware(CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

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
