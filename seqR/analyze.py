from flask import Blueprint, render_template

analyze = Blueprint("analyze", __name__)

@analyze.route("/analyze")
def analyze_page():
    return render_template("analyze/analyze.html")