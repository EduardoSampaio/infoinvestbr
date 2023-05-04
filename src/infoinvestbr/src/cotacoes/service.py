import requests
import yfinance as yf
import math
from datetime import datetime

from src.cotacoes.schemas import CotacaoSchema, CotacaoAltaOuBaixaSchema
from src.core.exceptions import CodigoAtivoException
from src.cotacoes.constantes import ACAO_TICKER, FUNDOS_TICKER


def get_by_codigo(codigo: str, periodo: str, intervalo: str):
    """
     codigo  = [CODIGO.SA]
     periodo = [1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max]\n
     intevalo= [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]
    """
    cotacao = yf.Ticker(f'{codigo}.SA')
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


def get_by_codigo_chart(codigo: str, periodo: str, intervalo: str):
    """
     codigo  = [CODIGO.SA]
     periodo = [1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max]\n
     intevalo= [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]
    """
    cotacao = yf.Ticker(f'{codigo}.SA')
    cotacao = cotacao.history(period=periodo, interval=intervalo)

    list_data = []
    list_close = []
    for data in cotacao['Close'].keys():
        list_close.append(round(cotacao['Close'].get(data), 2))
        list_data.append("{:%d/%m/%Y}".format(data))

    return {
        "datas": list_data,
        "fechamento": list_close
    }


def get_by_codigo_ibovespa(periodo: str, intervalo: str):
    """
     [IFiX.SA]
     periodo = [1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max]\n
     intevalo= [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]
    """
    cotacao = yf.Ticker("^BVSP")
    cotacao = cotacao.history(period=periodo, interval=intervalo)

    list_cotacao = []
    for data in cotacao['Close'].keys():
        _cotacao = CotacaoSchema(
            codigo="^BVSP",
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
    cotacao = yf.Ticker(f'{codigo}.SA')
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


def get_by_codigo_atual(codigo: str) -> float:
    cotacao = yf.Ticker(f'{codigo}.SA')
    cotacao = cotacao.info
    return cotacao.get('previousClose')


def get_by_codigo_variacao_diaria(codigo: str):
    cotacao = yf.Ticker(f'{codigo}.SA')
    fechamento_anterior = cotacao.history(period="2d")['Close'][-2]
    fechamento_atual = cotacao.info.get('previousClose')
    return fechamento_atual, fechamento_anterior


def get_moeda_cotacao():
    request_url = requests.get("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL")
    request_url_dic = request_url.json()
    return {
        "dolar": request_url_dic["USDBRL"]["bid"],
        "euro": request_url_dic["EURBRL"]["bid"],
        "btc": request_url_dic["BTCBRL"]["bid"],
        "ethereum": request_url_dic["ETHBRL"]["bid"],
    }


def get_historico_dividendo_anual(codigo: str):
    current_ticker = yf.Ticker(f'{codigo}.SA')
    valores = current_ticker.dividends

    my_dict = {}
    for data in current_ticker.dividends.keys():
        ano = "{:%d/%m/%Y}".format(data).split('/')[2]
        my_dict.setdefault(ano, []).append(valores.get(data))

    list_data, lista_valores = group_dividendo(my_dict)

    return {
        "datas": list_data,
        "valores": lista_valores
    }


def get_historico_dividendo_mensal(codigo: str):
    current_ticker = yf.Ticker(f'{codigo}.SA')
    valores = current_ticker.dividends

    my_dict = {}
    for data in current_ticker.dividends.keys():
        ano = "{:%d/%m/%Y}".format(data).split('/')[2]
        mes = get_mes_str(int("{:%d/%m/%Y}".format(data).split('/')[1]))
        my_dict.setdefault(f'{mes}/{ano}', []).append(valores.get(data))

    list_data, lista_valores = group_dividendo(my_dict)

    return {
        "datas": list_data,
        "valores": lista_valores
    }


def group_dividendo(my_dict):
    list_data = []
    lista_valores = []
    for k in my_dict.keys():
        valores = my_dict.get(k)
        total = 0
        for valor in valores:
            total += valor
        list_data.append(k)
        lista_valores.append(round(total, 2))
    return list_data, lista_valores


def codigo_exception(codigo: str):
    if codigo.find(".SA") == -1:
        raise CodigoAtivoException(name=codigo)


def get_maiores_altas_dia_acoes() -> CotacaoAltaOuBaixaSchema:
    return get_cotacao_comparacao(True, ACAO_TICKER)


def get_maiores_altas_dia_fundos() -> CotacaoAltaOuBaixaSchema:
    return get_cotacao_comparacao(True, FUNDOS_TICKER)


def get_maiores_baixa_dia_acoes() -> CotacaoAltaOuBaixaSchema:
    return get_cotacao_comparacao(False, ACAO_TICKER)


def get_maiores_baixa_dia_fundos() -> CotacaoAltaOuBaixaSchema:
    return get_cotacao_comparacao(False, FUNDOS_TICKER)


def get_cotacao_comparacao(alta: bool, tickers: []) -> CotacaoAltaOuBaixaSchema:
    ativo = yf.download(tickers, period="1d")
    variacao = ((ativo['Close'] - ativo['Open']) / ativo['Open']) * 100

    list_ativo = []
    for k in variacao.keys():
        for item in variacao.get(key=k):
            if not math.isnan(item) and not math.isinf(item):
                list_ativo.append(CotacaoAltaOuBaixaSchema(codigo=k, valor=item))

    list_ativo.sort(key=lambda x: x.valor, reverse=alta)
    return list_ativo[0:20]


def get_mes_str(numero: int):
    dict_mes = {
        1: 'Janeiro',
        2: 'Fevereiro',
        3: 'Março',
        4: 'Abril',
        5: 'Maio',
        6: 'Junho',
        7: 'Julho',
        8: 'Agosto',
        9: 'Setembro',
        10: 'Outubro',
        11: 'Novembro',
        12: 'Dezembro',
    }
    return dict_mes.get(numero)
