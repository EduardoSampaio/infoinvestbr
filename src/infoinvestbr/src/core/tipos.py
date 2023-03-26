from enum import Enum


class TipoOperacao(Enum):
    COMPRA = 1
    VENDA = 2


class TipoCategoria(Enum):
    ACAO = 1
    FUNDO_IMOBILIARIO = 2
