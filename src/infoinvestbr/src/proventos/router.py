import datetime

from fastapi import APIRouter, Depends, status
from src.core.database import SessionLocal
from src.proventos.schemas import ProventoRequestSchema
from src.core.schemas import Response
from src.proventos import service
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/api/v1/proventos",
    tags=["Proventos"],
    dependencies=[],
    responses={404: {"descrição": "Provento não encontrado"}},
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
async def get_proventos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    proventos = service.get_proventos(db, skip, limit)
    return Response(code=status.HTTP_200_OK, status="Ok", result=proventos)


@router.get("/{id}")
async def get_provento_id(provento_id: int, db: Session = Depends(get_db)):
    proventos = service.get_provento_by_id(db, provento_id)
    return Response(code=status.HTTP_200_OK, status="Ok", result=proventos)


@router.get("/data-com/codigo-ativo/{codigo_ativo}")
async def get_proventos_data_com_by_ativo(codigo_ativo: str, db: Session = Depends(get_db)):
    proventos = service.get_proventos_data_com_by_ativo(db, codigo_ativo)
    return Response(code=status.HTTP_200_OK, status="Ok", result=proventos)


@router.get("/data-pagamento/codigo-ativo/{codigo_ativo}")
async def get_proventos_data_pagamento_by_ativo(codigo_ativo: str, db: Session = Depends(get_db)):
    proventos = service.get_proventos_data_pagamento_by_ativo(db, codigo_ativo)
    return Response(code=status.HTTP_200_OK, status="Ok", result=proventos)


@router.get("/data-com/{data_com}")
async def get_proventos_by_data_com(data_com: datetime.date, db: Session = Depends(get_db)):
    proventos = service.get_proventos_by_data_com(db, data_com)
    return Response(code=status.HTTP_200_OK, status="Ok", result=proventos)


@router.get("/data-pagamento/{data_pagamento}")
async def get_proventos_by_data_pagamento(data_pagamento: datetime.date, db: Session = Depends(get_db)):
    proventos = service.get_proventos_by_data_pagamento(db, data_pagamento)
    return Response(code=status.HTTP_200_OK, status="Ok", result=proventos)


@router.post("/")
async def create_provento(provento_request: ProventoRequestSchema, db: Session = Depends(get_db)):
    provento = service.create_provento(db, provento_request)
    return Response(code=status.HTTP_201_CREATED, status="Created", message="Provento criado com sucesso!",
                    result=provento)


@router.put("/")
async def update_provento(provento: ProventoRequestSchema, db: Session = Depends(get_db)):
    service.update_provento(db, provento)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content", message="Provento atualizado com sucesso!")


@router.delete("/{id}")
async def remover_provento(provento_id: int, db: Session = Depends(get_db)):
    service.remover_provento(db, provento_id)
    return Response(code=status.HTTP_204_NO_CONTENT, status="No Content", message="Provento removido com sucesso!")
