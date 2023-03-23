import datetime

from sqlalchemy.orm import Session
from models import Acao, FundosImobiliarios
from schemas import AcaoBaseSchema, FundosImobiliariosSchema, Response


def get_acoes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Acao).offset(skip).limit(limit).all()


def get_fundos_imobiliarios(db: Session, skip: int = 0, limit: int = 100):
    return db.query(FundosImobiliarios).offset(skip).limit(limit).all()
