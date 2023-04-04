from sqlalchemy import Column, Integer, String, Numeric, Text
from src.core.database import Base


class FundosImobiliario(Base):
    __tablename__ = "fundos_imobiliarios"

    id = Column("FUNDO_ID", Integer, index=True, primary_key=True)
    codigo_do_fundo = Column("CODIGO_DO_FUNDO", String(30), index=True, unique=True, nullable=False)
    nome = Column("NOME", String(200), nullable=True)
    descricao = Column("DESCRICAO", Text, nullable=True)
    administrador = Column("ADMINISTRADOR", String(200), nullable=True)
    cnpj = Column("CNPJ", String(100), nullable=True)
    taxa_administracao = Column("TAXA_ADMINISTRACAO", Numeric, nullable=True)
    taxa_gestao = Column("TAXA_GESTAO", Numeric, nullable=True)
    taxa_performance = Column("TAXA_PERFORMANCE", Numeric, nullable=True)
    tipo_gestao = Column("TIPO_GESTAO", String(200), nullable=True)
    setor = Column("SETOR", String(100))
    liquidez_diaria = Column("LIQUIDEZ_DIARIA", Numeric, nullable=True)
    dividendo = Column("DIVIDENDO", Numeric, nullable=True)
    dividend_yield = Column("DIVIDEND_YIELD", Numeric, nullable=True)
    dy_ano = Column("DY_ANO", Numeric, nullable=True)
    variacao_preco = Column("VARIAÇÃO_PREÇO", Numeric, nullable=True)
    rentab_periodo = Column("RENTAB_PERIODO", Numeric, nullable=True)
    rentab_acumulada = Column("RENTAB_ACUMULADA", Numeric, nullable=True)
    patrimonio_liq = Column("PATRIMÔNIO_LIQ", Numeric, nullable=True)
    vpa = Column("VPA", Numeric, nullable=True)
    p_vpa = Column("P_VPA", Numeric, nullable=True)
    dy_patrimonial = Column("DY_PATRIMONIAL", Numeric, nullable=True)
    variacao_patrimonial = Column("VARIAÇÃO_PATRIMONIAL", Numeric, nullable=True)
    rentab_patr_no_periodo = Column("RENTAB_PATR_NO_PERÍODO", Numeric, nullable=True)
    rentab_patr_acumulada = Column("RENTAB_PATR_ACUMULADA", Numeric, nullable=True)
    vacancia_fisica = Column("VACANCIA_FISICA", Numeric, nullable=True)
    vacancia_financeira = Column("VACÂNCIA_FINANCEIRA", Numeric, nullable=True)
    quantidade_ativos = Column("QUANTIDADE_ATIVOS", Integer, nullable=True)

    def __init__(self,
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
                 vacancia_fisica,
                 vacancia_financeira,
                 quantidade_ativos,
                 nome,
                 administrador,
                 cnpj,
                 ):
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
        self.vacancia_fisica = vacancia_fisica
        self.vacancia_financeira = vacancia_financeira
        self.quantidade_ativos = quantidade_ativos
        self.nome = nome
        self.administrador = administrador
        self.cnpj = cnpj


class Acao(Base):
    __tablename__ = "acoes"

    id = Column("ACAO_ID", Integer, index=True, primary_key=True)
    codigo = Column("CODIGO", String(6), index=True, unique=True, nullable=False)
    nome = Column("NOME", String(100), nullable=True)
    descricao = Column("DESCRICAO", Text, nullable=True)
    imagem = Column("IMAGEM", String(200), nullable=True)
    pl = Column("PL", Numeric, nullable=True)
    pvp = Column("PVP", Numeric, nullable=True)
    psr = Column("PSR", Numeric, nullable=True)
    dividend_yield = Column("DIVIDEND_YIELD", Numeric, nullable=True)
    p_ativo = Column("P_ATIVO", Numeric, nullable=True)
    p_cap_giro = Column("P_CAP_GIRO", Numeric, nullable=True)
    p_ebit = Column("P_EBIT", Numeric, nullable=True)
    p_ativ_circ_liq = Column("P_ATIV_CIRC_LIQ", Numeric, nullable=True)
    ev_ebit = Column("EV_EBIT", Numeric, nullable=True)
    ev_ebitda = Column("EV_EBITDA", Numeric, nullable=True)
    margem_ebit = Column("MARGEM_EBIT", Numeric, nullable=True)
    margem_liquida = Column("MARGEM_LIQUIDA", Numeric, nullable=True)
    liq_corrente = Column("LIQ_CORRENTE", Numeric, nullable=True)
    roic = Column("ROIC", Numeric, nullable=True)
    roe = Column("ROE", Numeric, nullable=True)
    liq_2meses = Column("LIQ_2MESES", Numeric, nullable=True)
    patrimonio_liquido = Column("PATRIMONIO_LIQUIDO", Numeric, nullable=True)
    div_bruta_patrim = Column("DIV_BRUTA_PATRIM", Numeric, nullable=True)
    cresc_rec_5a = Column("CRESC_REC_5A", Numeric, nullable=True)
    setor = Column("SETOR", String(100), nullable=False)
    sub_setor = Column("SUB_SETOR", String(100), nullable=False)
    lpa = Column("LPA", Numeric, nullable=True)
    vpa = Column("VPA", Numeric, nullable=True)
    cnpj = Column("CNPJ", String(100), nullable=True)
    tipo = Column("TIPO", String(100), nullable=True)

    def __init__(self,
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
                 nome,
                 imagem,
                 sub_setor,
                 cnpj
                 ):
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
        self.nome = nome,
        self.imagem = imagem,
        self.sub_setor = sub_setor
        self.cnpj = cnpj
