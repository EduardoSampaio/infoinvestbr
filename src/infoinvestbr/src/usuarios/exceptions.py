from fastapi import HTTPException, status


def get_user_exception():
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Acesso Negado!",
        headers={"WWW-Authenticate": "Bearer"}
    )


def token_exception():
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Usuário ou Senha incorretos!",
        headers={"WWW-Authenticate": "Bearer"}
    )
