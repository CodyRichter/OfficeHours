from fastapi import HTTPException
from starlette.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    HTTP_409_CONFLICT,
)

from src.settings import settings

session_not_found_exception = HTTPException(
    status_code=HTTP_404_NOT_FOUND,
    detail="Unable to find office hour session with given ID.",
)

session_not_active_exception = HTTPException(
    status_code=HTTP_403_FORBIDDEN,
    detail="Unable to join. Session is not active.",
)
