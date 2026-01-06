from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import http
import shutil
import os

app = FastAPI()

SAVE_DIR = "uploads"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/pong")
async def pong():
    return {
        "STATUS": http.HTTPStatus.OK,
        "message": "pong",
        }

@app.post("/api/data")
async def get_count_data(file: UploadFile):
    """
    Endpoint to recieve the count data from the frontend.
    """
    if file:
        if file.filename == "":
            return {
                "STATUS": http.HTTPStatus.BAD_REQUEST,
                "message": "No file provided",
                }
        file_location = f"{SAVE_DIR}/{file.filename}"

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {
            "STATUS": http.HTTPStatus.OK,
            "message": "File loaded succesfully",
            "content-type": file.content_type
            }
    else:
        return {
            "STATUS": http.HTTPStatus.BAD_REQUEST,
            "message": "File not received",
            }

if __name__ == "__main__":
    print("")
