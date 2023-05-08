from src.core.database import SessionLocal
from src.core.models import CotacaoAtivo
from src.cotacoes.constantes import ACAO_TICKER, FUNDOS_TICKER
import yfinance as yf
from datetime import date, datetime
import logging as logger


def job_atualizacao_cotacao_preco():
    logger.info(f"Inicio da atualização de preço data {datetime.now()}")
    db = SessionLocal()
    codigo_ativos = ACAO_TICKER + FUNDOS_TICKER
    list_ativos = []
    for codigo_ativo in codigo_ativos:
        preco = get_preco_ultimo_fechamento(codigo_ativo)
        ativo = CotacaoAtivo()
        ativo.codigo = codigo_ativo
        ativo.preco = preco
        ativo.data = date.today()
        list_ativos.append(ativo)

    db_ativos = db.query(CotacaoAtivo).all()
    if len(db_ativos) == 0:
        db.add_all(list_ativos)
        db.commit()
    else:
        for db_ativo in db_ativos:
            db.delete(db_ativo)
        db.add_all(list_ativos)
        db.commit()
    logger.info(f"Fim da atualização de preço data {datetime.now()}")


def get_preco_ultimo_fechamento(codigo_ativo: str) -> float:
    ticker = yf.Ticker(f'{codigo_ativo}.SA')
    result = ticker.history(period="ytd")
    if result.empty:
        return 0.0
    else:
        return result.tail(1)['Close'][0]
