from sqlalchemy.orm import Session
from yfinance import Ticker

from src.transacoes.models import Transacao, Patrimonio, PatrimonioTransacao
from src.analise.models import Acao, FundosImobiliario
from src.transacoes.schemas import TransacaoResponseSchema, TransacaoRequestUpdateSchema, TransacaoRequestCreateSchema, \
    PatrimonioSchemaResponse
from fastapi import HTTPException, status
from src.core.tipos import EnumTipoCategoria
import datetime
import yfinance as yf


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


def create_transacao(db: Session, transacao: TransacaoRequestCreateSchema):
    _trasacao = create_transacao_model(db, transacao)

    patrimonio_exists = db.query(Patrimonio).filter(Patrimonio.codigo_ativo == transacao.codigo_ativo
                                                    and Patrimonio.usuario_id == transacao.usuario_id).first()
    if patrimonio_exists is not None:
        if transacao.ordem.name == "COMPRA":
            atualizar_patrimonio_compra(patrimonio_exists, _trasacao)
            db.add(_trasacao)
            db.commit()
            db.refresh(_trasacao)
            db.refresh(patrimonio_exists)
        else:
            atualizar_patrimonio_venda(db, patrimonio_exists, _trasacao)
            db.add(_trasacao)
            db.commit()
            db.refresh(_trasacao)

    elif transacao.ordem.name == "VENDA":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não é possivel vender ativo que não possui"
        )
    else:
        _patrimonio = create_patrimonio(_trasacao)
        db.add(_patrimonio)
        db.add(_trasacao)
        db.flush()

        _patrimonio_transacao = PatrimonioTransacao(
            transacao_id=_trasacao.id,
            patrimonio_id=_patrimonio.id
        )

        db.add(_patrimonio_transacao)
        db.commit()
        db.refresh(_trasacao)
        db.refresh(_patrimonio)
        db.refresh(_patrimonio_transacao)

    return _trasacao


def create_transacao_model(db, transacao):
    ativo = validar_codigo(db, transacao.codigo_ativo, transacao.categoria)
    if transacao.categoria.name == 'ACAO':
        _trasacao = Transacao(
            categoria=transacao.categoria.name,
            codigo_ativo=transacao.codigo_ativo,
            quantidade=transacao.quantidade,
            corretora=transacao.corretora,
            preco=transacao.preco,
            ordem=transacao.ordem.name,
            data=convert_date_us(transacao.data),
            usuario_id=transacao.usuario_id,
            imagem=ativo.imagem,
            corretagem=transacao.corretagem,
            outro=transacao.outro
        )
    else:
        _trasacao = Transacao(
            categoria=transacao.categoria.name,
            codigo_ativo=transacao.codigo_ativo,
            quantidade=transacao.quantidade,
            corretora=transacao.corretora,
            preco=transacao.preco,
            ordem=transacao.ordem.name,
            data=convert_date_us(transacao.data),
            usuario_id=transacao.usuario_id,
            corretagem=transacao.corretagem,
            outro=transacao.outro
        )
    return _trasacao


def atualizar_patrimonio_venda(db, patrimonio_exists, transacao):
    verificar_quantidade_ativo(patrimonio_exists, transacao)
    patrimonio_exists.quantidade = patrimonio_exists.quantidade - transacao.quantidade
    transacao.lucro_prejuizo = (float(transacao.preco) - float(patrimonio_exists.preco_medio)) * transacao.quantidade
    if patrimonio_exists.quantidade == 0:
        transacao.posicao_zerada = True
        patrimonio_transacao = db.query(PatrimonioTransacao).filter(
            PatrimonioTransacao.patrimonio_id == patrimonio_exists.id).first()
        db.delete(patrimonio_transacao)
        db.delete(patrimonio_exists)


def atualizar_patrimonio_compra(patrimonio_exists, transacao):
    total_transacao = transacao.preco * transacao.quantidade
    total_patrimonio_qtd = patrimonio_exists.quantidade + transacao.quantidade
    preco_medio = (float(patrimonio_exists.total) + float(total_transacao)) / total_patrimonio_qtd
    patrimonio_exists.total = float(patrimonio_exists.total) + float(total_transacao)
    patrimonio_exists.quantidade = total_patrimonio_qtd
    patrimonio_exists.preco_medio = preco_medio


def verificar_quantidade_ativo(patrimonio_exists, transacao):
    if transacao.quantidade > patrimonio_exists.quantidade:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não permitido vender uma quantidade superior a quantidade existente na sua carteira"
        )


def create_patrimonio(transacao: Transacao):
    return Patrimonio(
        codigo_ativo=transacao.codigo_ativo,
        categoria=transacao.categoria,
        usuario_id=transacao.usuario_id,
        quantidade=transacao.quantidade,
        preco_medio=transacao.preco,
        imagem=transacao.imagem
    )


def get_transacao_by_usuario_id(db: Session, usuario_id: int) -> Transacao:
    return convert_schema(db.query(Transacao).filter(Transacao.usuario_id == usuario_id).first())


def get_transacoes_by_usuario_id(db: Session, usuario_id: int) -> Transacao:
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
    else:
        patrimonio_exists = db.query(Patrimonio).filter(Patrimonio.codigo_ativo == _transacao.codigo_ativo
                                                        and Patrimonio.usuario_id == _transacao.usuario_id).first()
        if patrimonio_exists is not None:
            if _transacao.ordem == "VENDA":
                atualizar_patrimonio_compra(patrimonio_exists, _transacao)
            else:
                atualizar_patrimonio_venda(db, patrimonio_exists, _transacao)

        db.refresh(patrimonio_exists)
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


def get_patrimonio_by_usuario(db: Session, usuario_id: str) -> list[PatrimonioSchemaResponse]:
    valores = db.query(Patrimonio).filter(Patrimonio.usuario_id == usuario_id).all()

    list_valores_acao = []
    list_valores_fundos = []
    for valor in valores:
        if valor.categoria == 'ACAO':
            list_valores_acao.append(convert_patrimonio_schema(valor, valores))
        else:
            list_valores_fundos.append(convert_patrimonio_schema(valor, valores))

    obj = totalizacao(list_valores_acao, list_valores_fundos)
    return obj


def convert_patrimonio_schema(model: Patrimonio, list_model: list[Patrimonio]) -> PatrimonioSchemaResponse:
    ticker = yf.Ticker(f'{model.codigo_ativo}.SA')
    variacao_total = calcular_variacao_total(ticker, model.preco_medio, model.quantidade)
    variacao_diaria, variacao_diaria_porcentagem = calcular_variacao_diaria(ticker, model.total)
    rentabilidade = calcular_rentabilidade(ticker, model.preco_medio)
    percentual_ativo = calcular_percentual_ativo(model, list_model)
    percentual_carteira = calcular_percentual_carteira(model, list_model)
    return PatrimonioSchemaResponse(
        id=model.id,
        usuario_id=model.usuario_id,
        quantidade=model.quantidade,
        codigo_ativo=model.codigo_ativo,
        preco_medio=model.preco_medio,
        categoria=get_enum_categoria(EnumTipoCategoria[model.categoria].name),
        total=model.total,
        rentabilidade=rentabilidade,
        variacao_total=variacao_total,
        percentual_ativo=percentual_ativo,
        variacao_diaria=variacao_diaria,
        percentual_carteira=percentual_carteira,
        imagem=model.imagem,
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


def calcular_variacao_diaria(codigo_ativo: Ticker, total: float) -> float:
    """
    porcentagem = ((preco_fechamento_atual - preco_fechamento_dia_anterior) / preco_fechamento_dia_anterior) * 100
    variacao = (total / 100) * porcentagem
    :param codigo_ativo:
    :param total:
    :return:
    """
    preco = get_by_codigo_variacao_diaria(codigo_ativo)
    preco_fechamento_dia_anterior = float(preco[1])
    preco_fechamento_atual = float(preco[0])
    porcentagem = ((float(preco_fechamento_atual) - float(preco_fechamento_dia_anterior)) / float(
        preco_fechamento_dia_anterior)) * 100
    variacao = (float(total / 100)) * porcentagem
    return variacao, porcentagem


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


def calcular_percentual_ativo(current_model: Patrimonio, list_model: list[Patrimonio]):
    """
     percentual_ativo = (total_ativo / soma(list_model) mesma categoria) * 100
    :param current_model:
    :param list_model:
    :return:
    """
    soma_ativos = 0
    for model in list_model:
        if model.categoria == current_model.categoria:
            soma_ativos += model.total

    percentual = current_model.total / soma_ativos * 100
    return percentual


def calcular_percentual_carteira(current_model: Patrimonio, list_model: list[Patrimonio]):
    """
     percentual_carteira = (total_ativo / soma(list_model)) * 100
    :param current_model:
    :param list_model:
    :return:
    """
    soma_ativos = 0
    for model in list_model:
        soma_ativos += model.total

    percentual = current_model.total / soma_ativos * 100
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

    total_porcentagem_acao = (float(soma_variacao_total_acao) / float(soma_total_acao)) * 100

    soma_total_fundo = 0.0
    soma_variacao_total_fundo = 0.0
    for valor in list_valores_fundos:
        soma_total_fundo += float(valor.total)
        soma_variacao_total_fundo += float(valor.variacao_total)

    total_porcentagem_fundo = (float(soma_variacao_total_fundo) / float(soma_total_fundo)) * 100

    total_patrimonio = float(soma_total_fundo) + float(soma_total_acao)

    total_investido = float(total_patrimonio) - float(soma_variacao_total_acao) - float(soma_variacao_total_fundo)

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
