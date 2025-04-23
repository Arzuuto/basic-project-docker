from fastapi import APIRouter, Body, Request, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Todo, TodoUpdate

router = APIRouter()

@router.post("/", response_description="Create a todo", status_code=status.HTTP_201_CREATED, response_model=Todo)
def create_todo(request: Request, todo: Todo = Body(...)):
    todo = jsonable_encoder(todo)
    new_todo = request.app.database["todos"].insert_one(todo)
    created_todo = request.app.database["todos"].find_one(
        {"_id": new_todo.inserted_id}
    )
    return created_todo

@router.get("/", response_model=List[Todo])
def list_todos(request: Request):
    todos = list(request.app.database["todos"].find())
    return todos