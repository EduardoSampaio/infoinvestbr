import datetime

from fastapi import APIRouter, status
from src.cotacoes import service
from schemas import Response

router = APIRouter(
    prefix="/api/v1/cotacao",
    tags=["Cotacao"],
    dependencies=[],
    responses={404: {"descrição": "Provento não encontrado"}},
)


@router.get("/moeda")
async def get_moeda_cotacao():
    valor = service.get_moeda_cotacao()
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/codigo-ativo/{codigo_ativo}")
async def get_by_codigo(codigo_ativo: str, periodo: str, intervalo: str = "60m"):
    valor = service.get_by_codigo(codigo_ativo, periodo, intervalo)
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/codigo-ativo/{codigo_ativo}/data-inicio/{inicio}/data-fim/{fim}")
async def get_by_codigo_by_intervalo(codigo_ativo: str, inicio: datetime.date, fim: datetime.date):
    valor = service.get_by_codigo_by_intervalo(codigo_ativo, inicio, fim)
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)
