from uuid import UUID

from fastapi import APIRouter, Depends, status
from src.core.database import SessionLocal
from src.core.schemas import UsuarioRequestSchema, UsuarioResponseSchema, Response
from src.usuarios import service
from src.usuarios.exceptions import token_exception
from src.usuarios.utils import create_refresh_token, create_access_token, get_current_user
from datetime import timedelta
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from  src.core.config import settings


router = APIRouter(
    prefix="/api/v1/usuarios",
    tags=["Usuários"],
    dependencies=[],
    responses={404: {"descrição": "Usuario não encontrado"}},
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
async def create_usuario(usuario: UsuarioRequestSchema, db: Session = Depends(get_db),
                         dependencies=[Depends(get_current_user)]):
    service.create_usuario(db, usuario)
    return Response(code=status.HTTP_201_CREATED, status="created", message="Usuário criado com sucesso!")\
        .dict(exclude_none=True)


@router.put("/")
async def update_usuario(usuario: UsuarioResponseSchema, db: Session = Depends(get_db), dependencies=[Depends(get_current_user)]):
    service.update_usuario(db, usuario)
    return Response(code=status.HTTP_204_NO_CONTENT, status="no content", message="Usuário atualizado com sucesso!")\
        .dict(exclude_none=True)


@router.delete("/{id}")
async def remover_usuario(usuario_id: UUID, db: Session = Depends(get_db), dependencies=[Depends(get_current_user)]):
    service.remove_usuario(db, usuario_id=usuario_id)
    return Response(code=status.HTTP_204_NO_CONTENT, status="no content", message="Usuário removido com sucesso!")\
        .dict(exclude_none=True)


@router.get("/")
async def get_usuarios(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    usuarios = service.get_usuarios(db, skip, limit)
    return Response(code=status.HTTP_200_OK, status="ok", result=usuarios).dict(exclude_none=True)


@router.get("/{id}")
async def get_usuario_by_id(usuario_id: UUID, db: Session = Depends(get_db)):
    usuario = service.get_usuario_by_id(db, usuario_id)
    return Response(code=status.HTTP_200_OK, status="ok", result=usuario).dict(exclude_none=True)


@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    usuario = service.authenticate_usuario(form_data.username, form_data.password, db)
    if not usuario:
        raise token_exception()
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRES_IN)
    access_token = create_access_token(
        data={"sub": usuario.email, "scopes": form_data.scopes},
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token,
            "refresh_token": create_refresh_token(form_data.username),
            "token_type": "bearer"}