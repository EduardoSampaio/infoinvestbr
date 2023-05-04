import datetime
from dataclasses import dataclass
from pydantic import BaseModel
from src.core.tipos import EnumTipoCategoria, EnumOrdemOperacao
from uuid import UUID
from typing import Optional


class TransacaoRequestCreateSchema(BaseModel):
    categoria: EnumTipoCategoria
    codigo_ativo: str
    ordem: EnumOrdemOperacao
    corretora: str
    data: str
    quantidade: int
    preco: float
    usuario_id: UUID
    outro: Optional[float] = None
    corretagem: Optional[float] = None

    class Config:
        orm_mode = True


class TransacaoRequestUpdateSchema(BaseModel):
    id: int
    corretora: str
    data: str
    quantidade: int
    preco: float


@dataclass
class TransacaoResponseSchema:
    id: int
    categoria: str
    codigo_ativo: str
    ordem: str
    corretora: str
    data: datetime.date
    quantidade: int
    preco: float
    total: float
    usuario_id: UUID
    imagem: str

    def __init__(self, id: int,
                 categoria: str,
                 codigo_ativo: str,
                 ordem: str,
                 corretora: str,
                 data: datetime.date,
                 quantidade: int,
                 preco: float,
                 total: float,
                 usuario_id: int,
                 imagem: str):
        self.id = id
        self.codigo_ativo = codigo_ativo
        self.ordem = ordem
        self.corretora = corretora
        self.data = data
        self.quantidade = quantidade
        self.preco = preco
        self.total = total
        self.categoria = categoria
        self.usuario_id = usuario_id
        self.imagem = imagem


@dataclass()
class PatrimonioSchemaResponse:
    id: int
    codigo_ativo: str
    preco: float
    preco_medio: float
    quantidade: int
    categoria: EnumTipoCategoria
    total: float
    percentual_ativo: float
    percentual_carteira: float
    usuario_id: UUID
    variacao_diaria: float
    variacao_total: float
    rentabilidade: float
    imagem: str

    def __int__(self,
                id: int,
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
                imagem: str,
                preco: float
                ):
        self.id = id
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
        self.imagem = imagem
        self.preco = preco


@dataclass()
class CarteiraResponse:
    total: float
    usuario_id: UUID
    variacao_diaria: float
    variacao_total: float
    patrimonio: list[PatrimonioSchemaResponse]
    rentabilidade: float
