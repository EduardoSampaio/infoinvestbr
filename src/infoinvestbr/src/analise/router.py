import datetime

from fastapi import APIRouter, Depends, status
from database import SessionLocal
from schemas import Response, AcaoRequestSchema, FundosImobiliarioRequestSchema
from src.analise import service
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/api/v1/analises",
    tags=["Analises"],
    dependencies=[],
    responses={404: {"descrição": "Ativo não encontrado"}},
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/acao")
async def get_acoes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    acoes = service.get_acoes(db, skip, limit)
    return Response(code=status.HTTP_200_OK, status="Ok", result=acoes)


@router.get("/fundos-imobiliarios")
async def get_fundos_imobiliarios(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    fundos_imobiliarios = service.get_fundos_imobiliarios(db, skip, limit)
    return Response(code=status.HTTP_200_OK, status="Ok", result=fundos_imobiliarios)


@router.get("/acao/{codigo}")
async def get_acoes_by_codigo(codigo_id: int, db: Session = Depends(get_db)):
    acao = service.get_acoes_by_codigo(db, codigo_id)
    return Response(code=status.HTTP_200_OK, status="Ok", result=acao)


@router.get("/fundos-imobiliarios/{codigo}")
async def get_fundos_imobiliarios_by_codigo(provento_id: int, db: Session = Depends(get_db)):
    fundos_imobiliario = service.get_fundos_imobiliarios_by_codigo(db, provento_id)
    return Response(code=status.HTTP_200_OK, status="Ok", result=fundos_imobiliario)


@router.post("/fundos-imobiliarios")
async def create_fundos(fundo_imobilario_request: FundosImobiliarioRequestSchema, db: Session = Depends(get_db)):
    fundos_imobiliario = service.create_fundos(db, fundo_imobilario_request)
    return Response(code=status.HTTP_201_CREATED, status="Created",
                    message="Fundos Imobiliário cadastrado com sucesso!",
                    result=fundos_imobiliario)


@router.post("/acoes")
async def create_acoes(acoes_request: AcaoRequestSchema, db: Session = Depends(get_db)):
    acoes = service.create_acoes(db, acoes_request)
    return Response(code=status.HTTP_201_CREATED, status="Created", message="Ação cadastrada com sucesso!",
                    result=acoes)


@router.post("/fundos-imobiliarios")
async def update_fundos(fundo_imobilario_request: FundosImobiliarioRequestSchema, db: Session = Depends(get_db)):
    service.update_fundos(db, fundo_imobilario_request)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content",
                    message="Fundos Imobiliário atualizado com sucesso!")


@router.post("/acoes")
async def update_acoes(acoes_request: AcaoRequestSchema, db: Session = Depends(get_db)):
    service.update_acoes(db, acoes_request)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Contentº", message="Ação atualizada com sucesso!")
