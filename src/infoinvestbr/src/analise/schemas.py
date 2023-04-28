from pydantic import BaseModel


class FundosImobiliarioRequestSchema(BaseModel):
    id: int
    codigo: str
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
        uselist = False


class FundosImobiliarioResponseSchema:
    id: int
    codigo: str
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
    preco: float


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
    sub_setor: str

    class Config:
        orm_mode = True


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
