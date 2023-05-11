import logging

from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware

from src.database import create_db, db_session_dep
from src.routers.auth_router import auth_router, manager
from src.routers.session_router import session_router
import sqlalchemy

logger = logging.Logger("Main")

app = FastAPI()

app.include_router(
    session_router,
    prefix="/session",
    tags=["session"],
    responses={404: {"detail": "Not found"}},
)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["auth"],
    responses={404: {"detail": "Not found"}},
)

manager.useRequest(app)

logger = logging.getLogger("api")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_headers=["*"],
    allow_methods=["*"],
)


@app.on_event("startup")
def startup(session=Depends(db_session_dep)):
    create_db()


@app.get("/")
def healthcheck():
    # return "AccOH Backend is Running!"
    return "Containerized App is Running!"


@app.exception_handler(sqlalchemy.exc.OperationalError)
async def validation_exception_handler(request, err):
    logger.error(f"Database connection error on {request.url}: {err}")

    return JSONResponse(
        status_code=503,
        content={
            "detail": "Server is currently unable to handle the request. Please try again later. Error code: 503-DBTMC"
        },
    )
