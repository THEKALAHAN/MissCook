from passlib.context import CryptContext
import hashlib

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#Encripta la contraseña
def hash_password(password: str) -> str:
    sha256 = hashlib.sha256(password.encode("utf-8")).digest()
    return pwd_context.hash(sha256)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Compara una contraseña ingresada con la encriptada"""
    return pwd_context.verify(plain_password, hashed_password)