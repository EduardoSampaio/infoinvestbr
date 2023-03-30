from sqlalchemy import Boolean, Column, Integer, String, Numeric, DateTime, CheckConstraint, ForeignKey
from src.core.database import Base
from datetime import datetime


class Provento(Base):
    __tablename__ = "proventos"

    id = Column("ID", Integer, index=True, primary_key=True)
    codigo_ativo = Column("CODIGO_ATIVO", String(10), nullable=False)
    data_com = Column("DATA_COM", DateTime, nullable=False)
    data_pagamento = Column("DATA_PAGAMENTO", DateTime, nullable=False)
    valor = Column("VALOR", Numeric, nullable=False)
    tipo_pagamento = Column("TIPO_PAGAMENTO", String(30), nullable=False)

    __table_args__ = (
        CheckConstraint(tipo_pagamento.in_(['JCP', 'DIVIDENDO'])),
    )

    def __init__(self,
                 codigo_ativo: str,
                 data_com: datetime.date,
                 data_pagamento: datetime.date,
                 valor: float,
                 tipo: str):
        self.codigo_ativo = codigo_ativo
        self.data_com = data_com
        self.data_pagamento = data_pagamento
        self.valor = valor
        self.tipo_pagamento = tipo
