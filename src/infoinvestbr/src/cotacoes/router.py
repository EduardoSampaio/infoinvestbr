import datetime

from fastapi import APIRouter, status, Depends
from src.cotacoes import service
from src.core.schemas import Response
from sqlalchemy.orm import Session
from src.core.database import SessionLocal


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
    responses={404: {"descrição": "Provento não encontrado"}},
)


@router.get("/moeda")
async def get_moeda_cotacao():
    valor = service.get_moeda_cotacao()
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/codigo-ativo/{codigo_ativo}")
async def get_by_codigo(codigo_ativo: str, periodo: str, intervalo: str = "1d"):
    valor = service.get_by_codigo(codigo_ativo, periodo, intervalo)
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.get("/codigo-ativo/{codigo_ativo}/data-inicio/{inicio}/data-fim/{fim}")
async def get_by_codigo_by_intervalo(codigo_ativo: str, inicio: datetime.date, fim: datetime.date):
    valor = service.get_by_codigo_by_intervalo(codigo_ativo, inicio, fim)
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.post("/historico/{codigo}")
async def gerar_dados_historicos(codigo: str, db: Session = Depends(get_db), periodo: str = "1d",
                                 updated: bool = False):
    valor = service.gerar_dados_historicos(db, codigo, periodo, updated)
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


@router.delete("/historico")
async def deletar_dados_historicos(db: Session = Depends(get_db)):
    service.deletar_dados_historicos(db)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content",
                    message="Dados Históricos removidos com sucesso!").dict(exclude_none=True)


@router.delete("/historico/{codigo}")
async def deletar_dados_historicos(codigo: str, db: Session = Depends(get_db)):
    service.deletar_dados_historicos_by_codigo(db, codigo)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content",
                    message="Dados Históricos removidos com sucesso!").dict(exclude_none=True)


@router.post("/historico/dividendos/{codigo}")
async def get_historico_dividendo(codigo: str):
    valor = service.get_historico_dividendo(codigo)
    return Response(code=status.HTTP_200_OK, status="Ok", result=valor).dict(exclude_none=True)


