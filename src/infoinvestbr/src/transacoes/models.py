from sqlalchemy import Boolean, Column, Integer, String, Numeric, DateTime, CheckConstraint, ForeignKey
from sqlalchemy.orm import relationship
from src.core.database import Base
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID


class Transacao(Base):
    __tablename__ = "transacoes"

    id = Column("TRANSACAO_ID", Integer, index=True, primary_key=True)
    categoria = Column("CATEGORIA", String(30), nullable=False)
    codigo_ativo = Column("CODIGO_ATIVO", String(10), nullable=False)
    ordem = Column("ORDEM", String(30), nullable=False)
    corretora = Column("CORRETORA", String, nullable=False)
    data = Column("DATA", DateTime, nullable=False)
    quantidade = Column("QUANTIDADE", Integer, nullable=False)
    preco = Column("PRECO", Numeric, nullable=False)
    total = Column("TOTAL", Numeric, nullable=False)
    ganho = Column("GANHO", Numeric, nullable=True)
    posicao_zerada = Column("POSICAO_ZERADA", Boolean, nullable=True, default=False)
    usuario_id = Column("USUARIO_ID", UUID, ForeignKey("usuarios.USUARIO_ID"), index=True)
    usuario = relationship("Usuario", back_populates="transacoes")
    imagem = Column("IMAGEM", String(200), nullable=True)
    patrimonios = relationship("Patrimonio", secondary="patrimonio_transacao", back_populates="transacoes")

    __table_args__ = (
        CheckConstraint(categoria.in_(['ACAO', 'FUNDO_IMOBILIARIO'])),
        CheckConstraint(ordem.in_(['COMPRA', 'VENDA'])),
    )

    def __init__(self,
                 categoria: str,
                 codigo_ativo: str,
                 ordem: str,
                 corretora: str,
                 data: datetime.date,
                 quantidade: str,
                 preco: float,
                 usuario_id: int,
                 imagem: str = ''):
        self.categoria = categoria
        self.codigo_ativo = codigo_ativo
        self.ordem = ordem
        self.corretora = corretora
        self.data = data
        self.quantidade = quantidade
        self.preco = preco
        self.total = preco * quantidade
        self.usuario_id = usuario_id
        self.imagem = imagem


class PatrimonioTransacao(Base):
    __tablename__ = 'patrimonio_transacao'
    transacao_id = Column("TRANSACAO_ID", Integer, ForeignKey('transacoes.TRANSACAO_ID'), index=True, primary_key=True)
    patrimonio_id = Column("PATRIMONIO_ID", Integer, ForeignKey('patrimonio.PATRIMONIO_ID'), index=True,
                           primary_key=True)

    def __int__(self, transacao_id, patrimonio_id):
        self.transacao_id = transacao_id
        self.patrimonio_id = patrimonio_id


class Patrimonio(Base):
    __tablename__ = "patrimonio"

    id = Column("PATRIMONIO_ID", Integer, index=True, primary_key=True)
    codigo_ativo = Column("CODIGO_ATIVO", String, index=True, unique=True)
    preco_medio = Column("PRECO_MEDIO", Numeric, nullable=False)
    quantidade = Column("QUANTIDADE", Integer, nullable=False)
    categoria = Column("CATEGORIA", String, nullable=False)
    total = Column("TOTAL", Numeric, nullable=False)
    usuario_id = Column("USUARIO_ID", UUID, ForeignKey("usuarios.USUARIO_ID"), index=True)
    transacoes = relationship("Transacao", secondary="patrimonio_transacao", back_populates="patrimonios")

    __table_args__ = (
        CheckConstraint(categoria.in_(['ACAO', 'FUNDO_IMOBILIARIO'])),
    )

    def __init__(self,
                 codigo_ativo,
                 preco_medio,
                 quantidade,
                 categoria,
                 usuario_id):
        self.codigo_ativo = codigo_ativo
        self.quantidade = quantidade
        self.usuario_id = usuario_id
        self.preco_medio = preco_medio
        self.categoria = categoria
        self.total = preco_medio * quantidade
