from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from starlette.middleware.sessions import SessionMiddleware
from pathlib import Path
from functools import lru_cache
import uvicorn
import logging
from datetime import datetime
from src.core.config import settings
from src.core.database import engine
from src.usuarios import router as routerUsuario
from src.core.provider import router as routerProvider
from src.proventos import router as routerProvento
from src.transacoes import router as routerTransacao
from src.analise import router as routerAnalise
from src.cotacoes import router as routerCotacao
from src.core import models as core
from src.analise import models as analise
from src.transacoes import models as transacao
from src.proventos import models as proventos
from src.core.exceptions import CodigoAtivoException
from src.core.custom_logging import CustomizeLogger
from redis import asyncio as aioredis

core.Base.metadata.create_all(bind=engine)
analise.Base.metadata.create_all(bind=engine)
transacao.Base.metadata.create_all(bind=engine)
proventos.Base.metadata.create_all(bind=engine)

logger = logging.getLogger(__name__)

config_path = Path(__file__).with_name("logging_config.json")


def create_app() -> FastAPI:
    _app = FastAPI(title='INFO INVEST', debug=False)
    _logger = CustomizeLogger.make_logger(config_path)
    _app.logger = _logger

    return _app


app = create_app()


@app.on_event("startup")
async def startup():
    redis = await aioredis.from_url(settings.REDIS_URL, encoding="utf8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="info-invest")


# Exceptions
@app.exception_handler(CodigoAtivoException)
async def handle_http_exception(exc: CodigoAtivoException):
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


@lru_cache()
def get_settings():
    return settings


@app.get("/health-check")
async def healh_check():
    return {
        "mensagem": f"Funcionando: {datetime.now()}"
    }


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