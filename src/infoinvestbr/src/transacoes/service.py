from sqlalchemy.orm import Session
from src.core.models import Transacao, Patrimonio, PatrimonioTransacao, Acao, FundosImobiliario
from src.core.schemas import TransacaoResponseSchema, TransacaoRequestSchema
from fastapi import HTTPException, status
from src.core.tipos import TipoCategoria


def convert_schema(model: TransacaoResponseSchema) -> TransacaoResponseSchema:
    return TransacaoResponseSchema(
        categoria=model.categoria,
        corretora=model.corretora,
        ordem=model.ordem,
        quantidade=model.quantidade,
        preco=model.preco,
        total=model.total,
        data=model.data,
        codigo_ativo=model.codigo_ativo,
        transacao_id=model.transacao_id,
        usuario_id=model.usuario_id
    )


def create_transacao(db: Session, transacao: TransacaoRequestSchema) -> Transacao:
    _trasacao = Transacao(
        categoria=transacao.categoria,
        codigo_ativo=transacao.codigo_ativo,
        quantidade=transacao.quantidade,
        corretora=transacao.corretora,
        preco=transacao.preco,
        ordem=transacao.ordem,
        data=transacao.data,
        usuario_id=transacao.usuario_id
    )

    patrimonio_exists = db.query(Patrimonio).filter(Patrimonio.codigo_ativo == transacao.codigo_ativo
                                                    and Patrimonio.usuario_id == transacao.usuario_id).first()
    if patrimonio_exists is not None:
        if transacao.ordem == "Compra":
            atualizar_patrimonio_compra(patrimonio_exists, transacao)
            db.add(_trasacao)
            db.commit()
            db.refresh(_trasacao)
            db.refresh(patrimonio_exists)
        else:
            atualizar_patrimonio_venda(_trasacao, db, patrimonio_exists, transacao)
            db.add(_trasacao)
            db.commit()
            db.refresh(_trasacao)

    else:
        _patrimonio = create_patrimonio(transacao)
        db.add(_patrimonio)
        db.add(_trasacao)
        db.flush()

        _patrimonio_transacao = PatrimonioTransacao(
            transacao_id=_trasacao.transacao_id,
            patrimonio_id=_patrimonio.patrimonio_id
        )

        db.add(_patrimonio_transacao)
        db.commit()
        db.refresh(_trasacao)
        db.refresh(_patrimonio)
        db.refresh(_patrimonio_transacao)

    return _trasacao


def atualizar_patrimonio_venda(_trasacao, db, patrimonio_exists, transacao):
    verificar_quantidade_ativo(patrimonio_exists, transacao)
    patrimonio_exists.quantidade = patrimonio_exists.quantidade - transacao.quantidade
    _trasacao.resultado = (_trasacao.preco - float(patrimonio_exists.preco_medio)) * transacao.quantidade
    zerar_posicao_ativo(db, patrimonio_exists)


def atualizar_patrimonio_compra(patrimonio_exists, transacao):
    total_transacao = transacao.preco * transacao.quantidade
    total_patrimonio_qtd = patrimonio_exists.quantidade + transacao.quantidade
    preco_medio = (float(patrimonio_exists.total) + total_transacao) / total_patrimonio_qtd
    patrimonio_exists.quantidade = total_patrimonio_qtd
    patrimonio_exists.preco_medio = preco_medio


def verificar_quantidade_ativo(patrimonio_exists, transacao):
    if transacao.quantidade > patrimonio_exists.quantidade:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não permitido vender uma quantidade superior a quantidade existente na sua carteira"
        )


def zerar_posicao_ativo(db, patrimonio_exists):
    if patrimonio_exists.quantidade == 0:
        patrimonio_transacao = db.query(PatrimonioTransacao).filter(
            PatrimonioTransacao.patrimonio_id == patrimonio_exists.patrimonio_id).first()
        db.delete(patrimonio_transacao)
        db.delete(patrimonio_exists)


def create_patrimonio(transacao: Transacao):
    return Patrimonio(
        codigo_ativo=transacao.codigo_ativo,
        categoria=transacao.categoria,
        usuario_id=transacao.usuario_id,
        quantidade=transacao.quantidade,
        preco_medio=transacao.preco
    )


def get_transacao_by_usuario_id(db: Session, usuario_id: int) -> Transacao:
    return convert_schema(db.query(Transacao).filter(Transacao.usuario_id == usuario_id).first())


def get_transacao_by_codigo(db: Session, codigo_ativo: str) -> list[TransacaoResponseSchema]:
    _transacoes = db.query(Transacao).filter(Transacao.codigo_ativo == codigo_ativo).all()

    list_transacoes = []
    for transacao in _transacoes:
        list_transacoes.append(convert_schema(transacao))

    return list_transacoes


def update_transacao(db: Session, transacao: TransacaoRequestSchema):
    _transacao = get_transacao_by_usuario_id(db, transacao.usuario_id)
    _transacao.data = transacao.data
    _transacao.ordem = transacao.ordem
    _transacao.preco = transacao.preco
    _transacao.corretora = transacao.corretora
    _transacao.quantidade = transacao.quantidade
    _transacao.categoria = transacao.categoria
    _transacao.codigo_ativo = transacao.codigo_ativo

    db.commit()
    db.refresh(_transacao)


def remover_transacao(db: Session, usuario_id: int):
    _transacao = get_transacao_by_usuario_id(db, usuario_id)

    db.delete(_transacao)
    db.commit()


def validar_codigo(db: Session, codigo: str, categoria: TipoCategoria):
    if categoria.name == TipoCategoria.ACAO.name:
        exist = db.query(Acao).filter(Acao.codigo == codigo).first()
        if exist is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Código da ação é inesistente"
            )
    else:
        exist = db.query(FundosImobiliario).filter(Acao.codigo == codigo).first()
        if exist is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Código do fundo imobiliário é inesistente"
            )
