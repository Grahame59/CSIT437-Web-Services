from flask import Flask, render_template, request, jsonify, url_for
import os
import sqlite3
from werkzeug.utils import secure_filename  # Safely sanitizes uploaded file names

# Init Flask app
app = Flask(__name__)

# Define folder to store uploaded files
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
DB = 'media.db'

# ---------- Database Setup ----------
def init_db():
    """ Initialize the SQLite database and create the media table if it didn't exist."""
    with sqlite3.connect(DB) as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS media 
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT,
                tags TEXT
            )
        ''')

# ------------ Routing ------------

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/upload', methods=['POST'])
def api_upload():
    """
    Handle media file uploads.
    - 1. Save file to upload folder.
    - 2. Store filename and tags in the database.
    - 3. Return success/failure as a JSON.
    """
    file = request.files.get('media')
    tags = request.form.get('tags', '')

    if file:
        filename = secure_filename(file.filename)  # Sanitize the filename
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)  # Save file to disk

        # Insert metadata into the db
        with sqlite3.connect(DB) as conn:
            conn.execute('INSERT INTO media (filename, tags) VALUES (?, ?)', (filename, tags))
        
        return jsonify({'success': True, 'message': 'File uploaded successfully.'})

    return jsonify({'success': False, 'message': 'No file uploaded.'}), 400

@app.route('/api/gallery')
def api_gallery():
    """
    Return a JSON list of all uploaded media and their tags, ordered by most recent uploaded first.
    """
    with sqlite3.connect(DB) as conn:
        rows = conn.execute('SELECT filename, tags FROM media ORDER BY id DESC').fetchall()
    return jsonify([{'filename': r[0], 'tags': r[1]} for r in rows])

# ---------- App Entry Point ----------

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure upload folder is present
    init_db()  # Init Sdatabase on first run
    app.run(debug=True)  # Start the Flask development WebServer
