from dataclasses import dataclass
from typing import Optional

from pydantic import BaseModel


class FundosImobiliarioRequestSchema(BaseModel):
    fundo_id: Optional[int] = None
    codigo_do_fundo: Optional[str] = None
    nome: Optional[str] = None
    descricao: Optional[str] = None
    imagem: Optional[str] = None
    administrador: Optional[str] = None
    cnpj: Optional[str] = None
    taxa_administracao: Optional[str] = None
    taxa_gestao: Optional[str] = None
    taxa_performance: Optional[str] = None
    tipo_gestao: Optional[str] = None
    setor: Optional[str] = None
    liquidez_diaria: Optional[float] = None
    dividendo: Optional[float] = None
    dividend_yield: Optional[float] = None
    dy_ano: Optional[float] = None
    variacao_preco: Optional[float] = None
    rentab_periodo: Optional[float] = None
    rentab_acumulada: Optional[float] = None
    patrimonio_liq: Optional[float] = None
    vpa: Optional[float] = None
    p_vpa: Optional[float] = None
    dy_patrimonial: Optional[float] = None
    variacao_patrimonial: Optional[float] = None
    rentab_patr_no_periodo: Optional[float] = None
    rentab_patr_acumulada: Optional[float] = None
    vacancia_fisica: Optional[float] = None
    vacancia_financeira: Optional[float] = None
    quantidade_ativos: Optional[int] = None

    class Config:
        orm_mode = True


@dataclass()
class FundosImobiliarioResponseSchema:
    fundo_id: Optional[int] = None
    codigo_do_fundo: Optional[str] = None
    nome: Optional[str] = None
    descricao: Optional[str] = None
    imagem: Optional[str] = None
    administrador: Optional[str] = None
    cnpj: Optional[str] = None
    taxa_administracao: Optional[str] = None
    taxa_gestao: Optional[str] = None
    taxa_performance: Optional[str] = None
    tipo_gestao: Optional[str] = None
    setor: Optional[str] = None
    liquidez_diaria: Optional[float] = None
    dividendo: Optional[float] = None
    dividend_yield: Optional[float] = None
    dy_ano: Optional[float] = None
    variacao_preco: Optional[float] = None
    rentab_periodo: Optional[float] = None
    rentab_acumulada: Optional[float] = None
    patrimonio_liq: Optional[float] = None
    vpa: Optional[float] = None
    p_vpa: Optional[float] = None
    dy_patrimonial: Optional[float] = None
    variacao_patrimonial: Optional[float] = None
    rentab_patr_no_periodo: Optional[float] = None
    rentab_patr_acumulada: Optional[float] = None
    vacancia_fisica: Optional[float] = None
    vacancia_financeira: Optional[float] = None
    quantidade_ativos: Optional[int] = None

    def __init__(self,
                 fundo_id,
                 codigo_do_fundo,
                 setor,
                 liquidez_diaria,
                 dividendo,
                 dividend_yield,
                 dy_ano,
                 variacao_preco,
                 rentab_periodo,
                 rentab_acumulada,
                 patrimonio_liq,
                 vpa,
                 p_vpa,
                 dy_patrimonial,
                 variacao_patrimonial,
                 rentab_patr_no_periodo,
                 rentab_patr_acumulada,
                 vacancia_financeira,
                 quantidade_ativos,
                 nome,
                 descricao,
                 imagem,
                 administrador,
                 cnpj,
                 taxa_administracao,
                 taxa_gestao,
                 taxa_performance,
                 tipo_gestao,
                 vacancia_fisica):
        self.fundo_id = fundo_id
        self.codigo_do_fundo = codigo_do_fundo
        self.setor = setor
        self.liquidez_diaria = liquidez_diaria
        self.dividendo = dividendo
        self.dividend_yield = dividend_yield
        self.dy_ano = dy_ano
        self.variacao_preco = variacao_preco
        self.rentab_periodo = rentab_periodo
        self.rentab_acumulada = rentab_acumulada
        self.patrimonio_liq = patrimonio_liq
        self.vpa = vpa
        self.p_vpa = p_vpa
        self.dy_patrimonial = dy_patrimonial
        self.variacao_patrimonial = variacao_patrimonial
        self.rentab_patr_no_periodo = rentab_patr_no_periodo
        self.rentab_patr_acumulada = rentab_patr_acumulada
        self.vacancia_financeira = vacancia_financeira
        self.quantidade_ativos = quantidade_ativos
        self.nome = nome,
        self.descricao = descricao,
        self.imagem = imagem,
        self.administrador = administrador,
        self.cnpj = cnpj,
        self.taxa_administracao = taxa_administracao,
        self.taxa_gestao = taxa_gestao,
        self.taxa_performance = taxa_performance,
        self.tipo_gestao = tipo_gestao,
        self.vacancia_fisica = vacancia_fisica,


class AcaoRequestSchema(BaseModel):
    acao_id: Optional[int] = None
    codigo: Optional[str] = None
    nome: Optional[str] = None
    descricao: Optional[str] = None
    imagem: Optional[str] = None
    pl: Optional[float] = None
    pvp: Optional[float] = None
    psr: Optional[float] = None
    dividend_yield: Optional[float] = None
    p_ativo: Optional[float] = None
    p_cap_giro: Optional[float] = None
    p_ebit: Optional[float] = None
    p_ativ_circ_liq: Optional[float] = None
    ev_ebit: Optional[float] = None
    ev_ebitda: Optional[float] = None
    margem_ebit: Optional[float] = None
    margem_liquida: Optional[float] = None
    liq_corrente: Optional[float] = None
    roic: Optional[float] = None
    roe: Optional[float] = None
    liq_2meses: Optional[float] = None
    patrimonio_liquido: Optional[float] = None
    div_bruta_patrim: Optional[float] = None
    cresc_rec_5a: Optional[float] = None
    setor: Optional[str] = None
    lpa: Optional[float] = None
    vpa: Optional[float] = None
    cnpj: Optional[str] = None
    tipo: Optional[str] = None

    class Config:
        orm_mode = True


@dataclass()
class AcaoResponseSchema:
    acao_id: Optional[int] = None
    codigo: Optional[str] = None
    nome: Optional[str] = None
    descricao: Optional[str] = None
    imagem: Optional[str] = None
    pl: Optional[float] = None
    pvp: Optional[float] = None
    psr: Optional[float] = None
    dividend_yield: Optional[float] = None
    p_ativo: Optional[float] = None
    p_cap_giro: Optional[float] = None
    p_ebit: Optional[float] = None
    p_ativ_circ_liq: Optional[float] = None
    ev_ebit: Optional[float] = None
    ev_ebitda: Optional[float] = None
    margem_ebit: Optional[float] = None
    margem_liquida: Optional[float] = None
    liq_corrente: Optional[float] = None
    roic: Optional[float] = None
    roe: Optional[float] = None
    liq_2meses: Optional[float] = None
    patrimonio_liquido: Optional[float] = None
    div_bruta_patrim: Optional[float] = None
    cresc_rec_5a: Optional[float] = None
    setor: Optional[str] = None
    lpa: Optional[float] = None
    vpa: Optional[float] = None
    cnpj: Optional[str] = None
    tipo: Optional[str] = None

    def __init__(self,
                 acao_id,
                 codigo,
                 pl,
                 pvp,
                 psr,
                 dividend_yield,
                 p_ativo,
                 p_cap_giro,
                 p_ebit,
                 p_ativ_circ_liq,
                 ev_ebit,
                 ev_ebitda,
                 margem_ebit,
                 margem_liquida,
                 liq_corrente,
                 roic,
                 roe,
                 liq_2meses,
                 patrimonio_liquido,
                 div_bruta_patrim,
                 cresc_rec_5a,
                 setor,
                 tipo,
                 nome,
                 imagem,
                 lpa,
                 vpa,
                 descricao,
                 cnpj
                 ):
        self.acao_id = acao_id
        self.codigo = codigo
        self.pl = pl
        self.pvp = pvp
        self.psr = psr
        self.dividend_yield = dividend_yield
        self.p_ativo = p_ativo
        self.p_cap_giro = p_cap_giro
        self.p_ebit = p_ebit
        self.p_ativ_circ_liq = p_ativ_circ_liq
        self.ev_ebit = ev_ebit
        self.ev_ebitda = ev_ebitda
        self.margem_ebit = margem_ebit
        self.margem_liquida = margem_liquida
        self.liq_corrente = liq_corrente
        self.roic = roic
        self.roe = roe
        self.liq_2meses = liq_2meses
        self.patrimonio_liquido = patrimonio_liquido
        self.div_bruta_patrim = div_bruta_patrim
        self.cresc_rec_5a = cresc_rec_5a
        self.setor = setor
        self.tipo = tipo,
        self.nome = nome,
        self.imagem = imagem,
        self.lpa = lpa,
        self.vpa = vpa,
        self.descricao = descricao,
        self.cnpj = cnpj