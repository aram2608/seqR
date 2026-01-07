import os
from flask import Flask, render_template
from .config import DevConfig


def create_app(test_config: str | None = None):
    app: Flask = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
    )

    if test_config is None:
        app.config.from_object(DevConfig)
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
    from . import more

    app.register_blueprint(about.about)
    app.register_blueprint(analyze.analyze)
    app.register_blueprint(more.more)

    return app
