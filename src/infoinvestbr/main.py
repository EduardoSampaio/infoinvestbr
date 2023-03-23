from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi_sso.sso.google import GoogleSSO
from starlette.middleware.sessions import SessionMiddleware
from config import settings
from functools import lru_cache
from database import engine, SessionLocal
from usuarios import router as routerUsuario
from provider import router as routerProvider
import models


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

google_sso = GoogleSSO(settings.GOOGLE_CLIENT_ID, settings.GOOGLE_CLIENT_SECRET,
                       "http://localhost:8000/google/callback")

# Routers
app.include_router(routerUsuario.router)
app.include_router(routerProvider)


# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@lru_cache()
def get_settings():
    return settings


# Middleware
app.add_middleware(SessionMiddleware, secret_key="some-random-string")
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
