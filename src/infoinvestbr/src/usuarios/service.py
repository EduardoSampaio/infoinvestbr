from sqlalchemy.orm import Session
from src.core.models import Usuario
from src.core.schemas import UsuarioResponseSchema, UsuarioRequestSchema
from passlib.context import CryptContext

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_usuarios(db: Session, skip: int = 0, limit: int = 100) -> list[UsuarioResponseSchema]:
    usuarios = db.query(Usuario).offset(skip).limit(limit).all()

    list_usuario_schema = []
    for usuario in usuarios:
        list_usuario_schema.append(convert_model_to_schema(usuario))

    return list_usuario_schema


def get_usuario_by_id(db: Session, usuario_id: int) -> UsuarioResponseSchema:
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    return convert_model_to_schema(usuario)


def get_usuario_by_email(db: Session, email: str) -> UsuarioResponseSchema:
    usuario = db.query(Usuario).filter(Usuario.email == email).first()
    return convert_model_to_schema(usuario)


def create_usuario(db: Session, usuario: UsuarioRequestSchema) -> Usuario:
    hashed_senha = bcrypt_context.hash(usuario.senha)
    _usuario = Usuario(nome=usuario.nome, email=usuario.email, senha=hashed_senha)
    db.add(_usuario)
    db.commit()
    db.refresh(_usuario)
    return _usuario


def create_usuario_google(db: Session, nome: str, email: str, imagem: str) -> Usuario:
    _usuario = Usuario(nome=nome, email=email, imagem=imagem)
    db.add(_usuario)
    db.commit()
    db.refresh(_usuario)
    return _usuario


def remove_usuario(db: Session, usuario_id: int):
    _usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    db.delete(_usuario)
    db.commit()


def update_usuario(db: Session, usuario: UsuarioResponseSchema):
    _usuario = get_usuario_by_id(db, usuario.usuario_id)
    _usuario.nome = usuario.nome
    _usuario.email = usuario.email
    _usuario.imagem = usuario.imagem
    db.commit()
    db.refresh(_usuario)


def get_password_hash(password):
    return bcrypt_context.hash(password)


def verify_password(plain_password, hashed_password):
    return bcrypt_context.verify(plain_password, hashed_password)


def authenticate_usuario(email: str, password: str, db: Session):
    usuario = db.query(Usuario).filter(Usuario.email == email).first()

    if not usuario:
        return False
    if not verify_password(password, usuario.senha):
        return False
    return usuario


def convert_model_to_schema(model: Usuario) -> UsuarioResponseSchema:
    return UsuarioResponseSchema(
        usuario_id=model.id,
        is_admin=model.is_admin,
        email=model.email,
        nome=model.nome,
        imagem=model.imagem
    )
