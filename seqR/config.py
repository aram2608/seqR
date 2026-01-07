import os


class DevConfig:
    DEBUG: bool = True
    SECRET_KEY: str = (
        os.environ.get("SECRET_KEY")
        or "192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727823bcbf"
    )
    UPLOAD_DIR: str = "uploads"
    CONFIG_DIR: str = "config"
    RESULTS_DIR: str = "results"
