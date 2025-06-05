from flask import Flask, render_template, request, redirect, url_for
import os
import sqlite3
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
DB = 'media.db'

# Initialize database if it doesn't exist
def init_db():
    with sqlite3.connect(DB) as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS media 
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT,
                tags TEXT
            )
        ''')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods = ['GET', 'POST'])
def upload():
    if request.method == 'POST':
        file = request.files['media']
        tags = request.form['tags']
        if file:
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            with sqlite3.connect(DB) as conn:
                conn.execute('INSERT INTO media (filename, tags) VALUES (?, ?)', (filename, tags))
            return redirect(url_for('gallery'))
    return render_template('upload.html')

@app.route('/gallery')
def gallery():
    with sqlite3.connect(DB) as conn:
        rows = conn.execute('SELECT filename, tags FROM media').fetchall()
    return render_template('gallery.html', media=rows)

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    init_db()
    app.run(debug=True)
