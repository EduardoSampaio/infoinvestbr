import time
import models
from openpyxl import load_workbook
from sqlalchemy.orm import Session
from models import Acao, FundosImobiliario
from schemas import AcaoRequestSchema, FundosImobiliarioRequestSchema, AcaoResponseSchema, \
    FundosImobiliarioResponseSchema

import requests


def convert_acao_to_schema(model: Acao) -> AcaoResponseSchema:
    return AcaoResponseSchema(
        acao_id=model.id,
        codigo=model.codigo,
        tipo=model.tipo,
        nome=model.nome,
        imagem=model.imagem,
        lpa=model.lpa,
        vpa=model.vpa,
        descricao=model.descricao,
        setor=model.setor,
        cresc_rec_5a=model.cresc_rec_5a,
        div_bruta_patrim=model.div_bruta_patrim,
        ev_ebit=model.ev_ebit,
        dividend_yield=model.dividend_yield,
        liq_2meses=model.liq_2meses,
        pl=model.pl,
        pvp=model.pvp,
        psr=model.psr,
        p_ativo=model.p_ativo,
        p_cap_giro=model.p_cap_giro,
        p_ebit=model.p_ebit,
        p_ativ_circ_liq=model.p_ativ_circ_liq,
        ev_ebitda=model.ev_ebitda,
        margem_ebit=model.margem_ebit,
        margem_liquida=model.margem_liquida,
        liq_corrente=model.liq_corrente,
        roic=model.roic,
        roe=model.roe,
        patrimonio_liquido=model.patrimonio_liquido,
        cnpj=model.cnpj
    )


def convert_fundo_to_schema(model: FundosImobiliario) -> FundosImobiliarioResponseSchema:
    return FundosImobiliarioResponseSchema(
        fundo_id=model.id,
        codigo_do_fundo=model.codigo_do_fundo,
        nome=model.nome,
        descricao=model.descricao,
        imagem=model.imagem,
        administrador=model.administrador,
        cnpj=model.cnpj,
        taxa_administracao=model.taxa_administracao,
        taxa_gestao=model.taxa_gestao,
        taxa_performance=model.taxa_performance,
        tipo_gestao=model.tipo_gestao,
        setor=model.setor,
        liquidez_diaria=model.liquidez_diaria,
        dividendo=model.dividendo,
        dividend_yield=model.dividend_yield,
        dy_ano=model.dy_ano,
        variacao_preco=model.variacao_preco,
        rentab_periodo=model.rentab_periodo,
        rentab_acumulada=model.rentab_acumulada,
        patrimonio_liq=model.patrimonio_liq,
        vpa=model.vpa,
        p_vpa=model.p_vpa,
        dy_patrimonial=model.dy_patrimonial,
        variacao_patrimonial=model.variacao_patrimonial,
        rentab_patr_no_periodo=model.rentab_patr_no_periodo,
        rentab_patr_acumulada=model.rentab_patr_acumulada,
        vacancia_fisica=model.vacancia_fisica,
        vacancia_financeira=model.vacancia_financeira,
        quantidade_ativos=model.quantidade_ativos
    )


def get_acoes(db: Session, skip: int = 0, limit: int = 100) -> list[AcaoResponseSchema]:
    acoes = db.query(Acao).offset(skip).limit(limit).all()

    list_acoes = []

    for acao in acoes:
        list_acoes.append(convert_acao_to_schema(acao))

    return list_acoes


def get_acoes_by_setor(db: Session, setor: str, skip: int = 0, limit: int = 100) -> list[AcaoResponseSchema]:
    acoes = db.query(Acao).filter(Acao.setor == setor).offset(skip).limit(limit).all()

    list_acoes = []

    for acao in acoes:
        list_acoes.append(convert_acao_to_schema(acao))

    return list_acoes


def get_fundos_imobiliarios(db: Session, skip: int = 0, limit: int = 100) -> list[FundosImobiliarioResponseSchema]:
    fundos = db.query(FundosImobiliario).offset(skip).limit(limit).all()

    list_fundos = []
    for fundos in fundos:
        list_fundos.append(convert_fundo_to_schema(fundos))

    return list_fundos


def get_fundos_imobiliarios_setor(db: Session, setor: str, skip: int = 0, limit: int = 100) -> \
        list[FundosImobiliarioResponseSchema]:
    fundos = db.query(FundosImobiliario).filter(FundosImobiliario.setor == setor).offset(skip).limit(limit).all()

    list_fundos = []
    for fundos in fundos:
        list_fundos.append(convert_fundo_to_schema(fundos))

    return list_fundos


def get_acoes_by_id(db: Session, acao_id: int) -> AcaoResponseSchema:
    return convert_acao_to_schema(db.query(Acao).filter(Acao.id == acao_id).first())


def get_fundos_imobiliarios_by_id(db: Session, fundos_id: int) -> FundosImobiliarioResponseSchema:
    return convert_fundo_to_schema(db.query(FundosImobiliario).filter(FundosImobiliario.id == fundos_id).first())


def get_acoes_by_codigo(db: Session, codigo: str) -> AcaoResponseSchema:
    return convert_acao_to_schema(db.query(Acao).filter(Acao.codigo == codigo).first())


def get_fundos_imobiliarios_by_codigo(db: Session, codigo: str) -> FundosImobiliarioResponseSchema:
    return convert_fundo_to_schema(
        db.query(FundosImobiliario).filter(FundosImobiliario.codigo_do_fundo == codigo).first())


def upadate_acoes(db: Session, acao: AcaoRequestSchema):
    _acao = get_acoes_by_id(db, acao.acao_id)
    _acao.codigo = acao.codigo
    _acao.tipo = acao.tipo
    _acao.nome = acao.nome
    _acao.imagem = acao.imagem
    _acao.lpa = acao.lpa
    _acao.vpa = acao.vpa
    _acao.setor = acao.setor
    _acao.descricao = acao.descricao
    _acao.cresc_rec_5a = acao.cresc_rec_5a
    _acao.div_bruta_patrim = acao.div_bruta_patrim
    _acao.ev_ebit = acao.ev_ebit
    _acao.dividend_yield = acao.dividend_yield
    _acao.liq_2meses = acao.liq_2meses
    _acao.pl = acao.pl
    _acao.pvp = acao.pvp
    _acao.psr = acao.psr
    _acao.p_ativo = acao.p_ativo
    _acao.p_cap_giro = _acao.p_cap_giro
    _acao.p_ebit = _acao.p_ebit
    _acao.p_ativ_circ_liq = acao.p_ativ_circ_liq
    _acao.ev_ebitda = acao.ev_ebitda
    _acao.margem_ebit = acao.margem_ebit
    _acao.margem_liquida = acao.margem_liquida
    _acao.liq_corrente = acao.liq_corrente
    _acao.roic = acao.roic
    _acao.roe = acao.roe
    _acao.patrimonio_liquido = acao.patrimonio_liquido

    db.commit()
    db.refresh(_acao)


def create_acoes(db: Session, acao: AcaoRequestSchema):
    _acao = Acao(
        codigo=acao.codigo,
        tipo=acao.tipo,
        nome=acao.nome,
        imagem=acao.imagem,
        lpa=acao.lpa,
        vpa=acao.vpa,
        descricao=acao.descricao,
        setor=acao.setor,
        cresc_rec_5a=acao.cresc_rec_5a,
        div_bruta_patrim=acao.div_bruta_patrim,
        ev_ebit=acao.ev_ebit,
        dividend_yield=acao.dividend_yield,
        liq_2meses=acao.liq_2meses,
        pl=acao.pl,
        pvp=acao.pvp,
        psr=acao.psr,
        p_ativo=acao.p_ativo,
        p_cap_giro=acao.p_cap_giro,
        p_ebit=acao.p_ebit,
        p_ativ_circ_liq=acao.p_ativ_circ_liq,
        ev_ebitda=acao.ev_ebitda,
        margem_ebit=acao.margem_ebit,
        margem_liquida=acao.margem_liquida,
        liq_corrente=acao.liq_corrente,
        roic=acao.roic,
        roe=acao.roe,
        patrimonio_liquido=acao.patrimonio_liquido)

    db.add(_acao)
    db.commit()
    db.refresh(_acao)


def update_fundos(db: Session, fundo: FundosImobiliarioRequestSchema):
    _fundo = get_fundos_imobiliarios_by_id(db, fundo.fundo_id)
    _fundo.nome = fundo.nome
    _fundo.descricao = fundo.descricao
    _fundo.imagem = fundo.imagem
    _fundo.administrador = fundo.administrador
    _fundo.cnpj = fundo.cnpj
    _fundo.taxa_administracao = fundo.taxa_administracao
    _fundo.taxa_gestao = fundo.taxa_gestao
    _fundo.taxa_performance = fundo.taxa_performance
    _fundo.tipo_gestao = fundo.tipo_gestao
    _fundo.setor = fundo.setor
    _fundo.liquidez_diaria = fundo.liquidez_diaria
    _fundo.dividendo = fundo.dividendo
    _fundo.dividend_yield = fundo.dividend_yield
    _fundo.dy_ano = fundo.dy_ano
    _fundo.variacao_preco = fundo.variacao_preco
    _fundo.rentab_periodo = fundo.rentab_periodo
    _fundo.rentab_acumulada = fundo.rentab_acumulada
    _fundo.patrimonio_liq = fundo.patrimonio_liq
    _fundo.vpa = fundo.vpa
    _fundo.p_vpa = fundo.p_vpa
    _fundo.dy_patrimonial = fundo.dy_patrimonial
    _fundo.variacao_patrimonial = fundo.variacao_patrimonial
    _fundo.rentab_patr_no_periodo = fundo.rentab_patr_no_periodo
    _fundo.rentab_patr_acumulada = fundo.rentab_patr_acumulada
    _fundo.vacancia_fisica = fundo.vacancia_fisica
    _fundo.vacancia_financeira = fundo.vacancia_financeira
    _fundo.quantidade_ativos = fundo.quantidade_ativos

    db.commit()
    db.refresh(_fundo)


def create_fundos(db: Session, fundo: FundosImobiliarioRequestSchema):
    _fundo = FundosImobiliario(
        codigo_do_fundo=fundo.codigo_do_fundo,
        nome=fundo.nome,
        descricao=fundo.descricao,
        imagem=fundo.imagem,
        administrador=fundo.administrador,
        cnpj=fundo.cnpj,
        taxa_administracao=fundo.taxa_administracao,
        taxa_gestao=fundo.taxa_gestao,
        taxa_performance=fundo.taxa_performance,
        tipo_gestao=fundo.tipo_gestao,
        setor=fundo.setor,
        liquidez_diaria=fundo.liquidez_diaria,
        dividendo=fundo.dividendo,
        dividend_yield=fundo.dividend_yield,
        dy_ano=fundo.dy_ano,
        variacao_preco=fundo.variacao_preco,
        rentab_periodo=fundo.rentab_periodo,
        rentab_acumulada=fundo.rentab_acumulada,
        patrimonio_liq=fundo.patrimonio_liq,
        vpa=fundo.vpa,
        p_vpa=fundo.p_vpa,
        dy_patrimonial=fundo.dy_patrimonial,
        variacao_patrimonial=fundo.variacao_patrimonial,
        rentab_patr_no_periodo=fundo.rentab_patr_no_periodo,
        rentab_patr_acumulada=fundo.rentab_patr_acumulada,
        vacancia_fisica=fundo.vacancia_fisica,
        vacancia_financeira=fundo.vacancia_financeira,
        quantidade_ativos=fundo.quantidade_ativos)

    db.add(_fundo)
    db.commit()
    db.refresh(_fundo)


def import_fundos_imobiliarios(db: Session):
    workbook = load_workbook("src/analise/rendavariavel.xlsx")
    sheet = workbook["FIIS"]
    row_count = sheet.max_row
    list_fii = []
    for row in range(2, row_count + 1):
        fii = FundosImobiliario(
            codigo_do_fundo=sheet.cell(row=row, column=1).value,
            setor=sheet.cell(row=row, column=2).value,
            liquidez_diaria=sheet.cell(row=row, column=3).value,
            dividendo=sheet.cell(row=row, column=4).value,
            dividend_yield=sheet.cell(row=row, column=5).value,
            dy_ano=sheet.cell(row=row, column=6).value,
            variacao_preco=sheet.cell(row=row, column=7).value,
            rentab_periodo=sheet.cell(row=row, column=8).value,
            rentab_acumulada=sheet.cell(row=row, column=9).value,
            patrimonio_liq=sheet.cell(row=row, column=10).value,
            vpa=sheet.cell(row=row, column=11).value,
            p_vpa=sheet.cell(row=row, column=12).value,
            dy_patrimonial=sheet.cell(row=row, column=13).value,
            variacao_patrimonial=sheet.cell(row=row, column=14).value,
            rentab_patr_no_periodo=sheet.cell(row=row, column=15).value,
            rentab_patr_acumulada=sheet.cell(row=row, column=16).value,
            vacancia_fisica=sheet.cell(row=row, column=17).value,
            vacancia_financeira=sheet.cell(row=row, column=18).value,
            quantidade_ativos=sheet.cell(row=row, column=19).value
        )
        list_fii.append(fii)

    count = db.query(models.FundosImobiliario).count()
    if count == 0:
        db.add_all(list_fii)
        db.commit()


def import_acoes(db: Session):
    workbook = load_workbook("src/analise/rendavariavel.xlsx")
    sheet = workbook["Ações"]
    row_count = sheet.max_row
    list_acoes = []
    for row in range(2, row_count + 1):
        acoes = Acao(
            sheet.cell(row=row, column=1).value,
            sheet.cell(row=row, column=2).value,
            sheet.cell(row=row, column=3).value,
            sheet.cell(row=row, column=4).value,
            sheet.cell(row=row, column=5).value,
            sheet.cell(row=row, column=6).value,
            sheet.cell(row=row, column=7).value,
            sheet.cell(row=row, column=8).value,
            sheet.cell(row=row, column=9).value,
            sheet.cell(row=row, column=10).value,
            sheet.cell(row=row, column=11).value,
            sheet.cell(row=row, column=12).value,
            sheet.cell(row=row, column=13).value,
            sheet.cell(row=row, column=14).value,
            sheet.cell(row=row, column=15).value,
            sheet.cell(row=row, column=16).value,
            sheet.cell(row=row, column=17).value,
            sheet.cell(row=row, column=18).value,
            sheet.cell(row=row, column=19).value,
            sheet.cell(row=row, column=20).value,
            sheet.cell(row=row, column=21).value
        )
        list_acoes.append(acoes)

    count = db.query(models.Acao).count()
    if count == 0:
        db.add_all(list_acoes)
        db.commit()


def remove_todas_acoes(db: Session):
    acoes = db.query(Acao).all()

    for acao in acoes:
        db.delete(acao)

    db.commit()


def remove_todos_fundos(db: Session):
    fundos = db.query(FundosImobiliario).all()

    for fundo in fundos:
        db.delete(fundo)

    db.commit()

#
# def getByTicketCurrent(ticker):
#     cotacao = web.DataReader(f"{ticker}.SA", data_source="yahoo")
#     row = cotacao.iloc[-1]
#     return row.to_json()
#
#
# def getTicketByInterval(ticker, inicio, fim):
#     start = convertDate(inicio)
#     end = convertDate(fim)
#     cotacao = web.DataReader(f"{ticker}.SA", data_source="yahoo", start=start, end=end)
#     return cotacao.to_json()
#
#
# def convertDate(datestr):
#     day = int(datestr.split('-')[0])
#     month = int(datestr.split('-')[1])
#     year = int(datestr.split('-')[2])
#     return f'{year}-{month}-{day}'
#
#
# def getMoedaCotacao():
#     request_url = requests.get("http://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL")
#     request_url_dic = request_url.json()
#     return {
#         "dolar": request_url_dic["USDBRL"]["bid"],
#         "euro": request_url_dic["EURBRL"]["bid"],
#         "btc": request_url_dic["BTCBRL"]["bid"],
#         "ethereum": request_url_dic["ETHBRL"]["bid"],
#     }
