import datetime
from dataclasses import dataclass
from pydantic import BaseModel
from src.core.tipos import EnumTipoCategoria, EnumOrdemOperacao


class TransacaoRequestSchema(BaseModel):
    categoria: EnumTipoCategoria
    codigo_ativo: str
    ordem: EnumOrdemOperacao
    corretora: str
    data: datetime.date
    quantidade: int
    preco: float
    usuario_id: int

    class Config:
        orm_mode = True


@dataclass
class TransacaoResponseSchema:
    transacao_id: int
    categoria: str
    codigo_ativo: str
    ordem: str
    corretora: str
    data: datetime.date
    quantidade: int
    preco: float
    total: float
    usuario_id: int

    def __init__(self, transacao_id: int,
                 categoria: str,
                 codigo_ativo: str,
                 ordem: str,
                 corretora: str,
                 data: datetime.date,
                 quantidade: int,
                 preco: float,
                 total: float,
                 usuario_id: int):
        self.transacao_id = transacao_id
        self.codigo_ativo = codigo_ativo
        self.ordem = ordem
        self.corretora = corretora
        self.data = data
        self.quantidade = quantidade
        self.preco = preco
        self.total = total
        self.categoria = categoria
        self.usuario_id = usuario_id


@dataclass()
class PatrimonioSchemaResponse:
    patrimonio_id: int
    codigo_ativo: str
    preco_medio: float
    quantidade: int
    categoria: EnumTipoCategoria
    total: float
    percentual_ativo: float
    percentual_carteira: float
    usuario_id: int
    variacao_diaria: float
    variacao_total: float
    rentabilidade: float

    def __int__(self,
                patrimonio_id: int,
                codigo_ativo: str,
                preco_medio: float,
                quantidade: int,
                categoria: EnumTipoCategoria,
                total: float,
                percentual_ativo: float,
                percentual_carteira: float,
                usuario_id: int,
                variacao_diaria: float,
                variacao_total: float,
                rentabilidade: float,
                ):
        self.patrimonio_id = patrimonio_id
        self.codigo_ativo = codigo_ativo
        self.preco_medio = preco_medio
        self.quantidade = quantidade
        self.categoria = categoria
        self.total = total
        self.percentual_carteira = percentual_carteira
        self.percentual_ativo = percentual_ativo
        self.usuario_id = usuario_id
        self.variacao_total = variacao_total
        self.variacao_diaria = variacao_diaria
        self.rentabilidade = rentabilidade


@dataclass()
class CarteiraResponse:
    total: float
    usuario_id: int
    variacao_diaria: float
    variacao_total: float
    patrimonio: list[PatrimonioSchemaResponse]
    rentabilidade: float
