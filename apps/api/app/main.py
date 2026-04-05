from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users, waste, marketplace, greenpoints

app = FastAPI(
    title="FLIK API",
    version="1.1.0",
    description="FLIK App — Circular Economy Marketplace API"
)

app.add_middleware(CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"])

app.include_router(users.router)
app.include_router(waste.router)
app.include_router(marketplace.router)
app.include_router(greenpoints.router)

@app.get("/")
def root():
    return {"app": "FLIK API", "version": "1.1.0",
            "modules": ["users","waste","marketplace","greenpoints"],
            "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "ok", "app": "FLIK"}
