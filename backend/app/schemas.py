from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    name: Optional[str] = None
    is_active: bool
    created_at: datetime


class UserUpdate(BaseModel):
    name: Optional[str] = None
    is_active: Optional[bool] = None


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class DeliveryCreate(BaseModel):
    user_id: int
    details: Optional[str] = None
    current_location: Optional[str] = None
    eta: Optional[str] = None


class DeliveryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    status: str
    current_location: Optional[str] = None
    eta: Optional[str] = None
    details: Optional[str] = None
    updated_at: datetime


class DeliveryUpdate(BaseModel):
    status: Optional[str] = None
    current_location: Optional[str] = None
    eta: Optional[str] = None
    details: Optional[str] = None
