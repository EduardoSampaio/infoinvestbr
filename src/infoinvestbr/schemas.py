import datetime
from dataclasses import dataclass
from typing import Optional, TypeVar

from pydantic import BaseModel
from pydantic.generics import GenericModel, Generic

T = TypeVar('T')


class ValidationErrorResponse(BaseModel):
    domain: str
    field: str
    error: str


class Response(GenericModel, Generic[T]):
    code: str
    status: str
    message: Optional[str]
    result: Optional[T]
    errors: Optional[list[ValidationErrorResponse]]


class UsuarioBaseSchema(BaseModel):
    nome: str
    email: str
    imagem: Optional[str] = None


class UsuarioRequestSchema(UsuarioBaseSchema):
    senha: str


@dataclass
class UsuarioResponseSchema:
    usuario_id: int
    is_admin: bool
    nome: str
    email: str
    imagem: Optional[str] = None

    def __init__(self, usuario_id: int, nome: str, email: str, is_admin: bool, imagem: Optional[str] = None):
        self.usuario_id = usuario_id
        self.nome = nome
        self.email = email
        self.imagem = imagem
        self.is_admin = is_admin


class TransacaoSchema(BaseModel):
    transacao_id: Optional[int] = None
    categoria: str
    codigo_ativo: str
    ordem: str
    corretora: str
    data: datetime.date
    quantidade: int
    preco: float
    total: float
    usuario_id: int

    class Config:
        orm_mode = True


class ProventoSchema(BaseModel):
    provendo_id: Optional[int] = None
    codigo_ativo: str
    data_com: datetime.date
    data_pagamento: datetime.date
    valor: float
    tipo: str

    class Config:
        orm_mode = True


class FundosImobiliariosSchema(BaseModel):
    fundo_id: Optional[int] = None
    codigo_do_fundo: Optional[str] = None
    nome: Optional[str] = None
    descricao: Optional[str] = None
    imagem: Optional[str] = None
    administrador: Optional[str] = None
    cnpj: Optional[str] = None
    taxa_administracao: Optional[str] = None
    taxa_gestao: Optional[str] = None
    taxa_performance: Optional[str] = None
    tipo_gestao: Optional[str] = None
    setor: Optional[str] = None
    liquidez_diaria: Optional[float] = None
    dividendo: Optional[float] = None
    dividend_yield: Optional[float] = None
    dy_ano: Optional[float] = None
    variacao_preco: Optional[float] = None
    rentab_periodo: Optional[float] = None
    rentab_acumulada: Optional[float] = None
    patrimonio_liq: Optional[float] = None
    vpa: Optional[float] = None
    p_vpa: Optional[float] = None
    dy_patrimonial: Optional[float] = None
    variacao_patrimonial: Optional[float] = None
    rentab_patr_no_período: Optional[float] = None
    rentab_patr_acumulada: Optional[float] = None
    vacancia_fisica: Optional[float] = None
    vacancia_financeira: Optional[float] = None
    quantidade_ativos: Optional[int] = None

    class Config:
        orm_mode = True


class AcaoBase(BaseModel):
    acao_id: Optional[int] = None
    codigo: Optional[str] = None
    nome: Optional[str] = None
    descricao: Optional[str] = None
    imagem: Optional[str] = None
    pl: Optional[float] = None
    pvp: Optional[float] = None
    psr: Optional[float] = None
    dividend_yield: Optional[float] = None
    p_ativo: Optional[float] = None
    p_cap_giro: Optional[float] = None
    p_ebit: Optional[float] = None
    p_ativ_circ_liq: Optional[float] = None
    ev_ebit: Optional[float] = None
    ev_ebitda: Optional[float] = None
    margem_ebit: Optional[float] = None
    margem_liquida: Optional[float] = None
    liq_corrente: Optional[float] = None
    roic: Optional[float] = None
    roe: Optional[float] = None
    liq_2meses: Optional[float] = None
    patrimonio_liquido: Optional[float] = None
    div_bruta_patrim: Optional[float] = None
    cresc_rec_5a: Optional[float] = None
    setor: Optional[str] = None
    lpa: Optional[float] = None
    vpa: Optional[float] = None
    cnpj: Optional[str] = None
    tipo: Optional[str] = None

    class Config:
        orm_mode = True
