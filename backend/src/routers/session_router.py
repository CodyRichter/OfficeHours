from datetime import datetime, timedelta
import io
import logging
import random
from typing import List, Union
import uuid
from src.models import (
    SessionInternal,
    SessionCreate,
    SessionExport,
    SessionListResponse,
    UserInternal,
)
from src.routers.auth_router import is_instructor
from src.database import db_session_dep

from fastapi import APIRouter, Depends, WebSocket

session_router = APIRouter()
logger = logging.Logger("Session")


@session_router.get("/active", response_model=SessionListResponse)
def get_active_sessions(
    db_session=Depends(db_session_dep), user: UserInternal = Depends(is_instructor)
):
    logger.info(f"User {user.id} is requesting active sessions")

    active_user_sessions = db_session.query(SessionInternal).filter(
        SessionInternal.host_id == user.id, SessionInternal.active == True
    )

    # Filter to export
    active_user_sessions = [
        SessionExport(**session.__dict__, host=session.host)
        for session in active_user_sessions
    ]

    return SessionListResponse(sessions=active_user_sessions)


@session_router.get("/inactive", response_model=SessionListResponse)
def get_inactive_sessions(
    db_session=Depends(db_session_dep), user: UserInternal = Depends(is_instructor)
):
    logger.info(f"User {user.id} is requesting active sessions")

    inactive_user_sessions = db_session.query(SessionInternal).filter(
        SessionInternal.host_id == user.id, SessionInternal.active == False
    )

    inactive_user_sessions = [
        SessionExport(**session.__dict__, host=session.host)
        for session in inactive_user_sessions
    ]

    return SessionListResponse(sessions=inactive_user_sessions)


@session_router.post("/", response_model=SessionExport)
def create_session(
    create: SessionCreate,
    db_session=Depends(db_session_dep),
    user: UserInternal = Depends(is_instructor),
):

    letters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
    ]

    # Generate a random 6 digit code
    code = ""
    for i in range(6):
        code += random.choice(letters)

    new_oh_session = SessionInternal(
        id=str(uuid.uuid4()),
        title=create.title,
        description=create.description,
        start_time=create.start_time,
        end_time=create.end_time,
        active=False,
        room_code=code,
        host_id=user.id,
    )

    db_session.add(new_oh_session)
    db_session.commit()

    return SessionExport(
        id=new_oh_session.id,
        title=new_oh_session.title,
        description=new_oh_session.description,
        start_time=new_oh_session.start_time,
        end_time=new_oh_session.end_time,
        active=new_oh_session.active,
        room_code=new_oh_session.room_code,
        host=user,
    )


@session_router.get("/{session_id}", response_model=SessionExport)
def get_session(
    session_id: str,
    db_session=Depends(db_session_dep),
    user: UserInternal = Depends(is_instructor),
):
    session = (
        db_session.query(SessionInternal)
        .filter(SessionInternal.id == session_id)
        .first()
    )

    return SessionExport(
        id=session.id,
        title=session.title,
        description=session.description,
        start_time=session.start_time,
        end_time=session.end_time,
        active=session.active,
        room_code=session.room_code,
        host=user,
    )


# TODO: Create Websocket For Session Data
@session_router.websocket("/ws/{session_id}")
async def get_session_data_for_student(
    session: str,
    websocket: WebSocket,
    db_session=Depends(db_session_dep),
    user: UserInternal = Depends(is_instructor),
):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")


@session_router.get("/test")
def test(
    db_session=Depends(db_session_dep), user: UserInternal = Depends(is_instructor)
):
    return "Hello World!"
