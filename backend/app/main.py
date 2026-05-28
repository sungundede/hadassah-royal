from contextlib import asynccontextmanager
from datetime import datetime
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, status, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select

from .database import engine, init_db, get_session
from .models import User, Delivery
from .schemas import (
    UserCreate,
    UserRead,
    UserUpdate,
    Token,
    DeliveryCreate,
    DeliveryRead,
    DeliveryUpdate,
)
from .security import (
    create_access_token,
    decode_access_token,
    get_password_hash,
    verify_password,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="Hadassah Royal Backend", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

clients: List[WebSocket] = []


def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> User:
    subject = decode_access_token(token)
    if not subject:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
    statement = select(User).where(User.email == subject)
    user = session.exec(statement).first()
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found or inactive")
    return user


@app.post("/auth/register", response_model=UserRead)
def register_user(user_in: UserCreate, session: Session = Depends(get_session)) -> User:
    statement = select(User).where(User.email == user_in.email)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email is already registered")
    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        name=user_in.name,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@app.post("/auth/login", response_model=Token)
def login_user(user_in: UserCreate, session: Session = Depends(get_session)) -> Token:
    statement = select(User).where(User.email == user_in.email)
    user = session.exec(statement).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token = create_access_token(subject=user.email)
    return Token(access_token=access_token)


@app.get("/users/me", response_model=UserRead)
def read_me(current_user: User = Depends(get_current_user)) -> User:
    return current_user


@app.get("/users/{user_id}", response_model=UserRead)
def read_user(user_id: int, session: Session = Depends(get_session)) -> User:
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@app.patch("/users/{user_id}", response_model=UserRead)
def update_user(user_id: int, user_update: UserUpdate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> User:
    if current_user.id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cannot update another account")
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user_data = user_update.dict(exclude_unset=True)
    for key, value in user_data.items():
        setattr(user, key, value)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@app.post("/deliveries", response_model=DeliveryRead)
def create_delivery(delivery_in: DeliveryCreate, session: Session = Depends(get_session)) -> Delivery:
    user = session.get(User, delivery_in.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    delivery = Delivery(
        user_id=delivery_in.user_id,
        status="pending",
        current_location=delivery_in.current_location,
        eta=delivery_in.eta,
        details=delivery_in.details,
        updated_at=datetime.utcnow(),
    )
    session.add(delivery)
    session.commit()
    session.refresh(delivery)
    return delivery


@app.get("/deliveries", response_model=List[DeliveryRead])
def list_deliveries(user_id: Optional[int] = None, session: Session = Depends(get_session)) -> List[Delivery]:
    statement = select(Delivery)
    if user_id is not None:
        statement = statement.where(Delivery.user_id == user_id)
    return session.exec(statement).all()


@app.get("/deliveries/{delivery_id}", response_model=DeliveryRead)
def read_delivery(delivery_id: int, session: Session = Depends(get_session)) -> Delivery:
    delivery = session.get(Delivery, delivery_id)
    if not delivery:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Delivery not found")
    return delivery


@app.patch("/deliveries/{delivery_id}", response_model=DeliveryRead)
async def update_delivery(delivery_id: int, delivery_update: DeliveryUpdate, session: Session = Depends(get_session)) -> Delivery:
    delivery = session.get(Delivery, delivery_id)
    if not delivery:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Delivery not found")
    update_data = delivery_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(delivery, key, value)
    delivery.updated_at = datetime.utcnow()
    session.add(delivery)
    session.commit()
    session.refresh(delivery)
    await broadcast_delivery_update(delivery)
    return delivery


@app.websocket("/deliveries/stream")
async def delivery_stream(websocket: WebSocket) -> None:
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        clients.remove(websocket)


async def broadcast_delivery_update(delivery: Delivery) -> None:
    payload = {
        "id": delivery.id,
        "user_id": delivery.user_id,
        "status": delivery.status,
        "current_location": delivery.current_location,
        "eta": delivery.eta,
        "details": delivery.details,
        "updated_at": delivery.updated_at.isoformat(),
    }
    for client in clients[:]:
        try:
            await client.send_json(payload)
        except RuntimeError:
            clients.remove(client)
