from flask import Flask, render_template
import Pillow
import PDFMiner
import PyPDF2

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('MixToolz.html')

if __name__ == "__main__":
    app.run(debug=True)


