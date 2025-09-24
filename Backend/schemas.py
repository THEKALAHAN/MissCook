from pydantic import BaseModel

class UsuarioBase(BaseModel):
    nombre_usuario: str | None = None
    token: str
    correo: str
    contrasena: str
    nacionalidad: str | None = None
    edad: int | None = None
    peso: float | None = None
    altura: int | None = None

class UsuarioCreate(UsuarioBase):
    pass

class UsuarioOut(UsuarioBase):
    id_usuario: int

    class Config:
        orm_mode = True
