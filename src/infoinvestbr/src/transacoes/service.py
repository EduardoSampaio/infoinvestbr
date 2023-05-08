from sqlalchemy import func
from sqlalchemy.orm import Session
from yfinance import Ticker
from uuid import UUID

from src.core.models import CotacaoAtivo
from src.transacoes.models import Transacao
from src.analise.models import Acao, FundosImobiliario
from src.transacoes.schemas import TransacaoResponseSchema, TransacaoRequestUpdateSchema, TransacaoRequestCreateSchema,\
    PatrimonioSchemaResponse
from fastapi import HTTPException, status
from src.core.tipos import EnumTipoCategoria
import datetime


def get_chart_patrimonio(valores: any):
    soma_total = 0.0
    soma_total_acoes = 0.0
    soma_total_fundos = 0.0
    valor_acao = 0.0
    valor_fundo = 0.0
    for valor in valores:
        soma_total += float(valor.preco) * valor.quantidade
        if valor.categoria == "ACAO" and valor.quantidade != 0:
            soma_total_acoes += float(valor.preco) * valor.quantidade
        elif valor.categoria == "FUNDO_IMOBILIARIO" and valor.quantidade != 0:
            soma_total_fundos += float(valor.preco) * valor.quantidade

    list_ativos = []
    if soma_total != 0:
        valor_acao = (soma_total_acoes / soma_total) * 100
        valor_fundo = (soma_total_fundos / soma_total) * 100
        for valor in valores:
            resultado = (float(valor.total_investido) / soma_total) * 100
            list_ativos.append({"value": resultado, "name": valor.codigo_ativo})

    return {
        "composicao": [
            {"value": valor_acao, "name": "Ações"},
            {"value": valor_fundo, "name": "Fundos Imobiliários"},
        ],
        "ativos": list_ativos
    }


def get_patrimonio_by_usuario_id(db: Session, usuario_id: UUID):
    count = db.query(CotacaoAtivo).count()
    if count == 0:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="A Carteira esta sendo atualizado no momento por favor tente mais tarde"
        )
    else:
        query = db.query(Transacao.usuario_id,
                         Transacao.imagem,
                         Transacao.codigo_ativo,
                         Transacao.categoria,
                         CotacaoAtivo.preco,
                         func.sum(Transacao.quantidade).label("quantidade"),
                         func.sum(Transacao.total).label("total_investido")) \
            .join(CotacaoAtivo, CotacaoAtivo.codigo == Transacao.codigo_ativo) \
            .filter(CotacaoAtivo.codigo == Transacao.codigo_ativo) \
            .distinct(Transacao.codigo_ativo) \
            .filter(Transacao.usuario_id == usuario_id) \
            .group_by(Transacao.usuario_id, Transacao.imagem, Transacao.codigo_ativo, Transacao.categoria,
                      CotacaoAtivo.preco) \
            .all()

        patrimonio = calcular_patrimonio(query)
        chart = get_chart_patrimonio(query)
        return {
            "patrimonio": patrimonio,
            "chart": chart
        }


def create_transacao(db: Session, transacao: TransacaoRequestCreateSchema):
    _transacao_db = create_transacao_model(db, transacao)

    if _transacao_db.ordem == "VENDA":
        qtd_total = db.query(func.sum(Transacao.quantidade).label('total')).filter(
            Transacao.usuario_id == _transacao_db.usuario_id
            and _transacao_db.codigo_ativo == transacao.codigo_ativo).first()
        if qtd_total.total is None or qtd_total.total < transacao.quantidade:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Quantidade Indisponível para venda"
            )

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
    _transacao.total = transacao.quantidade * transacao.preco

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


def calcular_patrimonio(query: any) -> list[PatrimonioSchemaResponse]:
    list_valores_acao = []
    list_valores_fundos = []
    for valor in query:
        if valor.categoria == 'ACAO' and valor.quantidade != 0:
            list_valores_acao.append(convert_patrimonio_schema(valor, query))
        elif valor.categoria == 'FUNDO_IMOBILIARIO' and valor.quantidade != 0:
            list_valores_fundos.append(convert_patrimonio_schema(valor, query))

    obj = totalizacao(list_valores_acao, list_valores_fundos)
    return obj


def convert_patrimonio_schema(valor: any, valores: []) -> PatrimonioSchemaResponse:
    preco_atual = valor.preco
    preco_medio = float(valor.total_investido) / valor.quantidade
    variacao_total = calcular_variacao_total(preco_atual, preco_medio, valor.quantidade)
    rentabilidade = calcular_rentabilidade(preco_atual, preco_medio)
    percentual_ativo = calcular_percentual_ativo(valor, valores, preco_atual)
    percentual_carteira = calcular_percentual_carteira(valor, valores, preco_atual)
    total = preco_atual * valor.quantidade

    return PatrimonioSchemaResponse(
        quantidade=valor.quantidade,
        codigo_ativo=valor.codigo_ativo,
        preco_medio=preco_medio,
        categoria=get_enum_categoria(valor.categoria),
        total=total,
        rentabilidade=rentabilidade,
        variacao_total=variacao_total,
        percentual_ativo=percentual_ativo,
        variacao_diaria=0,
        percentual_carteira=percentual_carteira,
        imagem=valor.imagem,
        preco=preco_atual
    )


def calcular_rentabilidade(preco_atual: float, preco_medio: float) -> float:
    """
    ROI = [(Preço atual da ação - Preço de compra da ação) / Preço de compra da ação] x 100
    :param preco_atual:
    :param preco_medio:
    :return: rentabilidade
    """
    return ((float(preco_atual) - float(preco_medio)) / float(preco_medio)) * 100


def calcular_variacao_total(preco_atual: float, preco_inicial: float, quantidade: int):
    """
    variacao_total =  (preco_atual - preco_inicial) * quantidade
    :param preco_atual:
    :param preco_inicial:
    :param quantidade:
    :return:
    """
    variacao_total = (float(preco_atual) - float(preco_inicial)) * quantidade
    return variacao_total


def calcular_percentual_ativo(valor: any, valores: [], preco_atual: float):
    """
     percentual_ativo = (total_ativo / soma(list_model) mesma categoria) * 100
    :param valor:
    :param valores:
    :param preco_atual:
    :return:
    """
    soma_ativos = 0.0
    percentual = 0.0
    for model in valores:
        if model.categoria == valor.categoria:
            soma_ativos += float(model.preco) * model.quantidade

    if soma_ativos != 0:
        percentual = (float(preco_atual) * valor.quantidade / float(soma_ativos)) * 100
    return percentual


def calcular_percentual_carteira(valor: any, valores: [], preco_atual: float):
    """
     percentual_carteira = (total_ativo / soma(list_model)) * 100
    :param valor:
    :param valores:
      :param preco_atual:
    :return:
    """
    soma_ativos = 0.0
    percentual = 0.0
    for model in valores:
        soma_ativos += float(model.preco) * model.quantidade

    if soma_ativos != 0:
        percentual = (float(preco_atual) * valor.quantidade / float(soma_ativos)) * 100
    return percentual


def convert_date_us(datestr: str):
    dia, mes, ano = datestr.split('/')
    new_date = datetime.date(int(ano), int(mes), int(dia))
    return new_date


def get_preco_ultimo_fechamento(ticker: Ticker) -> float:
    result = ticker.history(period="1mo")
    if result.empty:
        return 0.0
    else:
        return result.tail(1)['Close'][0]


def totalizacao(list_valores_acoes: list[PatrimonioSchemaResponse],
                list_valores_fundos: list[PatrimonioSchemaResponse]):
    soma_total_acao = 0.0
    soma_variacao_total_acao = 0.0

    for valor in list_valores_acoes:
        soma_total_acao += float(valor.total)
        soma_variacao_total_acao += float(valor.variacao_total)

    total_porcentagem_acao = 0.0
    if soma_total_acao != 0:
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
        rentabilidade_total = ((float(soma_variacao_total_acao) + float(soma_variacao_total_fundo)) / float(
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
