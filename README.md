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


## Notes for the Project Report

- CRUD stands for **Create, Read, Update, Delete** — the four operations
  this app performs on the `contacts` table.
- The frontend (HTML + Tailwind CSS + JS) never stores data itself; every
  action goes through the Express API, which reads from and writes to the
  SQLite database, so data persists even after the browser is closed or
  refreshed.


