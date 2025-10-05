from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Usuario # Asumimos que Usuario tiene ahora los campos de verificación
from schemas import UsuarioCreate, UsuarioOut, RegisterRequest, LoginRequest
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import google.generativeai as genai
import asyncio
from pydantic import BaseModel
import secrets # Para generar tokens
from datetime import datetime, timedelta
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig # Necesario para enviar correos
from fastapi.responses import HTMLResponse
from security import hash_password
from security import verify_password

# ---------------------
# CONFIGURACIÓN GENERAL Y CORREO
# ---------------------
app = FastAPI()

# Cargar variables de entorno (.env)
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# ✅ CONFIGURACIÓN DE CORREO (Asegúrate de configurar estas variables en .env)
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_STARTTLS=os.getenv("MAIL_STARTTLS") == 'True',
    MAIL_SSL_TLS=os.getenv("MAIL_SSL_TLS") == 'True',
    USE_CREDENTIALS=os.getenv("USE_CREDENTIALS") == 'True',
    VALIDATE_CERTS=os.getenv("VALIDATE_CERTS") == 'True'
)

# Crear tablas si no existen (solo si la DB no existe, si existe, usará la tabla modificada)
Base.metadata.create_all(bind=engine)

# Dependencia DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
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
# FUNCIÓN DE SEGURIDAD (Manejo de Contraseña - ¡REEMPLAZAR!)
# ---------------------

# ---------------------
# RUTA DE REGISTRO CON VERIFICACIÓN DE CORREO (REEMPLAZA LA RUTA ANTERIOR)
# ---------------------
@app.post("/register")
async def register(usuario: RegisterRequest, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.correo == usuario.correo).first()
    if user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    
    # 1. Hashea la contraseña y crea el token
    hashed_password = hash_password(usuario.contrasena)
    verification_token = secrets.token_urlsafe(32)
    
    # 2. Crea el usuario en la DB con is_active=False y guarda los tokens
    nuevo_usuario = Usuario(
        nombre_usuario=usuario.nombre_usuario,
        correo=usuario.correo,
        contrasena=hashed_password,
        # Asumimos que el modelo Usuario tiene ahora un campo 'token' (quizás para sesiones)
        token=secrets.token_urlsafe(32),
        
        # CAMPOS DE VERIFICACIÓN (CRUCIALES)
        is_active=False, 
        email_verification_token=verification_token,
        token_creation_time=datetime.utcnow()
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    
    # 3. Envía el correo de verificación
    verification_link = f"http://127.0.0.1:8000/verify-email?token={verification_token}"
    
    message = MessageSchema(
        subject="Verificación de Correo - Miss Cook AI",
        recipients=[usuario.correo],
        body=f"""
        <html>
            <body>
                <h1>¡Hola {usuario.nombre_usuario}!</h1>
                <p>Gracias por registrarte en Miss Cook AI. Para activar tu cuenta, haz clic en el siguiente enlace:</p>
                <p><a href="{verification_link}">CONFIRMAR MI CORREO</a></p>
                <p>Si no te registraste, por favor ignora este correo.</p>
            </body>
        </html>
        """,
        subtype="html"
    )
    
    fm = FastMail(conf)
    try:
        await fm.send_message(message)
    except Exception as e:
        print(f"Error al enviar correo: {e}")
        # Notificar al usuario sin detener el registro
    # return {hash_password}
    return {"message": "Registro exitoso. Revisa tu correo electrónico para activar tu cuenta." }

# ---------------------
# NUEVA RUTA DE VERIFICACIÓN DE CORREO
# ---------------------
@app.get("/verify-email", response_class=HTMLResponse)
async def verify_email(token: str, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(
        Usuario.email_verification_token == token
    ).first()

    if not user:
        return HTMLResponse(content="<h1>❌ Error: Token de verificación inválido o ya expirado.</h1>", status_code=400)

    # 2. Verifica expiración (24 horas de validez del token)
    expiration_limit = timedelta(hours=24)
    if (datetime.utcnow() - user.token_creation_time) > expiration_limit:
        return HTMLResponse(content="<h1>❌ Error: El token ha expirado. Por favor, regístrate de nuevo.</h1>", status_code=400)

    # 3. Activa la cuenta
    user.is_active = True
    user.email_verification_token = None
    user.token_creation_time = None
    db.commit()

    # 4. Retorna éxito y redirige
    return HTMLResponse(content="<h1>✅ ¡Cuenta verificada con éxito! Ya puedes iniciar sesión.</h1><p>Serás redirigido al login en 5 segundos...</p><script>setTimeout(function(){ window.location.href = 'http://localhost:5173/login'; }, 5000);</script>", status_code=200)

# ---------------------
# RUTA DE LOGIN (Verificación de cuenta activa) (REEMPLAZA LA RUTA ANTERIOR)
# ---------------------
@app.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    correo = data.correo
    contrasena = data.contrasena
    usuario = db.query(Usuario).filter(Usuario.correo == correo).first()
    
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if not usuario.is_active:
         raise HTTPException(status_code=403, detail="Cuenta inactiva. Por favor, verifica tu correo electrónico.")

    if not verify_password(contrasena, usuario.contrasena):
        raise HTTPException(status_code=400, detail="Correo o contraseña incorrectos")
    
    return {"message": "Login exitoso", "usuario": usuario.correo}


# ---------------------
# (Rutas de Usuarios, Chat, y Listar Modelos - el resto del código es el mismo)
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


# ---------------------
# RUTA DE DIAGNÓSTICO
# ---------------------
@app.get("/list-models")
def list_models():
    """Endpoint para ver qué modelos de Gemini están disponibles para tu API Key."""
    models_list = []
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            models_list.append(m.name)
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
        model = genai.GenerativeModel('gemini-pro-latest')
        response = await asyncio.to_thread(model.generate_content, prompt)
        reply = response.text
        return {"reply": reply}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error con la IA: {e}")