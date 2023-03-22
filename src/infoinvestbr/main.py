from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from starlette.middleware.sessions import SessionMiddleware


from config import settings
from functools import lru_cache
from database import engine
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Routers

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@lru_cache()
def get_settings():
    return settings


# Middleware
app.add_middleware(SessionMiddleware, secret_key="some-random-string")
app.add_middleware(GZipMiddleware, minimum_size=1000)
