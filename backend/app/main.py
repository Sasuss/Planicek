from fastapi import FastAPI

app = FastAPI(
    title="Pláníček API",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url=None,
    openapi_url="/api/openapi.json",
)


@app.get("/api/health", tags=["systém"])
async def health() -> dict:
    return {"status": "ok"}