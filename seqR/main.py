from flask import Flask
import http

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/pong")
def pong():
    return {
        "STATUS": http.HTTPStatus.OK,
        "message": "pong",
        }