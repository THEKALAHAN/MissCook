from pydantic import BaseModel, EmailStr
from typing import Optional # ¡CRUCIAL para campos que pueden ser None!
from datetime import datetime # Necesaria para el campo de tiempo

# -------------------------------------------------------------
# MODELOS BASE
# -------------------------------------------------------------
class UsuarioBase(BaseModel):
    # Campos del formulario (requeridos al enviar)
    nombre_usuario: str
    token: str
    correo: str
    contrasena: str
    
    # ✅ Campos opcionales que existen en la DB (Aceptan None/null)
    nacionalidad: Optional[str] = None
    edad: Optional[int] = None
    peso: Optional[float] = None
    altura: Optional[int] = None
    
    # ✅ Campos de verificación de correo
    is_active: Optional[bool] = None
    email_verification_token: Optional[str] = None
    token_creation_time: Optional[datetime] = None 

class UsuarioCreate(UsuarioBase):
    pass

class UsuarioOut(UsuarioBase):
    id_usuario: int

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    correo: str
    contrasena: str

# -------------------------------------------------------------
# MODELO RegisterRequest (El que recibe la ruta /register)
# -------------------------------------------------------------
class RegisterRequest(BaseModel):
    # Campos requeridos por el formulario
    nombre_usuario: str
    correo: str
    contrasena: str
    token: str
    
    # ✅ Campos opcionales enviados como null desde React
    nacionalidad: Optional[str] = None
    edad: Optional[int] = None
    peso: Optional[float] = None
    altura: Optional[int] = None
    
class EmailRequest(BaseModel):
    email: EmailStr
    
class CodigoVerificacionRequest(BaseModel):
    email: EmailStr
    codigo: str
