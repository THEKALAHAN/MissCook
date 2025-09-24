from sqlalchemy import Column, Integer, String, Float
from database import Base

class Usuario(Base):
    __tablename__ = "Usuarios"

    id_usuario = Column(Integer, primary_key=True, index=True, nullable=False)
    nombre_usuario = Column(String(50))
    token = Column(String(100), nullable=False)
    correo = Column(String(80), nullable=False, unique=True, index=True)
    contrasena = Column(String(16), nullable=False)
    nacionalidad = Column(String(30))
    edad = Column(Integer)
    peso = Column(Float)
    altura = Column(Integer)