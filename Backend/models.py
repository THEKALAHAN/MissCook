from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from database import Base
from datetime import datetime

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

    is_active = Column(Boolean, default=False, nullable=False) 
    
    # Token único para la URL   de verificación
    email_verification_token = Column(String(255), nullable=True, unique=True)
    
    # Tiempo para la expiración del token (establecido al momento del registro)
    token_creation_time = Column(DateTime, default=datetime.utcnow, nullable=True) 
    
    codigo = Column(String, nullable=True)
    
    expiracion_codigo = Column(DateTime, nullable=True)