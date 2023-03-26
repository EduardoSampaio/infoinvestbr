from sqlalchemy.orm import Session
from src.core.models import Transacao
from src.core.schemas import TransacaoResponseSchema, TransacaoRequestSchema


def convert_schema(model: TransacaoResponseSchema) -> TransacaoResponseSchema:
    return TransacaoResponseSchema(
        usuario_id=model.usuario_id,
        categoria=model.categoria,
        corretora=model.corretora,
        ordem=model.ordem,
        quantidade=model.quantidade,
        preco=model.preco,
        total=model.total,
        data=model.data,
        codigo_ativo=model.codigo_ativo
    )


def create_transacao(db: Session, transacao: TransacaoRequestSchema) -> Transacao:
    _trasacao = Transacao(
        categoria=transacao.categoria,
        codigo_ativo=transacao.codigo_ativo,
        total=transacao.total,
        quantidade=transacao.quantidade,
        corretora=transacao.corretora,
        preco=transacao.preco,
        ordem=transacao.ordem,
        data=transacao.data
    )

    db.add(_trasacao)
    db.commit()
    db.refresh(_trasacao)
    return _trasacao


def get_transacao_by_id(db: Session, transacao_id: int) -> Transacao:
    return convert_schema(db.query(Transacao).filter(Transacao.transacao_id == transacao_id).first())


def get_transacao_by_codigo(db: Session, codigo_ativo: str) -> list[TransacaoResponseSchema]:
    _transacoes = db.query(Transacao).filter(Transacao.codigo_ativo == codigo_ativo).all()

    list_transacoes = []
    for transacao in _transacoes:
        list_transacoes.append(convert_schema(transacao))

    return list_transacoes


def update_transacao(db: Session, transacao: TransacaoRequestSchema):
    _transacao = get_transacao_by_id(db, transacao.transacao_id)
    _transacao.data = transacao.data
    _transacao.ordem = transacao.ordem
    _transacao.preco = transacao.preco
    _transacao.total = transacao.total
    _transacao.corretora = transacao.corretora
    _transacao.quantidade = transacao.quantidade
    _transacao.categoria = transacao.categoria
    _transacao.codigo_ativo = transacao.codigo_ativo

    db.commit()
    db.refresh(_transacao)


def remover_transacao(db: Session, transacao_id: int):
    _transacao = get_transacao_by_id(db, transacao_id)

    db.delete(_transacao)
    db.commit()
