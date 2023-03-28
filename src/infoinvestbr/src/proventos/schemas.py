import datetime
from dataclasses import dataclass
from typing import Optional

from pydantic import BaseModel
from src.core.tipos import EnumTipoPagamento


class ProventoRequestSchema(BaseModel):
    provendo_id: Optional[int]
    codigo_ativo: str
    data_com: datetime.date
    data_pagamento: datetime.date
    valor: float
    tipo_pagamento: EnumTipoPagamento

    class Config:
        orm_mode = True


@dataclass()
class ProventoResponseSchema:
    provendo_id: int
    codigo_ativo: str
    data_com: datetime.date
    data_pagamento: datetime.date
    valor: float
    tipo: str

    def __init__(self,
                 provendo_id: int,
                 codigo_ativo: str,
                 data_com: datetime.date,
                 data_pagamento: datetime.date,
                 valor: float,
                 tipo: str):
        self.provendo_id = provendo_id
        self.codigo_ativo = codigo_ativo
        self.data_com = data_com
        self.data_pagamento = data_pagamento
        self.valor = valor
        self.tipo = tipo
