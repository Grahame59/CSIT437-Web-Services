# CSIT437-Web-Services
There are 2 Projects for 437 Web Services: Flask for Project #1 and React for Project #2.

# ROUGH DOCUMENTATION WIP --- 

# Project #1: Flask

### First Coding Session Docs (06.04.2025):
- Set up a Single Page (index.html) Flask Web App. It has two functionalities: Uploading (With Crude MetaData) and Viewing Uploads in Gallery 3x3 format.
- It's running a Flask + SQLite backend with basic html/js front-end and css styling. 
- Functionalities Include: 
- #1. Upload Media Files.
- #2. Add Custom Tags.
- #3. View all uploaded media in a 3x3 responsive grid.

- We're running API First schema with AJAX to dynamic reload partials on the page VS. the more crude strategy of Page Navs or full page reloads. 

- Full Tech Stack (Python3 + Flask, SQLite, HTML, CSS, JavaScript, Jinja2 Templating (Flask))

#### Current Folder Structure:
``` bash 
'Project #1 - MediaTagger Flask'
|
|- app.py
|- media.db
|- requirements.txt
|- (There is also a .gitignore for both Proj#1 & Proj#2 1 level up)
|- static/
|  |-- css/style.css
|  |-- js/
|  |  |-- uploadHandler.js
|  |  |-- galleryHandler.js
|  |-- uploads/ # All Uploaded Imgs (Through Site Input)
|
|- templates/
|  |-- index.html
|  |-- PartialPages/
|  |   |-- navMain.html
|  |   |-- footerMain.html
```

#### How to Run (Project#1): 
- #1. Clone the Repo
- #2. Install Flask
- #3. python app.py
- #4. http://localhost:5000

- Note to self (Del Later): 
- Need to Implement:
    - Filter Bar (By Tag?)
    - Media Functions (Delete & Download)
    - Editable Tags
    - Light/Dark Mode Toggle ? 
    - Media Views (2 Views Phone * IPad sized screens)
    - Drag and Drop Upload
    - Possibly User Sessions for Account based Gallery (DB isn't required so might be waste of time if I'd rather develop more meaningful repos.)