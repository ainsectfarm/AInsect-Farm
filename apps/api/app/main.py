from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users, waste

app = FastAPI(
    title="FLIK API",
    version="1.0.0",
    description="FLIK App — Circular Economy Marketplace API"
)

app.add_middleware(CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"])

app.include_router(users.router)
app.include_router(waste.router)

@app.get("/")
def root():
    return {
        "status": "FLIK API online",
        "version": "1.0.0",
        "endpoints": ["/users", "/waste", "/docs"]
    }

@app.get("/health")
def health():
    return {"status": "ok", "app": "FLIK"}
