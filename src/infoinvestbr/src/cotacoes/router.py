import datetime

from fastapi import APIRouter, status, Depends

from src.cotacoes import service
from src.core.schemas import Response
from src.core.database import SessionLocal
from src.usuarios.utils import get_current_user

from fastapi_cache.decorator import cache
from fastapi_cache import JsonCoder


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = APIRouter(
    prefix="/api/v1/cotacao",
    tags=["Cotacao"],
    dependencies=[],
    responses={404: {"descrição": "Não encontrado"}},
)


@router.get("/moeda", dependencies=[Depends(get_current_user)])
@cache(expire=60, coder=JsonCoder)
async def get_moeda_cotacao():
    valor = service.get_moeda_cotacao()
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/ibovespa", dependencies=[Depends(get_current_user)])
@cache(expire=60, coder=JsonCoder)
async def get_by_codigo_ibovespa(periodo: str, intervalo: str = "1d"):
    valor = service.get_by_codigo_ibovespa(periodo, intervalo)
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/codigo-ativo/{codigo_ativo}", dependencies=[Depends(get_current_user)])
@cache(expire=60, coder=JsonCoder)
async def get_by_codigo(codigo_ativo: str, periodo: str, intervalo: str = "1d"):
    valor = service.get_by_codigo(codigo_ativo, periodo, intervalo)
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/codigo-ativo/{codigo_ativo}/chart", dependencies=[Depends(get_current_user)])
@cache(expire=60, coder=JsonCoder)
async def get_by_codigo_chart(codigo_ativo: str, periodo: str, intervalo: str = "1d"):
    valor = service.get_by_codigo_chart(codigo_ativo, periodo, intervalo)
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/codigo-ativo/{codigo_ativo}/data-inicio/{inicio}/data-fim/{fim}",
            dependencies=[Depends(get_current_user)])
@cache(expire=60, coder=JsonCoder)
async def get_by_codigo_by_intervalo(codigo_ativo: str, inicio: datetime.date, fim: datetime.date):
    valor = service.get_by_codigo_by_intervalo(codigo_ativo, inicio, fim)
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/historico/dividendos-anual/{codigo}", dependencies=[Depends(get_current_user)])
@cache(expire=43200, coder=JsonCoder)
async def get_historico_dividendo_anual(codigo: str):
    valor = service.get_historico_dividendo_anual(codigo)
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/historico/dividendos-mensal/{codigo}", dependencies=[Depends(get_current_user)])
@cache(expire=43200, coder=JsonCoder)
async def get_historico_dividendo_mensal(codigo: str):
    valor = service.get_historico_dividendo_mensal(codigo)
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/codigo-fundo/{codigo}/maiores-altas", dependencies=[Depends(get_current_user)])
@cache(expire=60, coder=JsonCoder)
async def get_maiores_altas_dia_fundos():
    valor = service.get_maiores_altas_dia_fundos()
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/codigo-fundo/{codigo}/maiores-baixa", dependencies=[Depends(get_current_user)])
@cache(expire=60, coder=JsonCoder)
async def get_maiores_baixa_dia_fundos():
    valor = service.get_maiores_baixa_dia_fundos()
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/codigo-acao/{codigo}/maiores-altas", dependencies=[Depends(get_current_user)])
@cache(expire=60, coder=JsonCoder)
async def get_maiores_altas_dia_acoes():
    valor = service.get_maiores_altas_dia_acoes()
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/codigo-acao/{codigo}/maiores-baixa", dependencies=[Depends(get_current_user)])
@cache(expire=60, coder=JsonCoder)
async def get_maiores_baixa_dia_acoes():
    valor = service.get_maiores_baixa_dia_acoes()
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)
