from typing import List, Optional

from pydantic.main import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import (
    Column as SAColumn,
    ARRAY as SAArray,
    String as SAString,
)
from sqlalchemy.orm import RelationshipProperty as SARelationshipProperty

# ----- ----- ----- ----- -----
# Tables
# ----- ----- ----- ----- -----


class UserInternal(SQLModel, table=True):
    __tablename__ = "users"

    id: int = Field(default=None, primary_key=True)
    email: str = Field(default=None, index=True)
    first_name: str = Field(default=None, index=True)
    last_name: str = Field(default=None, index=True)
    hashed_password: str = Field(default=None)
    enabled: bool = Field(default=True)
    admin: bool = Field(default=False)

    sessions_hosted: List["SessionInternal"] = Relationship(back_populates="host")
    sessions_shared: List["SessionSharingInternal"] = Relationship(
        back_populates="user"
    )


class StudentParticipant(SQLModel, table=True):
    __tablename__ = "student_participants"

    id: int = Field(default=None, primary_key=True)
    name: str = Field(default=None, index=True)

    session_id: str = Field(default=None, foreign_key="sessions.id")
    session: Optional["SessionInternal"] = Relationship(back_populates="students")

    session_data: Optional["SessionDataInternal"] = Relationship(
        back_populates="student"
    )


class SessionInternal(SQLModel, table=True):
    __tablename__ = "sessions"

    id: str = Field(default=None, primary_key=True)

    title: str = Field(default=None)
    description: str = Field(default=None)
    active: bool = Field(default=False)
    start_time: str = Field(default=None)
    end_time: str = Field(default=None)

    room_code: str = Field(default=None, index=True)

    # Session Host
    host_id: Optional[int] = Field(default=None, foreign_key="users.id")
    host: Optional[UserInternal] = Relationship(back_populates="sessions_hosted")

    # Session Sharing
    sharing: List["SessionSharingInternal"] = Relationship(back_populates="session")

    # Session Data
    data: List["SessionDataInternal"] = Relationship(back_populates="session")

    # Students Participating
    students: List["StudentParticipant"] = Relationship(back_populates="session")


class SessionDataInternal(SQLModel, table=True):
    __tablename__ = "session_data"

    id: int = Field(default=None, primary_key=True)

    # Session Data
    session_id: str = Field(default=None, foreign_key="sessions.id")
    session: Optional[SessionInternal] = Relationship(back_populates="data")

    # Student Data
    student_id: int = Field(default=None, foreign_key="student_participants.id")
    student: Optional[StudentParticipant] = Relationship(back_populates="session_data")

    # Collaboration Data
    code_language: str = Field(default=None)
    code: str = Field(default=None)
    notes: str = Field(default=None)
    questions: str = Field(default=None)
    raised_hand: bool = Field(default=False)
    files: List["FileUploadInternal"] = Relationship(back_populates="session_data")


class SessionSharingInternal(SQLModel, table=True):
    __tablename__ = "session_sharing"

    id: int = Field(default=None, primary_key=True)

    session_id: str = Field(default=None, foreign_key="sessions.id")
    session: Optional[SessionInternal] = Relationship(back_populates="sharing")

    user_id: int = Field(default=None, foreign_key="users.id")
    user: Optional[UserInternal] = Relationship(back_populates="sessions_shared")


class FileUploadInternal(SQLModel, table=True):
    __tablename__ = "file_uploads"

    id: int = Field(default=None, primary_key=True)

    session_data_id: int = Field(default=None, foreign_key="session_data.id")
    session_data: Optional["SessionDataInternal"] = Relationship(back_populates="files")


# ----- ----- ----- ----- -----
# User Models
# ----- ----- ----- ----- -----


class StudentUser(SQLModel, table=False):
    id: str
    room_code: str
    name: str
    email: str


class UserCreate(SQLModel, table=False):
    first_name: str
    last_name: str
    email: str
    password: str


class UserExport(SQLModel, table=False):
    first_name: str
    last_name: str
    email: str
    admin: bool


# ----- ----- ----- ----- -----
# Session API Response Models
# ----- ----- ----- ----- -----


class SessionCreate(SQLModel, table=False):
    title: str
    description: str
    start_time: str
    end_time: str


class SessionExport(SQLModel, table=False):
    id: str
    title: str
    description: str
    active: bool
    start_time: str
    end_time: str
    room_code: str
    host: UserExport


class SessionListResponse(SQLModel, table=False):
    sessions: List[SessionExport]


class SessionDataExport(SQLModel, table=False):
    id: int
    session_id: str
    student_id: int
    code_language: str
    code: str
    notes: str
    questions: str
    raised_hand: bool
    files: List[str]


# ----- ----- ----- ----- -----
# General API Response Models
# ----- ----- ----- ----- -----
