import datetime
from dataclasses import dataclass
from typing import Optional, TypeVar
from uuid import UUID
from pydantic import BaseModel, Field, validator
from pydantic.generics import GenericModel, Generic
from src.core import validators

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

    @validator('nome', always=True, pre=True)
    def validar_nome(cls, v):
        validators.required(v, "Nome")
        validators.max_length(30, v, "Nome")
        validators.min_length(4, v, "Nome")
        return v

    @validator('email', always=True, pre=True)
    def validar_email(cls, v):
        validators.required(v, "Email")
        validators.validar_email(v)
        validators.validar_email_existente(v)
        return v


class UsuarioRequestSchema(UsuarioBaseSchema):
    senha: str = Field(min_length=6, max_length=30)
    confirmar_senha: str = Field(min_length=6, max_length=30)

    @validator('confirmar_senha', always=True, pre=True)
    def confirmacao_senha(cls, v, values):
        validators.min_length(4, v, "Nome")
        if 'senha' in values and v != values['senha']:
            raise ValueError('Por favor confirme sua senha!')
        return v


@dataclass
class UsuarioResponseSchema:
    usuario_id: UUID
    is_admin: bool
    nome: str
    email: str
    imagem: Optional[str] = None

    def __init__(self, usuario_id: UUID, nome: str, email: str, is_admin: bool,
                 imagem: Optional[str] = None):
        self.usuario_id = usuario_id
        self.nome = nome
        self.email = email
        self.imagem = imagem
        self.is_admin = is_admin


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
