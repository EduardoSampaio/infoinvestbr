import uuid

from sqlalchemy import Boolean, Column, String, DateTime, Integer, Numeric, Date, text
from sqlalchemy.orm import relationship
from src.core.database import Base
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column("USUARIO_ID", UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
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


class CotacaoAtivo(Base):
    __tablename__ = "cotacao_ativos"

    id = Column("ID", Integer, index=True, primary_key=True)
    codigo = Column("CODIGO", String(30), index=True, unique=True, nullable=False)
    preco = Column("PRECO", Numeric, nullable=False)
    data = Column("DATA", Date, nullable=False)
