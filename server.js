/**
 * KANAK BAHAR JEWELLERS — server.js
 * Node.js + Express Backend
 *
 * Handles:
 *  - Contact form submissions
 *  - Wholesale inquiries
 *  - Newsletter subscriptions
 *  - Serves static frontend files
 *
 * Run: node server.js
 * Default port: 3000
 */

const express    = require('express');
const path       = require('path');
const fs         = require('fs');
const bodyParser = require('body-parser');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARE ──────────────────────────────────
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS headers (allow frontend on same origin or different dev port)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Serve static frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// ── DATA STORAGE ────────────────────────────────
// Simple JSON file storage (no database needed for small shops)
// In production, replace with MongoDB / MySQL / PostgreSQL

const DATA_DIR  = path.join(__dirname, 'data');
const CONTACTS_FILE    = path.join(DATA_DIR, 'contacts.json');
const WHOLESALE_FILE   = path.join(DATA_DIR, 'wholesale.json');
const NEWSLETTER_FILE  = path.join(DATA_DIR, 'newsletter.json');

// Create data directory and files if they don't exist
function initStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  [CONTACTS_FILE, WHOLESALE_FILE, NEWSLETTER_FILE].forEach(file => {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify([], null, 2));
    }
  });
  console.log('✅ Data storage initialized at ./data/');
}

// Read JSON file safely
function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
}

// Write to JSON file
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// ── INPUT VALIDATION ────────────────────────────
function validateContact(body) {
  const { name, phone, message } = body;
  if (!name || typeof name !== 'string' || name.trim().length < 2) return 'Name must be at least 2 characters.';
  if (!phone || !/^[\d\s\+\-]{7,15}$/.test(phone.trim())) return 'Please provide a valid phone number.';
  if (!message || typeof message !== 'string' || message.trim().length < 5) return 'Message must be at least 5 characters.';
  return null;
}

function validateWholesale(body) {
  const { name, phone, type, message } = body;
  if (!name || typeof name !== 'string' || name.trim().length < 2) return 'Name must be at least 2 characters.';
  if (!phone || !/^[\d\s\+\-]{7,15}$/.test(phone.trim())) return 'Please provide a valid phone number.';
  if (!type || type.trim() === '') return 'Please select a jewellery category.';
  if (!message || typeof message !== 'string' || message.trim().length < 5) return 'Message must be at least 5 characters.';
  return null;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── API ROUTES ──────────────────────────────────

/**
 * POST /api/contact
 * Body: { name, phone, subject, message }
 */
app.post('/api/contact', (req, res) => {
  const { name, phone, subject, message } = req.body;

  // Validate
  const error = validateContact(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  // Build record
  const record = {
    id:        Date.now(),
    name:      name.trim(),
    phone:     phone.trim(),
    subject:   subject || 'General Inquiry',
    message:   message.trim(),
    timestamp: new Date().toISOString(),
    read:      false,
  };

  // Save
  const contacts = readJSON(CONTACTS_FILE);
  contacts.unshift(record); // Most recent first
  writeJSON(CONTACTS_FILE, contacts);

  console.log(`📩 New Contact: ${record.name} (${record.phone}) — "${record.subject}"`);

  return res.status(200).json({
    success: true,
    message: 'Message received! We will contact you shortly.',
  });
});

/**
 * POST /api/wholesale
 * Body: { name, phone, business, city, type, message }
 */
app.post('/api/wholesale', (req, res) => {
  const { name, phone, business, city, type, message } = req.body;

  // Validate
  const error = validateWholesale(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  // Build record
  const record = {
    id:        Date.now(),
    name:      name.trim(),
    phone:     phone.trim(),
    business:  (business || '').trim(),
    city:      (city || '').trim(),
    type:      type.trim(),
    message:   message.trim(),
    timestamp: new Date().toISOString(),
    status:    'pending',
  };

  // Save
  const wholesale = readJSON(WHOLESALE_FILE);
  wholesale.unshift(record);
  writeJSON(WHOLESALE_FILE, wholesale);

  console.log(`💼 Wholesale Inquiry: ${record.name} (${record.phone}) — ${record.type}`);

  return res.status(200).json({
    success: true,
    message: 'Wholesale inquiry received! Our team will contact you within 24 hours.',
  });
});

/**
 * POST /api/newsletter
 * Body: { email }
 */
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;

  if (!email || !validateEmail(email.trim())) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  const newsletters = readJSON(NEWSLETTER_FILE);

  // Check for duplicate
  const alreadySubscribed = newsletters.some(n => n.email === email.trim().toLowerCase());
  if (alreadySubscribed) {
    return res.status(200).json({ success: true, message: 'You are already subscribed!' });
  }

  newsletters.push({
    id:        Date.now(),
    email:     email.trim().toLowerCase(),
    timestamp: new Date().toISOString(),
  });
  writeJSON(NEWSLETTER_FILE, newsletters);

  console.log(`📧 New Newsletter Subscriber: ${email}`);

  return res.status(200).json({
    success: true,
    message: 'Subscribed successfully!',
  });
});

/**
 * GET /api/stats
 * Returns submission stats (for admin use)
 */
app.get('/api/stats', (req, res) => {
  const contacts   = readJSON(CONTACTS_FILE);
  const wholesale  = readJSON(WHOLESALE_FILE);
  const newsletter = readJSON(NEWSLETTER_FILE);

  res.json({
    contacts:         contacts.length,
    wholesale:        wholesale.length,
    newsletter:       newsletter.length,
    last_updated:     new Date().toISOString(),
  });
});

/**
 * GET /api/submissions
 * Returns all submissions (PROTECT THIS IN PRODUCTION — add auth middleware)
 */
app.get('/api/submissions', (req, res) => {
  res.json({
    contacts:    readJSON(CONTACTS_FILE),
    wholesale:   readJSON(WHOLESALE_FILE),
    newsletter:  readJSON(NEWSLETTER_FILE),
  });
});

// ── CATCH-ALL: serve index.html for SPA ─────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── ERROR HANDLER ────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error. Please try again.' });
});

// ── START SERVER ─────────────────────────────────
initStorage();

app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════╗');
  console.log('║   KANAK BAHAR JEWELLERS — Server Running   ║');
  console.log('╠════════════════════════════════════════════╣');
  console.log(`║  🌐  http://localhost:${PORT}                  ║`);
  console.log('║  📍  Agartala, Tripura — Est. 1996         ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');
});

module.exports = app; // For testing
