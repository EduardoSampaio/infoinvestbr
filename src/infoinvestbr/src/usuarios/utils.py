from typing import Optional

from fastapi import Depends, HTTPException, Request
from datetime import datetime, timedelta
from typing import Union, Any
from src.core.config import settings
from src.core.database import SessionLocal
from src.usuarios.exceptions import get_user_exception
from jose import JWTError, jwt
from src.usuarios import service
from fastapi.security import (
    OAuth2PasswordBearer,
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="api/v1/users/token",
    scopes={"me": "Read information about the current user.", "items": "Read items."},
)


async def get_user(request: Request) -> Optional[dict]:
    user = request.session.get('user')
    if user is not None:
        return user
    else:
        raise HTTPException(status_code=403, detail='Could not validate credentials.')


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRES_IN)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def create_refresh_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes=settings.REFRESH_TOKEN_EXPIRES_IN)

    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=settings.JWT_ALGORITHM)
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=404, detail="User not found")
        return {"username": username}
    except JWTError:
        raise get_user_exception()
