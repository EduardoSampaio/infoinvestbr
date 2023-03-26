from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi_sso.sso.google import GoogleSSO
from starlette.middleware.sessions import SessionMiddleware
from src.core.config import settings
from functools import lru_cache
from src.core.database import engine, SessionLocal
from src.usuarios import router as routerUsuario
from src.core.provider import router as routerProvider
from src.proventos import router as routerProvento
from src.transacoes import router as routerTransacao
from src.analise import router as routerAnalise
from src.cotacoes import router as routerCotacao
from src.core import models
from src.core.exceptions import CodigoAtivoException
from pathlib import Path
from src.core.custom_logging import CustomizeLogger
import uvicorn
import logging

models.Base.metadata.create_all(bind=engine)

logger = logging.getLogger(__name__)

config_path = Path(__file__).with_name("logging_config.json")


def create_app() -> FastAPI:
    _app = FastAPI(title='INFO INVEST BR', debug=False)
    _logger = CustomizeLogger.make_logger(config_path)
    _app.logger = _logger

    return _app


app = create_app()


# Exceptions
@app.exception_handler(CodigoAtivoException)
async def handle_http_exception(request: Request, exc: CodigoAtivoException):
    return JSONResponse(
        status_code=400,
        content={
            "mensagem": f"Erro de solicitação para o código: {exc.name}, o código do ativo é formado de {exc.name}.SA"}
    )

# Routers
app.include_router(routerUsuario.router)
app.include_router(routerProvider)
app.include_router(routerProvento.router)
app.include_router(routerTransacao.router)
app.include_router(routerAnalise.router)
app.include_router(routerCotacao.router)


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

if __name__ == '__main__':
    uvicorn.run(app, port=8000)
