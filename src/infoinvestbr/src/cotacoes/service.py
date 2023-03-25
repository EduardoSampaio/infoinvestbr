import requests
import yfinance as yf
from datetime import datetime


def get_by_codigo(codigo: str, periodo: str, intervalo: str):
    codigo_ativo = f"{codigo}.SA"
    cotacao = yf.Ticker(codigo_ativo)
    cotacao = cotacao.history(period=periodo, interval=intervalo)
    return {
        "abertura": cotacao.get("Open"),
        "alta": cotacao.get("High"),
        "baixa": cotacao.get("Low"),
        "fechamento": cotacao.get("Close")
    }


def get_by_codigo_by_intervalo(codigo, inicio: datetime.date, fim: datetime.date):
    codigo_ativo = f"{codigo}.SA"
    cotacao = yf.Ticker(codigo_ativo)
    start = inicio.strftime('%Y-%m-%d')
    end = fim.strftime('%Y-%m-%d')
    cotacao = cotacao.history(start=start, end=end)
    return {
        "abertura": cotacao.get("Open"),
        "alta": cotacao.get("High"),
        "baixa": cotacao.get("Low"),
        "fechamento": cotacao.get("Close")
    }


def get_moeda_cotacao():
    request_url = requests.get("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL")
    request_url_dic = request_url.json()
    return {
        "dolar": request_url_dic["USDBRL"]["bid"],
        "euro": request_url_dic["EURBRL"]["bid"],
        "btc": request_url_dic["BTCBRL"]["bid"],
        "ethereum": request_url_dic["ETHBRL"]["bid"],
    }
