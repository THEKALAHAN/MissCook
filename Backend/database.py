from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

SERVER = "PABLO-LEAL\SQLEXPRESS"
DATABASE = "Misscook"
# USERNAME = "root"
# PASSWORD = ""

# Cadena de conexión con pyodbc
DATABASE_URL = (
    "mssql+pyodbc://@PABLO-LEAL\\SQLEXPRESS/Misscook"
    "?driver=ODBC+Driver+17+for+SQL+Server"
    "&trusted_connection=yes"
)

# Crear el motor
engine = create_engine(DATABASE_URL)

# Crear sesión
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos
Base = declarative_base()
