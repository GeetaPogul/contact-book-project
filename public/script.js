// script.js
// Handles all Create, Read, Update, Delete actions by calling the
// Express API (server.js), which reads from / writes to the SQLite
// database (contacts.db).

const API_URL = '/api/contacts';

const form = document.getElementById('contactForm');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

const contactIdField = document.getElementById('contactId');
const nameField = document.getElementById('name');
const phoneField = document.getElementById('phone');
const emailField = document.getElementById('email');
const addressField = document.getElementById('address');

const contactsList = document.getElementById('contactsList');
const emptyState = document.getElementById('emptyState');
const message = document.getElementById('message');

// ----------------------------------------------------
function showMessage(text, type = 'success') {
  message.textContent = text;
  message.className =
    'mb-4 text-sm font-medium ' +
    (type === 'success' ? 'text-green-600' : 'text-red-600');
  message.classList.remove('hidden');

  setTimeout(() => {
    message.classList.add('hidden');
  }, 2500);
}

// ------------------------------------------------------------------
// READ - Fetch all contacts from the database and display them
// ------------------------------------------------------------------
async function loadContacts() {
  try {
    const res = await fetch(API_URL);
    const contacts = await res.json();

    contactsList.innerHTML = '';

    if (contacts.length === 0) {
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');

    contacts.forEach((contact) => {
      const card = document.createElement('div');
      card.className =
        'contact-card border border-slate-200 rounded-lg p-4 flex justify-between items-start';

      card.innerHTML = `
        <div>
          <p class="font-semibold text-slate-800">${escapeHtml(contact.name)}</p>
          <p class="text-sm text-slate-600">📞 ${escapeHtml(contact.phone)}</p>
          ${contact.email ? `<p class="text-sm text-slate-600">✉️ ${escapeHtml(contact.email)}</p>` : ''}
          ${contact.address ? `<p class="text-sm text-slate-600">📍 ${escapeHtml(contact.address)}</p>` : ''}
        </div>
        <div class="flex gap-2">
          <button data-id="${contact.id}" class="editBtn text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Edit
          </button>
          <button data-id="${contact.id}" class="deleteBtn text-red-500 hover:text-red-700 text-sm font-medium">
            Delete
          </button>
        </div>
      `;

      contactsList.appendChild(card);
    });

    // Attach event listeners to the newly created buttons
    document.querySelectorAll('.editBtn').forEach((btn) =>
      btn.addEventListener('click', () => startEdit(btn.dataset.id))
    );
    document.querySelectorAll('.deleteBtn').forEach((btn) =>
      btn.addEventListener('click', () => deleteContact(btn.dataset.id))
    );
  } catch (err) {
    showMessage('Could not load contacts. Is the server running?', 'error');
    console.error(err);
  }
}

// ------------------------------------------------------------------
// CREATE / UPDATE - Submit the form
// ------------------------------------------------------------------
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const contact = {
    name: nameField.value.trim(),
    phone: phoneField.value.trim(),
    email: emailField.value.trim(),
    address: addressField.value.trim(),
  };

  const id = contactIdField.value;

  try {
    let res;
    if (id) {
      // UPDATE existing contact
      res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
    } else {
      // CREATE new contact
      res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
    }

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Something went wrong.');
    }

    showMessage(id ? 'Contact updated successfully!' : 'Contact added successfully!');
    resetForm();
    loadContacts();
  } catch (err) {
    showMessage(err.message, 'error');
  }
});

// ------------------------------------------------------------------
// Populate the form with an existing contact's data for editing
// ------------------------------------------------------------------
async function startEdit(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('Contact not found.');
    const contact = await res.json();

    contactIdField.value = contact.id;
    nameField.value = contact.name;
    phoneField.value = contact.phone;
    emailField.value = contact.email || '';
    addressField.value = contact.address || '';

    formTitle.textContent = 'Edit Contact';
    submitBtn.textContent = 'Update Contact';
    cancelEditBtn.classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    showMessage(err.message, 'error');
  }
}

// ------------------------------------------------------------------
// DELETE - Remove a contact from the database
// ------------------------------------------------------------------
async function deleteContact(id) {
  if (!confirm('Are you sure you want to delete this contact?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Could not delete contact.');

    showMessage('Contact deleted successfully!');
    loadContacts();
  } catch (err) {
    showMessage(err.message, 'error');
  }
}

// ------------------------------------------------------------------
// Reset the form back to "Add New Contact" mode
// ------------------------------------------------------------------
function resetForm() {
  form.reset();
  contactIdField.value = '';
  formTitle.textContent = 'Add New Contact';
  submitBtn.textContent = 'Add Contact';
  cancelEditBtn.classList.add('hidden');
}

cancelEditBtn.addEventListener('click', resetForm);

// ------------------------------------------------------------------
// Basic HTML escaping to avoid injecting raw HTML from stored data
// ------------------------------------------------------------------
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Load contacts when the page first opens
loadContacts();
