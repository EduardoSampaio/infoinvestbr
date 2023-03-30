import uuid

from sqlalchemy import Boolean, Column, Integer, String, Numeric, DateTime, CheckConstraint, text
from sqlalchemy.orm import relationship
from src.core.database import Base
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column("USUARIO_ID", UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    nome = Column("NOME", String(30), nullable=False)
    imagem = Column("IMAGEM", String(200), nullable=True)
    email = Column("EMAIL", String(30), unique=True, index=True, nullable=False)
    is_admin = Column("IS_ADMIN", Boolean, default=False)
    senha = Column("SENHA", String(100), nullable=True)
    created_at = Column("CREATED_AT", DateTime, default=datetime.utcnow())
    transacoes = relationship("Transacao", back_populates="usuario")

    def __init__(self, nome: str, email: str, senha: str = None, imagem: str = None):
        self.nome = nome
        self.email = email
        self.senha = senha
        self.imagem = imagem


class HistoricoCotacao(Base):
    __tablename__ = "historico"

    id = Column("ID", Integer, index=True, primary_key=True)
    codigo = Column("CODIGO", String, index=True, nullable=False)
    data = Column("DATA", DateTime, nullable=False)
    valor = Column("VALOR", Numeric, nullable=False)
    periodo = Column("PERIODO", String(3), nullable=False, index=True)

    __table_args__ = (CheckConstraint(periodo.in_(['1d', '5d', '1mo', '3mo', '6mo', '1y', 'ytd', 'max'])),)

    def __int__(self, codigo, data, valor, periodo):
        self.codigo = codigo
        self.data = data
        self.valor = valor
        self.periodo = periodo
