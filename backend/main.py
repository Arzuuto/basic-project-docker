from fastapi import FastAPI
from dotenv import load_dotenv
from pymongo import MongoClient
from routes import router as todos_router
from fastapi.middleware.cors import CORSMiddleware
import os

load_dotenv()
atlas_uri = os.getenv("ATLAS_URI")
db_name = os.getenv("DB_NAME")

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_db():
    app.mongodb_client= MongoClient(atlas_uri)
    app.database = app.mongodb_client[db_name]

@app.on_event("shutdown")
def shutdown_db():
    app.mongodb_client.close()

app.include_router(todos_router, prefix="/todo")

@app.get("/")
async def root():
    return {"message": "welcome"}