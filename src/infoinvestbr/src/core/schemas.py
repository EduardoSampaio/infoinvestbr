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

    def __init__(self, usuario_id: int, nome: str, email: str, is_admin: bool,
                 imagem: Optional[str] = None):
        self.usuario_id = usuario_id
        self.nome = nome
        self.email = email
        self.imagem = imagem
        self.is_admin = is_admin


@dataclass()
class CotacaoSchema:
    codigo: str
    data: datetime.date
    abertura: float
    fechamento: float
    baixa: float
    alta: float

    def __int__(self, codigo: str,
                data: datetime.date,
                abertura: float,
                fechamento: float,
                baixa: float,
                alta: float):
        self.codigo = codigo
        self.data = data
        self.abertura = abertura
        self.fechamento = fechamento
        self.baixa = baixa
        self.alta = alta


@dataclass()
class DividendoSchema:
    codigo: str
    data: datetime.date
    valor: float

    def __int__(self, codigo: str,
                data: datetime.date,
                valor: float):
        self.codigo = codigo
        self.data = data
        self.valor = valor
