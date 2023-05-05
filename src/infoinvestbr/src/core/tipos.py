from enum import Enum


class EnumOrdemOperacao(Enum):
    """
     COMPRA = 1
     VENDA = 2
    """
    COMPRA = 1
    VENDA = 2


class EnumTipoCategoria(Enum):
    """
    ACAO = 1
    FUNDO_IMOBILIARIO = 2
    """
    ACAO = 1
    FUNDO_IMOBILIARIO = 2


class EnumTipoCategoriaStr(str, Enum):
    """
    ACAO = 1
    FUNDO_IMOBILIARIO = 2
    """
    ACAO = "ACAO"
    FUNDO_IMOBILIARIO = "FUNDO_IMOBILIARIO"



class EnumTipoPagamento(Enum):
    """
    JCP = 1
    DIVIDENDO = 2
    """
    JCP = 1
    DIVIDENDO = 2
