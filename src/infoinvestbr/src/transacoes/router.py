from uuid import UUID

from fastapi import APIRouter, Depends, status, HTTPException
from src.core.database import SessionLocal
from src.transacoes.schemas import TransacaoRequestCreateSchema , TransacaoRequestUpdateSchema
from src.transacoes import service
from src.core.schemas import Response
from sqlalchemy.orm import Session

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
async def create(transacao_request: TransacaoRequestCreateSchema, db: Session = Depends(get_db)):
    response = service.create_transacao(db, transacao_request)
    return Response(code=status.HTTP_201_CREATED, status="Created", message="Transação criada com sucesso!",
                    result=response)


@router.delete("/{transacao_id}")
async def remove_by_usuario_id(transacao_id: int, db: Session = Depends(get_db)):
    service.remover_transacao(db, transacao_id)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content", message="Transação removida com sucesso!")


@router.put("/")
async def update(transacao: TransacaoRequestUpdateSchema, db: Session = Depends(get_db)):
    service.update_transacao(db, transacao)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content", message="Transação atualizada com sucesso!")


@router.get("/{usuario_id}")
async def get_transacao_by_usuario_id(usuario_id: UUID, db: Session = Depends(get_db)):
    transacoes = service.get_transacoes_by_usuario_id(db, usuario_id)
    return Response(code=status.HTTP_200_OK, status="OK", result=transacoes)


@router.get("/patrimonio/{usuarios_id}")
async def get_patrimonio_by_usuario(usuario_id: UUID, db: Session = Depends(get_db)):
    patrimonios = service.get_patrimonio_by_usuario(db, usuario_id)
    return Response(code=status.HTTP_200_OK, status="OK", result=patrimonios)
