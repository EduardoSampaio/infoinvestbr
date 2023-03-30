import datetime
from dataclasses import dataclass


@dataclass()
class CotacaoSchema:
    codigo: str
    data: datetime.date
    abertura: float
    fechamento: float
    baixa: float
    alta: float

    def __int__(self, codigo: str,
                data: datetime.date,
                abertura: float,
                fechamento: float,
                baixa: float,
                alta: float):
        self.codigo = codigo
        self.data = data
        self.abertura = abertura
        self.fechamento = fechamento
        self.baixa = baixa
        self.alta = alta


@dataclass()
class CotacaoAltaOuBaixaSchema:
    codigo: str
    valor: float

    def __int__(self, codigo: str,
                valor: float):
        self.codigo = codigo
        self.valor = valor
