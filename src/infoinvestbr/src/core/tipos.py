from enum import Enum


class OrdemOperacao(Enum):
    """
     COMPRA = 1
     VENDA = 2
    """
    COMPRA = 1
    VENDA = 2


class TipoCategoria(Enum):
    """
    ACAO = 1
    FUNDO_IMOBILIARIO = 2
    """
    ACAO = 1
    FUNDO_IMOBILIARIO = 2


class TipoPagamento(Enum):
    """
    JCP = 1
    DIVIDENDO = 2
    """
    JCP = 1
    DIVIDENDO = 2
