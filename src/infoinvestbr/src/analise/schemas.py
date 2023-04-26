from dataclasses import dataclass
from pydantic import BaseModel


class FundosImobiliarioRequestSchema(BaseModel):
    fundo_id: int
    codigo_do_fundo: str
    nome: str
    descricao: str
    administrador: str
    cnpj: str
    taxa_administracao: str
    taxa_gestao: str
    taxa_performance: str
    tipo_gestao: str
    setor: str
    liquidez_diaria: float
    dividendo: float
    dividend_yield: float
    dy_ano: float
    variacao_preco: float
    rentab_periodo: float
    rentab_acumulada: float
    patrimonio_liq: float
    vpa: float
    p_vpa: float
    dy_patrimonial: float
    variacao_patrimonial: float
    rentab_patr_no_periodo: float
    rentab_patr_acumulada: float
    vacancia_fisica: float
    vacancia_financeira: float
    quantidade_ativos: int

    class Config:
        orm_mode = True


@dataclass()
class FundosImobiliarioResponseSchema:
    fundo_id: int
    codigo_do_fundo: str
    nome: str
    descricao: str
    administrador: str
    cnpj: str
    taxa_administracao: str
    taxa_gestao: str
    taxa_performance: str
    tipo_gestao: str
    setor: str
    liquidez_diaria: float
    dividendo: float
    dividend_yield: float
    dy_ano: float
    variacao_preco: float
    rentab_periodo: float
    rentab_acumulada: float
    patrimonio_liq: float
    vpa: float
    p_vpa: float
    dy_patrimonial: float
    variacao_patrimonial: float
    rentab_patr_no_periodo: float
    rentab_patr_acumulada: float
    vacancia_fisica: float
    vacancia_financeira: float
    quantidade_ativos: int

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
        self.administrador = administrador,
        self.cnpj = cnpj,
        self.taxa_administracao = taxa_administracao,
        self.taxa_gestao = taxa_gestao,
        self.taxa_performance = taxa_performance,
        self.tipo_gestao = tipo_gestao,
        self.vacancia_fisica = vacancia_fisica,


class AcaoRequestSchema(BaseModel):
    id: int
    codigo: str
    nome: str
    descricao: str
    imagem: str
    pl: float
    pvp: float
    psr: float
    dividend_yield: float
    p_ativo: float
    p_cap_giro: float
    p_ebit: float
    p_ativ_circ_liq: float
    ev_ebit: float
    ev_ebitda: float
    margem_ebit: float
    margem_liquida: float
    liq_corrente: float
    roic: float
    roe: float
    liq_2meses: float
    patrimonio_liquido: float
    div_bruta_patrim: float
    cresc_rec_5a: float
    setor: str
    lpa: float
    vpa: float
    cnpj: str
    tipo: str
    sub_setor:str

    class Config:
        orm_mode = True


@dataclass()
class AcaoResponseSchema:
    id: int
    codigo: str
    nome: str
    descricao: str
    imagem: str
    pl: float
    pvp: float
    psr: float
    dividend_yield: float
    p_ativo: float
    p_cap_giro: float
    p_ebit: float
    p_ativ_circ_liq: float
    ev_ebit: float
    ev_ebitda: float
    margem_ebit: float
    margem_liquida: float
    liq_corrente: float
    roic: float
    roe: float
    liq_2meses: float
    patrimonio_liquido: float
    div_bruta_patrim: float
    cresc_rec_5a: float
    setor: str
    lpa: float
    vpa: float
    cnpj: str
    tipo: str
    sub_setor: str
    preco: float

    def __init__(self,
                 id,
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
                 cnpj,
                 sub_setor,
                 preco
                 ):
        self.id = id
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
        self.sub_setor = sub_setor
        self.preco = preco
