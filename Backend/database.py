from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

SERVER = "PABLO-LEAL\SQLEXPRESS"
DATABASE = "Misscook"

DATABASE_URL = (
    "mssql+pyodbc://@PABLO-LEAL\\SQLEXPRESS/Misscook"
    "?driver=ODBC+Driver+17+for+SQL+Server"
    "&trusted_connection=yes"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
