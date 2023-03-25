import requests
import yfinance as yf
from datetime import datetime
from sqlalchemy.orm import Session

from schemas import CotacaoSchema
import models
from models import HistoricoCotacao


def get_by_codigo(codigo: str, periodo: str, intervalo: str):
    """
     codigo  = [CODIGO.SA]
     periodo = [1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max]\n
     intevalo= [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]
    """
    cotacao = yf.Ticker(codigo)
    cotacao = cotacao.history(period=periodo, interval=intervalo)

    list_cotacao = []
    for data in cotacao['Close'].keys():
        _cotacao = CotacaoSchema(
            codigo=codigo,
            data=data,
            abertura=cotacao['Open'].get(data),
            fechamento=cotacao['Close'].get(data),
            alta=cotacao['High'].get(data),
            baixa=cotacao['Low'].get(data),
        )
        list_cotacao.append(_cotacao)

    return list_cotacao


def get_by_codigo_by_intervalo(codigo, inicio: datetime.date, fim: datetime.date):
    """
     codigo  = [CODIGO.SA]
     periodo = [1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max]\n
     intevalo= [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]
    """
    cotacao = yf.Ticker(codigo)
    start = inicio.strftime('%Y-%m-%d')
    end = fim.strftime('%Y-%m-%d')
    cotacao = cotacao.history(start=start, end=end)
    list_cotacao = []
    for data in cotacao['Close'].keys():
        _cotacao = CotacaoSchema(
            codigo=codigo,
            data=data,
            abertura=cotacao['Open'].get(data),
            fechamento=cotacao['Close'].get(data),
            alta=cotacao['High'].get(data),
            baixa=cotacao['Low'].get(data),
        )
        list_cotacao.append(_cotacao)

    return list_cotacao


def get_moeda_cotacao():
    request_url = requests.get("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL")
    request_url_dic = request_url.json()
    return {
        "dolar": request_url_dic["USDBRL"]["bid"],
        "euro": request_url_dic["EURBRL"]["bid"],
        "btc": request_url_dic["BTCBRL"]["bid"],
        "ethereum": request_url_dic["ETHBRL"]["bid"],
    }


def gerar_dados_historicos(db: Session, codigo: str, periodo: str = "1d", updated: bool = False):
    """
         codigo  = [CODIGO.SA]
         periodo = [1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max]\n
    """
    ativo = db.query(models.HistoricoCotacao).filter(models.HistoricoCotacao.codigo == codigo).first()

    if ativo is None:
        create_historico(db, codigo, periodo)
    if updated:
        deletar_dados_historicos_by_codigo(db, codigo)
        create_historico(db, codigo, periodo)


def deletar_dados_historicos(db: Session):
    """

    :param db:
    """
    valores = db.query(models.HistoricoCotacao).all()
    for valor in valores:
        db.delete(valor)

    db.commit()


def deletar_dados_historicos_by_codigo(db: Session, codigo: str):
    """

    :param db:
    :param codigo:
    """
    valores = db.query(models.HistoricoCotacao).filter(models.HistoricoCotacao.codigo == codigo).all()
    for valor in valores:
        db.delete(valor)

    db.commit()


def create_historico(db: Session, codigo: str, periodo: str = "1d"):
    """

    :param db:
    :param codigo:
    :param periodo:
    :return:
    """
    ticker = yf.Ticker(f'{codigo}.SA')
    if ticker is None:
        return None
    else:
        cotacoes = ticker.history(period=periodo)['Close']
        for data in cotacoes.keys():
            valor = cotacoes.get(data)
            historico = HistoricoCotacao(codigo=codigo, data=data, valor=valor, periodo=periodo)
            db.add(historico)
            db.commit()
            db.refresh(historico)
