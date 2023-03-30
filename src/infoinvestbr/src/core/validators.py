import re as regex
from src.core.database import SessionLocal
from src.core.models import Usuario


def min_length(minimo: int, valor: str, campo: str):
    if len(valor) <= minimo:
        raise ValueError(f'{campo} deve ter no mínimo 4 caracteres')


def required(valor: str, campo):
    if valor is None:
        raise ValueError(f'{campo} é obrigatório')


def max_length(maximo: int, valor: str, campo: str):
    if len(valor) > 30:
        raise ValueError(f'{campo} deve ter no máximo {maximo} caracteres')


def validar_email(valor: str):
    regex_pattern = r"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[" \
                    r"a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
    if not regex.match(regex_pattern, valor):
        raise ValueError('Por favor insira um email válido!')


def validar_email_existente(valor: str):
    db = SessionLocal()
    try:
        usuario = db.query(Usuario).filter(Usuario.email == valor).first()
        if usuario is not None:
            raise ValueError(f'Email ja utilizado!')
    finally:
        db.close()
