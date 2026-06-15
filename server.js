// server.js
// Simple Express API providing CRUD operations for the Contact Book.
// All data is stored in and read from the SQLite database (contacts.db).

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve the frontend (HTML, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------------------------------------------
// CREATE - Add a new contact
// ------------------------------------------------------------------
app.post('/api/contacts', (req, res) => {
  const { name, phone, email, address } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  const sql = `INSERT INTO contacts (name, phone, email, address) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, phone, email, address], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Return the newly created contact
    res.status(201).json({ id: this.lastID, name, phone, email, address });
  });
});

// ------------------------------------------------------------------
// READ - Get all contacts
// ------------------------------------------------------------------
app.get('/api/contacts', (req, res) => {
  db.all(`SELECT * FROM contacts ORDER BY name ASC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// ------------------------------------------------------------------
// READ - Get a single contact by id (used when editing)
// ------------------------------------------------------------------
app.get('/api/contacts/:id', (req, res) => {
  db.get(`SELECT * FROM contacts WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Contact not found.' });
    }
    res.json(row);
  });
});

// ------------------------------------------------------------------
// UPDATE - Edit an existing contact
// ------------------------------------------------------------------
app.put('/api/contacts/:id', (req, res) => {
  const { name, phone, email, address } = req.body;
  const { id } = req.params;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  const sql = `UPDATE contacts SET name = ?, phone = ?, email = ?, address = ? WHERE id = ?`;
  db.run(sql, [name, phone, email, address, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }
    res.json({ id: Number(id), name, phone, email, address });
  });
});

// ------------------------------------------------------------------
// DELETE - Remove a contact
// ------------------------------------------------------------------
app.delete('/api/contacts/:id', (req, res) => {
  db.run(`DELETE FROM contacts WHERE id = ?`, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }
    res.json({ message: 'Contact deleted successfully.' });
  });
});

app.listen(PORT, () => {
  console.log(`Contact Book server running at http://localhost:${PORT}`);
});
