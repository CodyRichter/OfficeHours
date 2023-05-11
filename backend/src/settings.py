from pydantic import BaseSettings


class Settings(BaseSettings):
    auth_secret: str = "DEVELOPMENT_AUTH_SECRET"
    AWS_ACCESS_KEY: str
    AWS_SECRET_KEY: str
    AWS_FILE_BUCKET_NAME: str = "accoh-files"
    DATABASE_URL: str = "postgresql://postgres:password@accoh-database:5432/accoh"
    REDIS_HOST: str = "accoh-redis"
    REDIS_PORT: str = "6379"
    REDIS_PASSWORD: str = "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81"


settings = Settings()
