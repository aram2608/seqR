import os
from flask import Flask, render_template

def create_app(test_config: str | None=None):
    app: Flask = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
    )

    if test_config is None:
        app.config.from_pyfile("config.py", silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route("/")
    def index():
        return render_template("index.html")

    from . import about
    from . import analyze

    app.register_blueprint(about.about)
    app.register_blueprint(analyze.analyze)

    return app