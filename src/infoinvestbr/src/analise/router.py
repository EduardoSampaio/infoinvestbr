from fastapi import APIRouter, Depends, status
from fastapi_cache.decorator import cache
from fastapi_cache import JsonCoder

from src.core.database import SessionLocal
from src.analise.schemas import AcaoRequestSchema, FundosImobiliarioRequestSchema, AcaoResponseSchema
from src.core.schemas import Response
from src.analise import service
from sqlalchemy.orm import Session

from src.usuarios.utils import get_current_user


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
@cache(expire=43200, coder=JsonCoder)
async def get_acoes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    acoes = service.get_acoes(db, skip, limit)
    return Response(code=status.HTTP_200_OK, status="Ok", result=acoes).dict(exclude_none=True)


@router.get("/fundos-imobiliarios/setor/{setor}")
# @cache(expire=43200, coder=JsonCoder)
async def get_fundos_imobiliarios(setor: str, db: Session = Depends(get_db)):
    fundos_imobiliarios = service.get_fundos_imobiliarios_setor(db, setor)
    return Response(code=status.HTTP_200_OK, status="Ok", result=fundos_imobiliarios).dict(exclude_none=True)


@router.get("/acao/setor/{setor}")
@cache(expire=43200, coder=JsonCoder)
async def get_acoes_by_setor(setor: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    acoes = service.get_acoes_by_setor(db, setor, skip, limit)
    return Response(code=status.HTTP_200_OK, status="Ok", result=acoes).dict(exclude_none=True)


@router.get("/fundos-imobiliarios")
@cache(expire=43200, coder=JsonCoder)
async def get_fundos_imobiliarios(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    fundos_imobiliarios = service.get_fundos_imobiliarios(db, skip, limit)
    return Response(code=status.HTTP_200_OK, status="Ok", result=fundos_imobiliarios).dict(exclude_none=True)


@router.get("/acao/{codigo}")
@cache(expire=43200, coder=JsonCoder)
async def get_acoes_by_codigo(codigo: str, db: Session = Depends(get_db)):
    acao = service.get_acoes_by_codigo(db, codigo)
    return Response(code=status.HTTP_200_OK, status="Ok", result=acao).dict(exclude_none=True)


@router.get("/fundos-imobiliarios/{codigo}")
@cache(expire=43200, coder=JsonCoder)
async def get_fundos_imobiliarios_by_codigo(codigo: str, db: Session = Depends(get_db)):
    fundos_imobiliario = service.get_fundos_imobiliarios_by_codigo(db, codigo)
    return Response(code=status.HTTP_200_OK, status="Ok", result=fundos_imobiliario).dict(exclude_none=True)


@router.post("/fundos-imobiliarios", dependencies=[Depends(get_current_user)])
async def update_fundos(fundo_imobilario_request: FundosImobiliarioRequestSchema, db: Session = Depends(get_db)):
    service.update_fundos(db, fundo_imobilario_request)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content",
                    message="Fundos Imobiliário atualizado com sucesso!").dict(exclude_none=True)


@router.post("/acoes", dependencies=[Depends(get_current_user)])
async def update_acoes(acoes_request: AcaoRequestSchema, db: Session = Depends(get_db)):
    service.update_acoes(db, acoes_request)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Contentº", message="Ação atualizada com sucesso!")


@router.post("/fundos-imobiliarios/importacao")
async def importar_fundos(db: Session = Depends(get_db)):
    service.import_fundos_imobiliarios(db)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content",
                    message="Fundos Imobiliário importados com sucesso!").dict(exclude_none=True)


@router.post("/acoes/importacao")
async def importar_acoes(db: Session = Depends(get_db)):
    service.import_acoes(db)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content",
                    message="Ações importadas com sucesso!").dict(exclude_none=True)


@router.delete("/fundos-imobiliarios/importacao")
async def remove_todos_fundos(db: Session = Depends(get_db)):
    service.remove_todos_fundos(db)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content",
                    message="Todos os Fundos Imobiliário foram removidos com sucesso!").dict(exclude_none=True)


@router.delete("/acoes/importacao")
async def remove_todas_acoes(db: Session = Depends(get_db)):
    service.remove_todas_acoes(db)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content",
                    message="Todas as Ações foram removidas com sucesso!").dict(exclude_none=True)
