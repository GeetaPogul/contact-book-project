# Contact Book – CRUD Mini Project

A simple **Contact Book** web application that lets you **Create, Read,
Update and Delete (CRUD)** contacts. Data is stored in and retrieved from a
real **SQLite database** through an **Express API**. The frontend is built
with **HTML, CSS, JavaScript and Tailwind CSS**.

## Tech Stack

- **Frontend:** HTML, Tailwind CSS, JavaScript (fetch API)
- **Backend / API:** Node.js + Express
- **Database:** SQLite (`contacts.db`, created automatically)

## Folder Structure

```
contact-book/
├── package.json
├── server.js          -> Express server + CRUD API routes
├── database.js        -> SQLite database setup
├── contacts.db         -> created automatically when you run the server
└── public/
    ├── index.html      -> main page (Tailwind CSS via CDN)
    ├── style.css       -> small extra styles
    └── script.js       -> frontend logic (calls the API)
```

## How to Run This Project

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org and install it.
   - Check it worked: open a terminal/command prompt and run:
     ```
     node -v
     npm -v
     ```

2. **Open the project folder** in a terminal
   ```
   cd contact-book
   ```

3. **Install the dependencies** (Express, SQLite3, CORS)
   ```
   npm install
   ```

4. **Start the server**
   ```
   npm start
   ```
   You should see:
   ```
   Connected to the SQLite database (contacts.db)
   Contact Book server running at http://localhost:3000
   ```

5. **Open the app in your browser**
   - Go to: `http://localhost:3000`
   - The `contacts.db` file is created automatically the first time you run
     the server, with a `contacts` table ready to use.

6. **Use the app**
   - **Create:** Fill in the form (Name and Phone are required) and click
     "Add Contact" — the contact is saved into the SQLite database.
   - **Read:** All saved contacts are loaded from the database and shown
     in the "Your Contacts" list.
   - **Update:** Click "Edit" on a contact, change the details, and click
     "Update Contact" — the database record is updated.
   - **Delete:** Click "Delete" on a contact and confirm — the record is
     removed from the database.

## API Endpoints (for reference)

| Method | Endpoint            | Action                         |
|--------|---------------------|---------------------------------|
| POST   | `/api/contacts`     | Create a new contact            |
| GET    | `/api/contacts`     | Read / get all contacts         |
| GET    | `/api/contacts/:id` | Read / get a single contact     |
| PUT    | `/api/contacts/:id` | Update an existing contact      |
| DELETE | `/api/contacts/:id` | Delete a contact                |

## Notes for the Project Report

- CRUD stands for **Create, Read, Update, Delete** — the four operations
  this app performs on the `contacts` table.
- The frontend (HTML + Tailwind CSS + JS) never stores data itself; every
  action goes through the Express API, which reads from and writes to the
  SQLite database, so data persists even after the browser is closed or
  refreshed.

## How to Submit the Project via Google Form

1. **Zip the project folder**
   - Make sure the `node_modules` folder is removed before zipping (it's
     large and not needed — anyone running the project will recreate it
     with `npm install`).
     - On Windows: right-click `node_modules` → Delete.
     - On Mac/Linux: run `rm -rf node_modules` inside the project folder.
   - Right-click the `contact-book` folder → "Send to" → "Compressed
     (zipped) folder" (Windows), or "Compress" (Mac).

2. **Upload the project to Google Drive (recommended for code)**
   - Go to https://drive.google.com
   - Click **New → File upload** and select the zipped `contact-book`
     folder (or upload the whole folder using **New → Folder upload**).
   - Once uploaded, right-click the file/folder → **Share → Get link**.
   - Change the access setting to **"Anyone with the link"** so your
     instructor can view/download it.
   - Copy this shareable link.

3. **Take a few screenshots** (optional but recommended)
   - Screenshot of the running app (Add, list of contacts, edit form).
   - Screenshot of `contacts.db` data (you can view it using a tool like
     "DB Browser for SQLite").
   - These help reviewers see the working output without running the code.

4. **Open the Google Form** your instructor shared for project submission.

5. **Fill in the form fields**, typically including:
   - Name / Roll number / Class details
   - Project title: e.g. *"CRUD Application – Contact Book"*
   - A short description: *"A Contact Book web app built with HTML, Tailwind
     CSS, JavaScript, Express API and SQLite database, performing Create,
     Read, Update and Delete operations on contact records."*
   - **Project link field:** paste the Google Drive link from step 2.
   - **File upload field (if present):** upload the zipped project file or
     your screenshots directly.

6. **Double-check the Drive link** by opening it in a private/incognito
   browser window to confirm anyone with the link can actually view it.

7. **Submit the form.** You should see a confirmation message after
   submitting — take a screenshot of this confirmation for your records.
