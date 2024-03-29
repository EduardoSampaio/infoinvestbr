from datetime import datetime, date

from fastapi import FastAPI, HTTPException, Request
from redis import asyncio as aioredis
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

from src.core.config import settings
from src.core.database import engine, SessionLocal
from src.core.models import CotacaoAtivo
from src.usuarios import router as routerUsuario
from src.core.provider import router as routerProvider
from src.proventos import router as routerProvento
from src.transacoes import router as routerTransacao
from src.analise import router as routerAnalise
from src.cotacoes import router as routerCotacao
from src.core import models as core, task
from src.analise import models as analise
from src.transacoes import models as transacao
from src.proventos import models as proventos
from src.core.exceptions import CodigoAtivoException
from src.core.custom_logging import CustomizeLogger
from src.core import job

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

job.scheduler.start()


@app.on_event("startup")
async def startup():
    redis = await aioredis.from_url(settings.REDIS_URL, encoding="utf8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="info-invest")
    db = SessionLocal()
    data = date.today()
    result = db.query(CotacaoAtivo).filter(CotacaoAtivo.data == data).first()
    if result is None:
        job.scheduler.modify_job(job_id="job_atualizacao_cotacao_preco", next_run_time=datetime.now())


@app.exception_handler(CodigoAtivoException)
async def handle_http_codigo_exception(request: Request, exc: CodigoAtivoException):
    return JSONResponse(
        status_code=400,
        content={
            "message": f"Erro de solicitação para o código: {exc.name}, o código do ativo é formado de {exc.name}.SA"}
    )


@app.exception_handler(HTTPException)
async def handle_http_exception(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "message": exc.detail}
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


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware
app.add_middleware(SessionMiddleware, secret_key="some-random-string")
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_exception_handler(HTTPException, handle_http_exception)
app.add_exception_handler(CodigoAtivoException, handle_http_codigo_exception)

if __name__ == '__main__':
    uvicorn.run(app, port=8000)
