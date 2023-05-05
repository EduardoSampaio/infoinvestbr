from sqlalchemy import func
from sqlalchemy.orm import Session
from yfinance import Ticker
from uuid import UUID

from src.transacoes.models import Transacao
from src.analise.models import Acao, FundosImobiliario
from src.transacoes.schemas import TransacaoResponseSchema, TransacaoRequestUpdateSchema, TransacaoRequestCreateSchema,\
    PatrimonioSchemaResponse
from fastapi import HTTPException, status
from src.core.tipos import EnumTipoCategoria
import datetime
import yfinance as yf


def get_patrimonio_by_usuario_id(db: Session, usuario_id: UUID):
    query = db.query(Transacao.id,
                     Transacao.usuario_id,
                     Transacao.imagem,
                     Transacao.codigo_ativo,
                     Transacao.categoria,
                     (func.sum(Transacao.total) / func.sum(Transacao.quantidade)).label("preco"),
                     func.sum(Transacao.quantidade).label("quantidade"),
                     func.sum(Transacao.total).label("total_investido")) \
        .filter(Transacao.usuario_id == usuario_id) \
        .distinct(Transacao.codigo_ativo) \
        .group_by(Transacao.id, Transacao.usuario_id, Transacao.imagem, Transacao.codigo_ativo, Transacao.categoria) \
        .all()

    return get_patrimonio_by_usuario(query)


def create_transacao(db: Session, transacao: TransacaoRequestCreateSchema):
    _transacao_db = create_transacao_model(db, transacao)

    if _transacao_db.ordem == "VENDA":
        validar_quantidade_venda(_transacao_db, db, transacao)

    db.add(_transacao_db)
    db.commit()
    db.refresh(_transacao_db)

    return _transacao_db


def get_transacoes_by_usuario_id(db: Session, usuario_id: UUID) -> Transacao:
    _transacoes = db.query(Transacao).filter(Transacao.usuario_id == usuario_id).order_by(Transacao.data).all()

    list_transacoes = []
    for transacao in _transacoes:
        list_transacoes.append(convert_schema(transacao))

    return list_transacoes


def update_transacao(db: Session, transacao: TransacaoRequestUpdateSchema):
    _transacao = db.query(Transacao).filter(Transacao.id == transacao.id).first()
    _transacao.data = convert_date_us(transacao.data)
    _transacao.preco = transacao.preco
    _transacao.corretora = transacao.corretora
    _transacao.quantidade = transacao.quantidade

    db.commit()
    db.refresh(_transacao)


def remover_transacao(db: Session, transacao_id: int):
    _transacao: Transacao = db.query(Transacao).filter(Transacao.id == transacao_id).first()
    if _transacao is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Transação inexistente"
        )

    db.delete(_transacao)
    db.commit()


def validar_codigo(db: Session, codigo: str, categoria: EnumTipoCategoria):
    if categoria.name == EnumTipoCategoria.ACAO.name:
        exist = db.query(Acao).filter(Acao.codigo == codigo).first()
        if exist is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Código da ação é inexistente"
            )
        else:
            return exist
    else:
        exist = db.query(FundosImobiliario).filter(FundosImobiliario.codigo == codigo).first()
        if exist is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Código do fundo imobiliário é inexistente"
            )
        else:
            return exist


def get_patrimonio_by_usuario(query: any) -> list[PatrimonioSchemaResponse]:
    list_valores_acao = []
    list_valores_fundos = []
    for valor in query:
        if valor.categoria == 'ACAO':
            list_valores_acao.append(convert_patrimonio_schema(valor, query))
        else:
            list_valores_fundos.append(convert_patrimonio_schema(valor, query))

    obj = totalizacao(list_valores_acao, list_valores_fundos)
    return obj


def convert_patrimonio_schema(valor: any, valores: []) -> PatrimonioSchemaResponse:
    ticker = yf.Ticker(f'{valor.codigo_ativo}.SA')
    variacao_total = calcular_variacao_total(ticker, valor.preco, valor.quantidade)
    rentabilidade = calcular_rentabilidade(ticker, valor.preco)
    percentual_ativo = calcular_percentual_ativo(valor, valores)
    percentual_carteira = calcular_percentual_carteira(valor, valores)

    return PatrimonioSchemaResponse(
        id=valor.id,
        usuario_id=valor.usuario_id,
        quantidade=valor.quantidade,
        codigo_ativo=valor.codigo_ativo,
        preco_medio=valor.preco,
        categoria=get_enum_categoria(valor.categoria),
        total=float(valor.preco) * valor.quantidade,
        rentabilidade=rentabilidade,
        variacao_total=variacao_total,
        percentual_ativo=percentual_ativo,
        variacao_diaria=0,
        percentual_carteira=percentual_carteira,
        imagem=valor.imagem,
        preco=get_preco_ultimo_fechamento(ticker)
    )


def calcular_rentabilidade(codigo_ativo: Ticker, preco_medio: float) -> float:
    """
    ROI = [(Preço atual da ação - Preço de compra da ação) / Preço de compra da ação] x 100
    :param codigo_ativo:
    :param preco_medio:
    :return: rentabilidade
    """
    preco_atual = get_preco_ultimo_fechamento(codigo_ativo)
    return ((float(preco_atual) - float(preco_medio)) / float(preco_medio)) * 100


def calcular_variacao_total(codigo_ativo: Ticker, preco_inicial: float, quantidade: int):
    """
    variacao_total =  (preco_atual - preco_inicial) * quantidade
    :param codigo_ativo:
    :param preco_inicial:
    :param quantidade:
    :return:
    """
    preco_atual = get_preco_ultimo_fechamento(codigo_ativo)
    variacao_total = (float(preco_atual) - float(preco_inicial)) * quantidade
    return variacao_total


def calcular_percentual_ativo(valor: any, valores: []):
    """
     percentual_ativo = (total_ativo / soma(list_model) mesma categoria) * 100
    :param valor:
    :param valores:
    :return:
    """
    soma_ativos = 0.0
    percentual = 0.0
    for model in valores:
        if model.categoria == valor.categoria:
            soma_ativos += float(model.quantidade) * float(model.preco)

    if soma_ativos != 0:
        percentual = (float(valor.quantidade) * float(valor.preco)) / float(soma_ativos) * 100
    return percentual


def calcular_percentual_carteira(valor: any, valores: []):
    """
     percentual_carteira = (total_ativo / soma(list_model)) * 100
    :param valor:
    :param valores:
    :return:
    """
    soma_ativos = 0.0
    percentual = 0.0
    for model in valores:
        soma_ativos += float(model.quantidade) * float(model.preco)

    if soma_ativos != 0:
        percentual = (float(valor.quantidade) * float(valor.preco)) / float(soma_ativos) * 100
    return percentual


def convert_date_us(datestr: str):
    dia, mes, ano = datestr.split('/')
    new_date = datetime.date(int(ano), int(mes), int(dia))
    return new_date


def get_preco_ultimo_fechamento(ticker: Ticker) -> float:
    return ticker.info.get('previousClose')


def get_by_codigo_variacao_diaria(ticker: Ticker):
    fechamento_anterior = ticker.history(period="2d")['Close'][-2]
    fechamento_atual = ticker.info.get('previousClose')
    return fechamento_atual, fechamento_anterior


def totalizacao(list_valores_acoes: list[PatrimonioSchemaResponse],
                list_valores_fundos: list[PatrimonioSchemaResponse]):
    soma_total_acao = 0.0
    soma_variacao_total_acao = 0.0

    for valor in list_valores_acoes:
        soma_total_acao += float(valor.total)
        soma_variacao_total_acao += float(valor.variacao_total)

    total_porcentagem_acao = 0.0
    if total_porcentagem_acao != 0:
        total_porcentagem_acao = (float(soma_variacao_total_acao) / float(soma_total_acao)) * 100

    soma_total_fundo = 0.0
    soma_variacao_total_fundo = 0.0
    for valor in list_valores_fundos:
        soma_total_fundo += float(valor.total)
        soma_variacao_total_fundo += float(valor.variacao_total)

    total_porcentagem_fundo = 0.0
    if soma_total_fundo != 0:
        total_porcentagem_fundo = (float(soma_variacao_total_fundo) / float(soma_total_fundo)) * 100

    total_patrimonio = float(soma_total_fundo) + float(soma_total_acao)

    total_investido = float(total_patrimonio) - float(soma_variacao_total_acao) - float(soma_variacao_total_fundo)

    rentabilidade_total = 0.0
    if total_patrimonio != 0:
        rentabilidade_total = ((float(soma_variacao_total_acao) - float(soma_variacao_total_fundo)) / float(
            total_patrimonio)) * 100

    ganhos_totais = float(soma_variacao_total_acao) + float(soma_variacao_total_fundo)

    return {
        "acoes": list_valores_acoes,
        "ganho_acoes": soma_variacao_total_acao,
        "total_porcentagem_acao": total_porcentagem_acao,
        "total_acao": soma_total_acao,
        "fundos": list_valores_fundos,
        "ganho_fundo": soma_variacao_total_fundo,
        "total_fundo": soma_total_fundo,
        "total_patrimonio": total_patrimonio,
        "total_porcentagem_fundo": total_porcentagem_fundo,
        "total_investido": total_investido,
        "rentabilidade_total": rentabilidade_total,
        "ganhos_totais": ganhos_totais
    }


def quantidade_by_ordem(ordem: str, quantidade: int):
    if ordem == "COMPRA":
        return quantidade
    else:
        return -quantidade


def get_image_categoria(categoria: str, ativo):
    if categoria == 'ACAO':
        return ativo.imagem
    else:
        return ""


def get_enum_categoria(categoria: str):
    if categoria == 'ACAO':
        return 'Ação'
    else:
        return 'Fundo Imobiliário'


def get_enum_ordem(ordem: str):
    if ordem == 'COMPRA':
        return 'Compra'
    else:
        return 'Venda'


def get_imagem(model: Transacao):
    if model.categoria == 'ACAO':
        if model.imagem is None:
            return '/img/acao.svg'
        else:
            return f'/img/acoes/{model.imagem}.jpg'
    else:
        return '/img/fiis.svg'


def convert_schema(model: Transacao) -> TransacaoResponseSchema:
    return TransacaoResponseSchema(
        categoria=get_enum_categoria(model.categoria),
        corretora=model.corretora,
        ordem=get_enum_ordem(model.ordem),
        quantidade=model.quantidade,
        preco=model.preco,
        total=model.total,
        data=model.data,
        codigo_ativo=model.codigo_ativo,
        id=model.id,
        usuario_id=model.usuario_id,
        imagem=get_imagem(model)
    )


def create_transacao_model(db, transacao):
    ativo = validar_codigo(db, transacao.codigo_ativo, transacao.categoria)
    return Transacao(
        categoria=transacao.categoria.name,
        codigo_ativo=transacao.codigo_ativo,
        quantidade=quantidade_by_ordem(transacao.ordem.name, transacao.quantidade),
        corretora=transacao.corretora,
        preco=transacao.preco,
        ordem=transacao.ordem.name,
        data=convert_date_us(transacao.data),
        usuario_id=transacao.usuario_id,
        imagem=get_image_categoria(transacao.categoria.name, ativo),
        corretagem=transacao.corretagem,
        outro=transacao.outro
    )


def validar_quantidade_venda(_transacao_db, db, transacao):
    qtd_total = db.query(func.sum(Transacao.quantidade).label('total')).filter(
        Transacao.usuario_id == _transacao_db.usuario_id
        and _transacao_db.codigo_ativo == transacao.codigo_ativo).first()
    if qtd_total.total <= transacao.quantidade:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Quantidade Indisponível para venda"
        )
