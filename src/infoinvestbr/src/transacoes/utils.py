from src.transacoes.models import Patrimonio
from src.cotacoes import service as cotacao


def calcular_rentabilidade(preco_medio: float, preco_atual: float) -> float:
    """
    ROI = [(Preço atual da ação - Preço de compra da ação) / Preço de compra da ação] x 100
    :param preco_medio:
    :param preco_atual
    :return: rentabilidade
    """
    return ((float(preco_atual) - float(preco_medio)) / float(preco_medio)) * 100


def calcular_variacao_diaria(preco_atual: float, total: float) -> float:
    """
    porcentagem = ((preco_fechamento_atual - preco_fechamento_dia_anterior) / preco_fechamento_dia_anterior) * 100
    variacao = (total / 100) * porcentagem
    :param preco_atual:
    :param total:
    :return:
    """
    preco_fechamento_dia_anterior = float(preco_atual[1])
    preco_fechamento_atual = float(preco_atual[0])
    porcentagem = ((float(preco_fechamento_atual) - float(preco_fechamento_dia_anterior)) / float(
        preco_fechamento_dia_anterior)) * 100
    variacao = (float(total / 100)) * porcentagem
    return variacao, porcentagem


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
