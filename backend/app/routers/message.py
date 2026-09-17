from fastapi import APIRouter, HTTPException, status, Depends, WebSocketDisconnect, WebSocket 
from sqlalchemy.orm import Session
from settings.database import get_db
from schemas.message import MessageResponse, CreateMessageSchema
from crud.message import BaseMessage
from typing import List, Annotated
from dependencies.auth import BaseAuth
from models.models import User 
from datetime import datetime, timezone
import uuid

router = APIRouter(prefix="/api", tags=["Message"])

CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]
DataBaseEngine = Annotated[Session, Depends(get_db)]


@router.websocket("/ws/create-message")
async def websocket_endpoint(websocket: WebSocket, db: DataBaseEngine):
    await websocket.accept()
    try:
        while True:
            message = await websocket.receive_json()
            sent_at = datetime.now(timezone.utc)
            message["sent_at"] = sent_at
            await BaseMessage.create_message(data=message, db=db)
    except WebSocketDisconnect:
        raise HTTPException(status_code=status.WS_1002_PROTOCOL_ERROR, detail="Network error")


@router.get("/messages", response_model=List[MessageResponse])
async def api_get_messages(db: DataBaseEngine):
    messages = await BaseMessage.get_messages(db=db)
    return messages

@router.delete("/message/delete/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
async def api_delete_message(message_id: uuid.UUID, current_user: CurrentUser, db: DataBaseEngine):
    message = BaseMessage.get_message_by_id(id=message_id, db=db)
    if message is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    is_deleted = BaseMessage.delete_message(id=message_id, db=db)
    if not is_deleted:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return {"message": "Message deleted succesfully"}