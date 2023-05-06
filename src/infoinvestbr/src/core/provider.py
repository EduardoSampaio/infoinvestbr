from fastapi import APIRouter, Depends
from fastapi_sso.sso.google import GoogleSSO
from starlette.responses import HTMLResponse, RedirectResponse
from starlette.requests import Request as StarletteRequest
from src.core.database import SessionLocal
from src.core.config import settings
from src.core.schemas import UsuarioRequestProviderSchema
from src.usuarios.utils import create_access_token
from src.usuarios import service
from datetime import timedelta
from sqlalchemy.orm import Session

google_sso = GoogleSSO(settings.GOOGLE_CLIENT_ID, settings.GOOGLE_CLIENT_SECRET,
                       "http://localhost:8000/google/callback")

router = APIRouter(
    tags=["Auth"],
    prefix="/api/v1",
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


@router.get("/google/login")
async def google_login():
    """Generate login url and redirect"""
    redirect = await google_sso.get_login_redirect()
    location, url = redirect.headers.raw[1]
    return {
        "location": url
    }


@router.get("/google/callback")
async def google_callback(request: StarletteRequest):
    """Process login response from Google and return user info"""
    usuario = await google_sso.verify_and_process(request)
    request.session["usuario"] = dict(usuario)
    return RedirectResponse(url=f'http://localhost:3000')


@router.post("/auth/google")
async def auth_google_token(usuario: UsuarioRequestProviderSchema, db: Session = Depends(get_db)):
    exist_usuario = service.get_usuario_by_email(db, usuario.email)
    if exist_usuario is None:
        novo_usuario = service.create_usuario_google(db,
                                                     nome=usuario.nome,
                                                     email=usuario.email,
                                                     imagem=usuario.imagem)
        return criar_usuario_provider(novo_usuario, usuario)
    else:
        return criar_usuario_provider(exist_usuario, usuario)


def criar_usuario_provider(exist_usuario, usuario):
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRES_IN)
    access_token = create_access_token(
        data={"sub": usuario.email, "scopes": "openid"},
        expires_delta=access_token_expires,
    )
    return {
        "id": exist_usuario.id,
        "imagem": exist_usuario.imagem,
        "nome": usuario.nome,
        "email": exist_usuario.email,
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get('/')
async def home(request: StarletteRequest):
    user = request.session.get("user")
    if user is not None:
        email = user['email']
        image = user['picture']
        html = (
            f'<img src={image} style="width=40px; height:40px"/>'
            f'<pre>Email: {email}</pre><br>'
            '<a href="/docs">documentation</a><br>'
            '<a href="/logout">logout</a>'
        )
        return HTMLResponse(html)
    return HTMLResponse('<a href="/google/login">login</a>')


@router.get('/logout')
async def logout(request: StarletteRequest):
    request.session.pop('user', None)
    return RedirectResponse(url='/')
