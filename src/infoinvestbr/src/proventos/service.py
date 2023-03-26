import datetime

from sqlalchemy.orm import Session
from src.core.models import Provento
from src.core.schemas import ProventoRequestSchema, ProventoResponseSchema


def convert_to_schema(model: ProventoResponseSchema) -> ProventoResponseSchema:
    return ProventoResponseSchema(
        provendo_id=model.provendo_id,
        data_com=model.data_com,
        data_pagamento=model.data_pagamento,
        codigo_ativo=model.codigo_ativo,
        valor=model.valor,
        tipo=model.tipo
    )


def get_proventos(db: Session, skip: int = 0, limit: int = 100) -> list[ProventoResponseSchema]:
    proventos = db.query(Provento).offset(skip).limit(limit).all()

    list_proventos_schema = []
    for provento in proventos:
        list_proventos_schema.append(convert_to_schema(provento))

    return list_proventos_schema


def get_provento_by_id(db: Session, provento_id: int) -> ProventoResponseSchema:
    return convert_to_schema(db.query(Provento).filter(Provento.id == provento_id).first())


def get_proventos_by_data_com(db: Session, data: datetime.date) -> list[ProventoResponseSchema]:
    proventos = db.query(Provento).filter(Provento.data_com == data).all()

    list_proventos_schema = []
    for provento in proventos:
        list_proventos_schema.append(convert_to_schema(provento))

    return proventos


def get_proventos_by_data_pagamento(db: Session, data: datetime.date) -> list[ProventoResponseSchema]:
    proventos = db.query(Provento).filter(Provento.data_pagamento == data).all()

    list_proventos_schema = []
    for provento in proventos:
        list_proventos_schema.append(convert_to_schema(provento))

    return list_proventos_schema


def get_proventos_data_com_by_ativo(db: Session, data: datetime.date, codigo_ativo: str) -> ProventoResponseSchema:
    return convert_to_schema(
        db.query(Provento).filter(Provento.data_com == data and Provento.codigo_ativo == codigo_ativo).first())


def get_proventos_data_pagamento_by_ativo(db: Session, data: datetime.date,
                                          codigo_ativo: str) -> ProventoResponseSchema:
    return convert_to_schema(
        db.query(Provento).filter(Provento.data_pagamento == data and Provento.codigo_ativo == codigo_ativo).first())


def create_provento(db: Session, provento: ProventoRequestSchema) -> Provento:
    _provento = Provento(
        codigo_ativo=provento.codigo_ativo,
        data_com=provento.data_com,
        data_pagamento=provento.data_pagamento,
        valor=provento.valor,
        tipo=provento.tipo
    )

    db.add(_provento)
    db.commit()
    db.refresh(_provento)
    return _provento


def remover_provento(db: Session, provendo_id: int):
    _provento = get_provento_by_id(db, provento_id=provendo_id)
    db.delete(_provento)
    db.commit()


def update_provento(db: Session, provento: ProventoRequestSchema):
    _provento = get_provento_by_id(db, provento_id=provento.provendo_id)
    _provento.tipo = provento.tipo
    _provento.valor = provento.valor
    _provento.data_com = provento.data_com
    _provento.data_pagamento = provento.data_pagamento
    _provento.codigo_ativo = provento.codigo_ativo

    db.commit()
    db.refresh(_provento)
