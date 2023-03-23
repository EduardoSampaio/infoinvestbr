from fastapi import APIRouter, Depends
from fastapi_sso.sso.google import GoogleSSO
from starlette.responses import HTMLResponse, RedirectResponse
from starlette.requests import Request as StarletteRequest
from database import SessionLocal
from config import settings
from usuarios.utils import create_access_token, create_refresh_token
from datetime import timedelta
from usuarios import service
from sqlalchemy.orm import Session

google_sso = GoogleSSO(settings.GOOGLE_CLIENT_ID, settings.GOOGLE_CLIENT_SECRET,
                       "http://localhost:8000/google/callback")

router = APIRouter(
    tags=["Auth"],
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


@router.get("/google/login", tags=['authentication'])
async def google_login():
    """Generate login url and redirect"""
    return await google_sso.get_login_redirect()


@router.get("/google/callback", tags=['authentication'])
async def google_callback(request: StarletteRequest, db: Session = Depends(get_db)):
    """Process login response from Google and return user info"""
    usuario = await google_sso.verify_and_process(request)
    request.session["usuario"] = dict(usuario)

    if usuario is not None:
        service.create_usuario_google(db, nome=usuario.display_name, email=usuario.email, imagem=usuario.picture)

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRES_IN)
    access_token = create_access_token(
        data={"sub": usuario.email, "scopes": "openid"},
        expires_delta=access_token_expires,
    )

    return {
        "id": usuario.id,
        "picture": usuario.picture,
        "display_name": usuario.display_name,
        "email": usuario.email,
        "provider": usuario.provider,
        "access_token": access_token,
        "refresh_token": create_refresh_token(usuario.email),
        "token_type": "bearer"
    }
    # return RedirectResponse(url='/')


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


@router.get('/logout', tags=['authentication'])
async def logout(request: StarletteRequest):
    request.session.pop('user', None)
    return RedirectResponse(url='/')
