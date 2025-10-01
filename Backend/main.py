from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Usuario
from schemas import UsuarioCreate, UsuarioOut, RegisterRequest, LoginRequest
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import google.generativeai as genai
import asyncio
from pydantic import BaseModel

# ---------------------
# CONFIGURACIÓN GENERAL
# ---------------------
app = FastAPI()

# Cargar variables de entorno (.env)
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

# Dependencia DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS (para conectar React con FastAPI)
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

# ---------------------
# MODELOS PARA CHAT
# ---------------------
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

# ---------------------
# (Rutas de Usuarios - sin cambios)
# ---------------------
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


# ---------------------
# RUTA DE DIAGNÓSTICO
# ---------------------
@app.get("/list-models")
def list_models():
    """Endpoint para ver qué modelos de Gemini están disponibles para tu API Key."""
    print("\n--- Solicitud para listar modelos disponibles ---")
    models_list = []
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"Modelo encontrado: {m.name}")
            models_list.append(m.name)
    print("--- Fin de la lista ---")
    if not models_list:
        print("No se encontraron modelos compatibles.")
    return {"available_models": models_list}

# ---------------------
# RUTA DE CHAT CON GOOGLE GEMINI
# ---------------------
@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(body: ChatRequest):
    prompt = body.message
    if not prompt:
        raise HTTPException(status_code=400, detail="El mensaje está vacío")

    try:
        print(f"--- Recibida petición para Google Gemini: '{prompt}' ---")
        
        # Usamos el nombre de un modelo que sabemos que está disponible para ti.
        model = genai.GenerativeModel('gemini-pro-latest')
        response = await asyncio.to_thread(model.generate_content, prompt)
        
        reply = response.text
        print("Google Gemini respondió exitosamente.")
        return {"reply": reply}

    except Exception as e:
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        print("!!!    ERROR AL CONTACTAR A GOOGLE GEMINI  !!!")
        print(f"!!! El error detallado es: {e}          !!!")
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        
        raise HTTPException(status_code=500, detail=f"Error con la IA: {e}")

