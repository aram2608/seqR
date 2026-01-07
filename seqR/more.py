from flask import Blueprint, render_template

more: Blueprint = Blueprint("/more", __name__)

@more.route("/more")
def more_page():
    return render_template("more/more.html")