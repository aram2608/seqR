from flask import Blueprint, render_template, flash, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from wtforms.validators import DataRequired
import http

analyze: Blueprint = Blueprint("analyze", __name__)


class FileForm(FlaskForm):
    """
    The class used for handle file submissions for the Analysis page.
    Currently there are three total fields:
        meta_data
        count_data
        submit

    """

    meta_data = FileField("Meta Data", validators=[DataRequired()])
    count_data = FileField("Counts Data", validators=[DataRequired()])
    submit: FileField = SubmitField("Submit")


@analyze.route("/process", methods=["GET", "POST"])
def process_page():
    return render_template("analyze/process.html")


@analyze.route("/analyze", methods=["GET", "POST"])
def analyze_page():
    """
    Method used by the analyze page to handle submisson of files and analysis.
    For now this method simply saves the uploaded files.
    """
    form = FileForm()
    if form.validate_on_submit():
        print("Submit")
        flash(
            f"Files submitted sucessfuly: {form.count_data.data} {form.count_data.data}"
        )
        return redirect(url_for("analyze.process_page"))

    if form.errors:
        print(form.errors)
    return render_template("analyze/submit.html", form=form)

@analyze.route("/run-calculation", methods=["GET", "POST"])
def run_calc():
    return """
    <p> TODO: Implememnt this functionality </p>
"""