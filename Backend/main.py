from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Usuario
from schemas import UsuarioCreate, UsuarioOut, RegisterRequest
from fastapi.middleware.cors import CORSMiddleware
from schemas import LoginRequest


app = FastAPI()

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/usuarios/", response_model=UsuarioOut)
def crear_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = Usuario(**usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

@app.get("/usuarios/{usuario_id}", response_model=UsuarioOut)
def obtener_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id_usuario == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@app.post("/register", response_model=UsuarioOut)
def register(usuario: RegisterRequest, db: Session = Depends(get_db)):
    print("BODY RECIBIDO:", usuario.dict()) 
    user = db.query(Usuario).filter(Usuario.correo == usuario.correo).first()
    if user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    nuevo_usuario = Usuario(**usuario.dict())
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

#Ruta para el login
@app.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    correo = data.correo
    contrasena = data.contrasena
    usuario = db.query(Usuario).filter(Usuario.correo == correo).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if usuario.contrasena != contrasena:
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")

    return {"message": "Login exitoso", "usuario": usuario.correo}

