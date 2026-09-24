from fastapi import FastAPI
from sqlalchemy import text
from app.database import engine


app = FastAPI(
    title="Pláníček API",
    version="0.1.1",
    docs_url="/api/docs",
    redoc_url=None,
    openapi_url="/api/openapi.json",
    openapi_tags=[
            {
        "name": "system",
        "description": "System Endpoints used for testing etc."
        },
    ],
)


@app.get("/api/health", tags=["system"])
async def health() -> dict:
    db_ok = False
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        db_ok = True
    except Exception:
        pass
    return {"status": "api zije", "db": "ok" if db_ok else "error"}