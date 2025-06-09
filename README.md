# CSIT437-Web-Services
There are 2 Projects for 437 Web Services: Flask for Project #1 and React for Project #2.
---------------------

# Project #1: Flask

### Final Features
- Upload media files (image/video)
- Add custom tags during upload
- View all media in a responsive grid gallery
- Filter gallery by tag keyword (live search)
- Inline tag editing (click to edit, save via AJAX)
- Delete media files
- Download original uploads
- Fully dynamic – no page reloads, AJAX-powered Organized by modular handlers (gallery, search upload)

### Tech Stack
- Backend: Python 3, Flask, SQLite
- Frontend: HTML, CSS, JavaScript (Vanilla), AJAX
- Templating: Jinja2

#### Current Folder Structure:
``` bash 
'Project #1 - MediaTagger Flask'
|
|- app.py
|- media.db
|- requirements.txt
|- static/
|  |-- css/
|  |  |-- style.css
|  |-- js/
|  |  |-- uploadHandler.js
|  |  |-- galleryHandler.js
|  |  |-- expandGallery.js
|  |  |-- tagSearchHandler.js
|  |-- uploads/ # All Uploaded Imgs (Through Site Input)
|
|- templates/
|  |-- index.html
|  |-- PartialPages/
|  |   |-- navMain.html
|  |   |-- footerMain.html
|
|-- .gitignore (Top Level for Proj #1 & Proj #2)
```

#### How to Run (Project#1): 
#1. Clone the Repo 
    - (git clone https://github.com/yourusername/CSIT437-Web-Services.git)
#2. Install Flask
    - cd Project1-Flask-MediaTagger
#3. python app.py
    - pip install -r requirements.txt
#4. Run the app.py
    - python app.py
#5. Visit the app in your Browser
    - http://localhost:5000