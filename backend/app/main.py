from fastapi import FastAPI
from app.routers import api


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
app.include_router(api.router)
