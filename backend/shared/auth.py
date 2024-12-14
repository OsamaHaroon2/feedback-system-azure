import jwt  # Make sure this refers to PyJWT
import os
from datetime import datetime, timedelta

SECRET_KEY = os.getenv("JWT_SECRET_KEY")

def encode_jwt(payload):
    """
    Encodes a JWT token with a 24-hour expiry.
    """
    payload["exp"] = datetime.utcnow() + timedelta(hours=24)
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")  # Ensure PyJWT's jwt.encode is used

def decode_jwt(token):
    """
    Decodes a JWT token and validates its expiry and integrity.
    """
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])  # Ensure PyJWT's jwt.decode is used
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired.")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token.")
