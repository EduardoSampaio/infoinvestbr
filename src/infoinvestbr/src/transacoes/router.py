from uuid import UUID

from fastapi import APIRouter, Depends, status
from fastapi_cache import JsonCoder
from fastapi_cache.decorator import cache

from src.core.database import SessionLocal
from src.transacoes.schemas import TransacaoRequestCreateSchema, TransacaoRequestUpdateSchema
from src.transacoes import service
from src.core.schemas import Response
from sqlalchemy.orm import Session
from src.usuarios.utils import get_user

router = APIRouter(
    prefix="/api/v1/transacoes",
    tags=["Transações"],
    dependencies=[],
    responses={404: {"descrição": "Transação não encontrado"}},
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
async def create(transacao_request: TransacaoRequestCreateSchema, db: Session = Depends(get_db),
                 usuario=Depends(get_user)):
    response = service.create_transacao(db, transacao_request)
    return Response(code=status.HTTP_201_CREATED, status="Created", message="Transação criada com sucesso!",
                    result=response)


@router.delete("/{transacao_id}")
async def remove_by_usuario_id(transacao_id: int, db: Session = Depends(get_db), usuario=Depends(get_user)):
    service.remover_transacao(db, transacao_id)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content", message="Transação removida com sucesso!")


@router.put("/")
async def update(transacao: TransacaoRequestUpdateSchema, db: Session = Depends(get_db), usuario=Depends(get_user)):
    service.update_transacao(db, transacao)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content", message="Transação atualizada com sucesso!")


@router.get("/{usuario_id}")
@cache(expire=60, coder=JsonCoder)
async def get_transacao_by_usuario_id(usuario_id: UUID, db: Session = Depends(get_db)):
    transacoes = service.get_transacoes_by_usuario_id(db, usuario_id)
    return Response(code=status.HTTP_200_OK, status="OK", result=transacoes)


@router.get("/{usuarios_id}/patrimonio")
@cache(expire=60, coder=JsonCoder)
async def get_patrimonio_by_usuario(usuario_id: UUID, db: Session = Depends(get_db)):
    patrimonios = service.get_patrimonio_by_usuario_id(db, usuario_id)
    return Response(code=status.HTTP_200_OK, status="OK", result=patrimonios)


@router.get("/{usuarios_id}/composicao")
@cache(expire=60, coder=JsonCoder)
async def get_patrimonio_by_usuario(usuario_id: UUID, db: Session = Depends(get_db)):
    composicao = service.get_chart_composicao(db, usuario_id)
    return Response(code=status.HTTP_200_OK, status="OK", result=composicao)
